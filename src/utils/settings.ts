/**
 * Site-wide Dynamic Configuration & Feature Toggles
 * Supports both Client-Side Cache (localStorage) and Server-Side Persistence (/api/settings)
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
 * Persist settings to localStorage and notify other components
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
 * Fetch settings from server API (with local fallback)
 */
export async function fetchServerSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch('/api/settings');
    if (res.ok) {
      const serverData = await res.json();
      const merged: SiteSettings = {
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
      saveSettingsLocal(merged);
      return merged;
    }
  } catch (e) {
    // Fall back to local storage silently
  }
  return getStoredSettings();
}

/**
 * Save settings to server API
 */
export async function saveServerSettings(settings: SiteSettings): Promise<boolean> {
  saveSettingsLocal(settings);
  try {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    return res.ok;
  } catch (e) {
    console.error('Failed to persist settings to server:', e);
    return false;
  }
}
