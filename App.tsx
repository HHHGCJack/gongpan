import React, { useState, createContext, useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { ReadingPro } from './components/ReadingPro';
import { Admin } from './components/Admin';
import { Laboratory } from './components/Laboratory';
import { ProductShowcase } from './components/ProductShowcase';
import { WelcomeModal } from './components/WelcomeModal';
import { SupportModal } from './components/SupportModal';
import { ThemeContextType, ThemeMode, Language } from './types';
import { supabase } from './src/lib/supabase';

// Create Context
export const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'light',
  setThemeMode: () => {},
  language: 'zh',
  setLanguage: () => {},
  showToast: () => {},
  handleCardToast: () => {},
  pansouEnabled: true,
  setPansouEnabled: () => {},
  openWelcomeModal: () => {},
});

// Use Context Hook
export const useTheme = () => useContext(ThemeContext);

// Translations
export const translations: Record<Language, { comingSoon: string, visitNow: string }> = {
  zh: { comingSoon: '敬请期待 Coming Soon', visitNow: '立即访问' },
  en: { comingSoon: 'Coming Soon', visitNow: 'Visit Now' },
  ja: { comingSoon: '近日公開 Coming Soon', visitNow: '今すぐ訪問' },
  ko: { comingSoon: '출시 예정 Coming Soon', visitNow: '지금 방문하기' },
  es: { comingSoon: 'Próximamente Coming Soon', visitNow: 'Visitar ahora' },
  fr: { comingSoon: 'Bientôt disponible Coming Soon', visitNow: 'Visitez maintenant' },
  de: { comingSoon: 'Demnächst Coming Soon', visitNow: 'Jetzt besuchen' },
  el: { comingSoon: 'Σύντομα Κοντά Σας Coming Soon', visitNow: 'Επισκεφθείτε τώρα' },
};

// Simple Toast Component - Liquid Glass
const Toast = ({ message, visible }: { message: string; visible: boolean }) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  
  return (
    <div 
      className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-90 pointer-events-none'
      }`}
    >
      <div className={`px-6 py-3.5 rounded-full border flex items-center space-x-3 transition-all duration-500 relative overflow-hidden liquid-glass ${
        isDark 
          ? 'liquid-glass-dark text-white' 
          : 'liquid-glass-light text-gray-900'
      }`}>
         {/* Glossy Reflection Overlay */}
         <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-white/15' : 'from-white/50'} to-transparent h-1/2 pointer-events-none rounded-t-full`} />
         <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
         
         <span className={`w-2.5 h-2.5 rounded-full animate-pulse relative z-10 ${
           isDark 
             ? 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]' 
             : 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]'
         }`}></span>
         <span className="text-sm font-semibold tracking-wide relative z-10">{message}</span>
      </div>
    </div>
  );
};

// Helper function to detect browser language based on navigator preferences
export const detectBrowserLanguage = (): Language => {
  try {
    const override = localStorage.getItem('gongpan_lang_user_override');
    if (override && ['zh', 'en', 'ja', 'ko', 'es', 'fr', 'de', 'el'].includes(override)) {
      return override as Language;
    }

    const candidateLangs: string[] = [];
    if (typeof navigator !== 'undefined') {
      if (navigator.language) candidateLangs.push(navigator.language);
      if (Array.isArray(navigator.languages)) candidateLangs.push(...navigator.languages);
      if ((navigator as any).userLanguage) candidateLangs.push((navigator as any).userLanguage);
    }

    for (const raw of candidateLangs) {
      if (!raw) continue;
      const lang = raw.toLowerCase();
      if (lang.startsWith('zh')) return 'zh';
      if (lang.startsWith('ja')) return 'ja';
      if (lang.startsWith('ko')) return 'ko';
      if (lang.startsWith('es')) return 'es';
      if (lang.startsWith('fr')) return 'fr';
      if (lang.startsWith('de')) return 'de';
      if (lang.startsWith('el')) return 'el';
      if (lang.startsWith('en')) return 'en';
    }

    const saved = localStorage.getItem('gongpan_lang');
    if (saved && ['zh', 'en', 'ja', 'ko', 'es', 'fr', 'de', 'el'].includes(saved)) {
      return saved as Language;
    }
    return 'zh';
  } catch {
    return 'zh';
  }
};

