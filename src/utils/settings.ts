import { supabase } from '../lib/supabase';

/**
 * Site-wide Dynamic Configuration & Feature Toggles
 * Dual-Channel Cloud Persistence: Server-side (/api/settings) + Supabase database ('settings' table)
 * Guarantees cross-device, cross-browser, and cross-session real-time consistency.
 */

export type ProductKey = 'pansou' | 'reading-pro' | 'ai-agent' | 'chat';

export interface SiteSettings {
  welcomeModalEnabled: boolean;
  productsEnabled: {
    'pansou': boolean;
    'reading-pro': boolean;
    'ai-agent': boolean;
    'chat': boolean;
  };
}

export const DEFAULT_SETTINGS: SiteSettings = {
  welcomeModalEnabled: true,
  productsEnabled: {
    'pansou': true,
    'reading-pro': true,
    'ai-agent': true,
    'chat': true,
  },
};

const SETTINGS_STORAGE_KEY = 'gongpan_site_settings_v1';
export const SETTINGS_EVENT = 'gongpan_settings_updated';

/**
 * Load initial settings synchronously from localStorage with safe fallback
 */
export function getStoredSettings(): SiteSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;

  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        welcomeModalEnabled: typeof parsed.welcomeModalEnabled === 'boolean' 
          ? parsed.welcomeModalEnabled 
          : DEFAULT_SETTINGS.welcomeModalEnabled,
        productsEnabled: {
          'pansou': parsed.productsEnabled?.['pansou'] ?? true,
          'reading-pro': parsed.productsEnabled?.['reading-pro'] ?? true,
          'ai-agent': parsed.productsEnabled?.['ai-agent'] ?? true,
          'chat': parsed.productsEnabled?.['chat'] ?? true,
        }
      };
    }
  } catch (e) {
    console.error('Failed to read local site settings:', e);
  }

  return DEFAULT_SETTINGS;
}

/**
 * Persist settings to localStorage and notify all active listeners
 */
export function saveSettingsLocal(settings: SiteSettings) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent(SETTINGS_EVENT, { detail: settings }));
  } catch (e) {
    console.error('Failed to save site settings locally:', e);
  }
}

/**
 * Parse settings from Supabase rows
 */
function parseSettingsFromDb(rows: Array<{ id: string; value: boolean }>): Partial<SiteSettings> | null {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const map: Record<string, boolean> = {};
  rows.forEach(r => {
    if (r && typeof r.id === 'string') {
      map[r.id] = Boolean(r.value);
    }
  });

  return {
    welcomeModalEnabled: typeof map['welcome_modal_enabled'] === 'boolean' 
      ? map['welcome_modal_enabled'] 
      : (typeof map['welcomeModalEnabled'] === 'boolean' ? map['welcomeModalEnabled'] : undefined),
    productsEnabled: {
      'pansou': map['pansou_enabled'] ?? map['pansou'] ?? true,
      'reading-pro': map['reading_pro_enabled'] ?? map['reading-pro'] ?? true,
      'ai-agent': map['ai_agent_enabled'] ?? map['ai-agent'] ?? true,
      'chat': map['chat_enabled'] ?? map['chat'] ?? true,
    }
  };
}

/**
 * Fetch settings with multi-layered fallback and strict cache-busting
 */
export async function fetchServerSettings(): Promise<SiteSettings> {
  let fetchedData: Partial<SiteSettings> | null = null;

  // 1. First attempt: Direct /api/settings fetch with strict cache-busting
  try {
    const res = await fetch(`/api/settings?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      }
    });

    if (res.ok) {
      const serverData = await res.json();
      if (serverData && typeof serverData === 'object') {
        fetchedData = {
          welcomeModalEnabled: typeof serverData.welcomeModalEnabled === 'boolean'
            ? serverData.welcomeModalEnabled
            : DEFAULT_SETTINGS.welcomeModalEnabled,
          productsEnabled: {
            'pansou': serverData.productsEnabled?.['pansou'] ?? true,
            'reading-pro': serverData.productsEnabled?.['reading-pro'] ?? true,
            'ai-agent': serverData.productsEnabled?.['ai-agent'] ?? true,
            'chat': serverData.productsEnabled?.['chat'] ?? true,
          }
        };
      }
    }
  } catch (apiErr) {
    // API failed, proceed to Supabase fallback
  }

  // 2. Second attempt: Direct Supabase query (Guarantees cross-device freshness even if API proxy cached)
  try {
    const { data: dbRows, error } = await supabase
      .from('settings')
      .select('id, value');

    if (!error && dbRows && dbRows.length > 0) {
      const fromDb = parseSettingsFromDb(dbRows);
      if (fromDb && fromDb.productsEnabled) {
        fetchedData = {
          welcomeModalEnabled: fromDb.welcomeModalEnabled ?? fetchedData?.welcomeModalEnabled ?? true,
          productsEnabled: {
            'pansou': fromDb.productsEnabled['pansou'] ?? fetchedData?.productsEnabled?.['pansou'] ?? true,
            'reading-pro': fromDb.productsEnabled['reading-pro'] ?? fetchedData?.productsEnabled?.['reading-pro'] ?? true,
            'ai-agent': fromDb.productsEnabled['ai-agent'] ?? fetchedData?.productsEnabled?.['ai-agent'] ?? true,
            'chat': fromDb.productsEnabled['chat'] ?? fetchedData?.productsEnabled?.['chat'] ?? true,
          }
        };
      }
    }
  } catch (dbErr) {
    // Database query failed
  }

  if (fetchedData && fetchedData.productsEnabled) {
    const completeSettings: SiteSettings = {
      welcomeModalEnabled: fetchedData.welcomeModalEnabled ?? true,
      productsEnabled: {
        'pansou': fetchedData.productsEnabled['pansou'] ?? true,
        'reading-pro': fetchedData.productsEnabled['reading-pro'] ?? true,
        'ai-agent': fetchedData.productsEnabled['ai-agent'] ?? true,
        'chat': fetchedData.productsEnabled['chat'] ?? true,
      }
    };
    saveSettingsLocal(completeSettings);
    return completeSettings;
  }

  return getStoredSettings();
}

/**
 * Save settings to both API and Supabase database
 * Returns true if at least one cloud persistence target succeeded.
 */
export async function saveServerSettings(settings: SiteSettings): Promise<{ success: boolean; error?: string }> {
  // Save locally first for instant UI response
  saveSettingsLocal(settings);

  let apiSuccess = false;
  let dbSuccess = false;
  let lastError = '';

  // 1. Sync to server API
  try {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      apiSuccess = true;
    } else {
      lastError = `API returned ${res.status}`;
    }
  } catch (e: any) {
    lastError = e?.message || 'Network error on /api/settings';
  }

  // 2. Direct Sync to Supabase Database
  try {
    const rows = [
      { id: 'pansou_enabled', value: Boolean(settings.productsEnabled?.['pansou'] ?? true) },
      { id: 'reading_pro_enabled', value: Boolean(settings.productsEnabled?.['reading-pro'] ?? true) },
      { id: 'ai_agent_enabled', value: Boolean(settings.productsEnabled?.['ai-agent'] ?? true) },
      { id: 'chat_enabled', value: Boolean(settings.productsEnabled?.['chat'] ?? true) },
      { id: 'welcome_modal_enabled', value: Boolean(settings.welcomeModalEnabled ?? true) },
    ];

    const { error: dbErr } = await supabase.from('settings').upsert(rows);
    if (!dbErr) {
      dbSuccess = true;
    } else {
      console.warn('Supabase direct upsert error:', dbErr);
      if (!lastError) lastError = dbErr.message;
    }
  } catch (dbEx: any) {
    console.warn('Supabase upsert exception:', dbEx);
    if (!lastError) lastError = dbEx?.message || 'Database connection failure';
  }

  const overallSuccess = apiSuccess || dbSuccess;
  return {
    success: overallSuccess,
    error: overallSuccess ? undefined : lastError
  };
}