// Helper function to detect system dark mode preference
export const detectSystemTheme = (): ThemeMode => {
  try {
    const override = localStorage.getItem('gongpan_theme_user_override');
    if (override === 'dark' || override === 'light') return override;

    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    const saved = localStorage.getItem('gongpan_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  } catch {
    return 'light';
  }
};

function App() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('敬请期待 Coming Soon');
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => detectSystemTheme());
  const [language, setLanguageState] = useState<Language>(() => detectBrowserLanguage());
  const [pansouEnabled, setPansouEnabled] = useState(true);
  const [welcomeInitialTab, setWelcomeInitialTab] = useState<'intro' | 'support'>('intro');
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const location = useLocation();

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      localStorage.setItem('gongpan_theme_user_override', mode);
      localStorage.setItem('gongpan_theme', mode);
    } catch {}
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('gongpan_lang_user_override', lang);
      localStorage.setItem('gongpan_lang', lang);
    } catch {}
  };

  // Listen to system theme preference changes in real-time
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const explicitTheme = localStorage.getItem('gongpan_theme_user_override');
      if (!explicitTheme) {
        setThemeModeState(e.matches ? 'dark' : 'light');
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleThemeChange as (e: MediaQueryListEvent) => void);
      return () => mediaQuery.removeEventListener('change', handleThemeChange as (e: MediaQueryListEvent) => void);
    } else if ((mediaQuery as any).addListener) {
      (mediaQuery as any).addListener(handleThemeChange);
      return () => (mediaQuery as any).removeListener(handleThemeChange);
    }
  }, []);

  // Listen to browser language changes in real-time
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLanguageChange = () => {
      const explicitLang = localStorage.getItem('gongpan_lang_user_override');
      if (!explicitLang) {
        const detected = detectBrowserLanguage();
        setLanguageState(detected);
      }
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    // Apply theme to document and update favicon & bookmark icons
    const lightIcon = '/logo-light.jpg';
    const darkIcon = '/logo-dark.jpg';
    const currentIcon = themeMode === 'dark' ? darkIcon : lightIcon;

    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Dynamically update all browser icon references
    const favicons = document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"], #dynamic-favicon');
    favicons.forEach(el => {
      el.href = currentIcon;
    });

    const appleIcons = document.querySelectorAll<HTMLLinkElement>('link[rel="apple-touch-icon"]');
    appleIcons.forEach(el => {
      el.href = currentIcon;
    });
  }, [themeMode]);

  // Smooth opening of welcome modal on initial site visit
  useEffect(() => {
    try {
      const todayKey = new Date().toISOString().slice(0, 10);
      const dismissedDate = localStorage.getItem('gongpan_welcome_dismiss_date');
      const hasSeenSession = sessionStorage.getItem('gongpan_welcome_seen_session');

      if (dismissedDate !== todayKey && !hasSeenSession) {
        const timer = setTimeout(() => {
          setWelcomeModalOpen(true);
          sessionStorage.setItem('gongpan_welcome_seen_session', 'true');
        }, 400);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('value')
          .eq('id', 'pansou_enabled')
          .single();
        
        if (data && !error) {
          setPansouEnabled(data.value);
        }
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const handleCardToast = () => {
    showToast(translations[language].comingSoon);
  };

  const openWelcomeModal = (tab: 'intro' | 'support' = 'intro') => {
    setWelcomeInitialTab(tab);
    setWelcomeModalOpen(true);
  };

  const openSupportModal = () => {
    setSupportModalOpen(true);
  };

  return (
    <ThemeContext.Provider value={{ 
      themeMode, 
      setThemeMode, 
      language, 
      setLanguage, 
      showToast, 
      handleCardToast, 
      pansouEnabled, 
      setPansouEnabled,
      openWelcomeModal,
      openSupportModal 
    }}>
      <div className={`min-h-screen flex flex-col font-sans selection:bg-blue-500/30 transition-colors duration-300 relative overflow-hidden ${themeMode === 'dark' ? 'bg-[#09090b] text-white' : 'bg-[#f6f7fa] text-black'}`}>
        
        {/* Dynamic Liquid Glass Ambient Light Caustics - GPU Optimized & Low Overhead */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden [contain:strict]">
          {/* Top Primary Liquid Orb */}
          <div 
            className={`absolute -top-32 -left-16 w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full blur-[40px] sm:blur-[60px] opacity-50 transition-colors duration-500 ${
              themeMode === 'dark' 
                ? 'bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-cyan-500/15' 
                : 'bg-gradient-to-br from-blue-400/25 via-indigo-300/20 to-sky-200/25'
            }`} 
          />

          {/* Top Right Amber/Golden Liquid Glow */}
          <div 
            className={`absolute top-16 -right-32 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full blur-[40px] sm:blur-[60px] opacity-40 transition-colors duration-500 ${
              themeMode === 'dark' 
                ? 'bg-gradient-to-bl from-amber-500/10 via-orange-600/10 to-transparent' 
                : 'bg-gradient-to-bl from-amber-300/20 via-rose-200/15 to-orange-100/20'
            }`} 
          />

          {/* Bottom Violet / Indigo Liquid Reservoir */}
          <div 
            className={`absolute -bottom-32 right-[8%] w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full blur-[45px] sm:blur-[65px] opacity-40 transition-colors duration-500 ${
              themeMode === 'dark' 
                ? 'bg-gradient-to-t from-purple-700/15 via-blue-600/10 to-transparent' 
                : 'bg-gradient-to-t from-purple-300/20 via-blue-200/20 to-pink-100/15'
            }`} 
          />

          {/* Liquid Glass Fine Surface Mesh */}
          <div 
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
          />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <Toast message={toastMessage} visible={toastVisible} />
          
          <WelcomeModal 
            isOpen={welcomeModalOpen} 
            initialTab={welcomeInitialTab}
            onClose={() => setWelcomeModalOpen(false)} 
          />
          <SupportModal 
            isOpen={supportModalOpen} 
            onClose={() => setSupportModalOpen(false)} 
          />
          
          <div className="flex-grow flex flex-col">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/showcase/:id" element={<ProductShowcase />} />
              <Route path="/reading-pro" element={<ReadingPro />} />
              <Route path="/laboratory" element={<Laboratory />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;