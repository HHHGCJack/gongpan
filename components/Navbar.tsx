import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, ExternalLink, Moon, Sun, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../App';
import { Logo } from './Logo';
import { 
  DEFAULT_SUPPORT_QR, 
  SUPPORT_QR_IMGDB, 
  SUPPORT_QR_FREEIMAGE, 
  SUPPORT_QR_LOCAL, 
  SUPPORT_QR_BASE64, 
  SUPPORT_QR_SOURCES 
} from '../src/assets/support_qr_base64';

export { DEFAULT_SUPPORT_QR };

export const Navbar: React.FC = () => {
  const { themeMode, setThemeMode, language, setLanguage, showToast, pansouEnabled } = useTheme();
  const [qrImage, setQrImage] = useState<string>(() => {
    const saved = localStorage.getItem('custom_support_qr');
    // If user has old broken telegram/nloln url, reset to new high-speed source
    if (saved && (saved.includes('nloln.de') || saved.includes('img2.') || saved.includes('support_qr_code_1787368553422'))) {
      localStorage.removeItem('custom_support_qr');
      return DEFAULT_SUPPORT_QR;
    }
    return saved || DEFAULT_SUPPORT_QR;
  });

  const translations = {
    zh: {
      brand: 'G胖儿GongPan',
      nav: {
        learn: '学习',
        entertainment: '娱乐',
        tech: '科技',
      },
      items: {
        readingPro: { title: '外刊精读', desc: '深度解析国际刊物' },
        pansou: { title: '网盘资源搜', desc: '全网影视资源聚合' },
        chat: { title: '即时聊天软件', desc: '中国人自己的Telegram' },
        ai: { title: 'AI 投资智能体', desc: 'AI驱动的智能投资决策' },
        lab: { title: '实验室', desc: '极客实验性工具箱' },
      },
      support: '支持我',
      supportThanks: '感谢支持',
      pansouDisabled: '因政策原因暂停服务',
      comingSoon: '敬请期待 Coming Soon',
      selectLang: '精选优质资源',
    },
    en: {
      brand: 'GongPan',
      nav: {
        learn: 'Learn',
        entertainment: 'Entertainment',
        tech: 'Tech',
      },
      items: {
        readingPro: { title: 'Journal Reading', desc: 'In-depth international journals' },
        pansou: { title: 'Cloud Search', desc: 'Movie resource aggregation' },
        chat: { title: 'Instant Chat', desc: 'Chinese own Telegram' },
        ai: { title: 'AI Investment Agent', desc: 'AI-driven investment intelligence' },
        lab: { title: 'Laboratory', desc: 'Experimental Sandbox' },
      },
      support: 'Support Me',
      supportThanks: 'Thanks for Support',
      pansouDisabled: 'Service suspended due to policy',
      comingSoon: 'Coming Soon',
      selectLang: 'Premium Resources',
    },
    ja: {
      brand: 'GongPan',
      nav: { learn: '学習', entertainment: 'エンターテイメント', tech: 'テクノロジー' },
      items: {
        readingPro: { title: 'ジャーナル精読', desc: '国際的なジャーナルの深い解釈' },
        pansou: { title: 'クラウド検索', desc: '映画リソースの集約' },
        chat: { title: 'インスタントチャット', desc: '中国のTelegram' },
        ai: { title: 'AI投資エージェント', desc: 'AIによる投資インテリジェンス' },
        lab: { title: '研究室', desc: '実験的機能とツール' },
      },
      support: 'サポート',
      supportThanks: 'サポートありがとうございます',
      pansouDisabled: '制限によりサービス停止中',
      comingSoon: '近日公開',
      selectLang: 'プレミアムリソース',
    },
    ko: {
      brand: 'GongPan',
      nav: { learn: '학습', entertainment: '엔터테인먼트', tech: '기술' },
      items: {
        readingPro: { title: '저널 정독', desc: '국제 저널 심층 해석' },
        pansou: { title: '클라우드 검색', desc: '영화 리소스 통합' },
        chat: { title: '인스턴트 채팅', desc: '중국의 Telegram' },
        ai: { title: 'AI 투자 에이전트', desc: 'AI 기반 투자 인텔리전스' },
        lab: { title: '실험실', desc: '실험적 기능 및 제어' },
      },
      support: '지원하기',
      supportThanks: '지원해 주셔서 감사합니다',
      pansouDisabled: '정책으로 인해 서비스 중지',
      comingSoon: '출시 예정',
      selectLang: '프리미엄 리소스',
    },
    es: {
      brand: 'GongPan',
      nav: { learn: 'Aprender', entertainment: 'Entretenimiento', tech: 'Tecnología' },
      items: {
        readingPro: { title: 'Lectura de Revistas', desc: 'Revistas internacionales' },
        pansou: { title: 'Nube de Películas', desc: 'Agregación de recursos' },
        chat: { title: 'Chat Instantáneo', desc: 'Telegram chino' },
        ai: { title: 'Agente de Inversión IA', desc: 'Inteligencia de inversión con IA' },
        lab: { title: 'Laboratorio', desc: 'Herramientas y sandbox' },
      },
      support: 'Apóyame',
      supportThanks: 'Gracias por tu apoyo',
      pansouDisabled: 'Servicio suspendido',
      comingSoon: 'Próximamente',
      selectLang: 'Recursos Premium',
    },
    fr: {
      brand: 'GongPan',
      nav: { learn: 'Apprendre', entertainment: 'Divertissement', tech: 'Technologie' },
      items: {
        readingPro: { title: 'Lecture de Revues', desc: 'Revues internationales' },
        pansou: { title: 'Recherche Cloud', desc: 'Ressources de films' },
        chat: { title: 'Chat Instantané', desc: 'Telegram chinois' },
        ai: { title: 'Agent d\'Investissement IA', desc: 'Intelligence d\'investissement IA' },
        lab: { title: 'Laboratoire', desc: 'Outils Expérimentaux' },
      },
      support: 'Soutenez-moi',
      supportThanks: 'Merci pour votre soutien',
      pansouDisabled: 'Service suspendu',
      comingSoon: 'Bientôt disponible',
      selectLang: 'Ressources Premium',
    },
    de: {
      brand: 'GongPan',
      nav: { learn: 'Lernen', entertainment: 'Unterhaltung', tech: 'Technologie' },
      items: {
        readingPro: { title: 'Zeitschriften-Lektüre', desc: 'Internationale Zeitschriften' },
        pansou: { title: 'Cloud-Suche', desc: 'Filmressourcen' },
        chat: { title: 'Instant Chat', desc: 'Chinesisches Telegram' },
        ai: { title: 'KI-Investment-Agent', desc: 'KI-gestützte Anlageintelligenz' },
        lab: { title: 'Laboratorium', desc: 'Experimentelle Tools' },
      },
      support: 'Unterstütze mich',
      supportThanks: 'Danke für die Unterstützung',
      pansouDisabled: 'Dienst ausgesetzt',
      comingSoon: 'Demnächst',
      selectLang: 'Premium-Ressourcen',
    },
    el: {
      brand: 'GongPan',
      nav: { learn: 'Μαθαίνω', entertainment: 'Ψυχαγωγία', tech: 'Τεχνολογία' },
      items: {
        readingPro: { title: 'Μελέτη Περιοδικών', desc: 'Διεθνή περιοδικά' },
        pansou: { title: 'Αναζήτηση Cloud', desc: 'Πόροι ταινιών' },
        chat: { title: 'Instant Chat', desc: 'Κινεζικό Telegram' },
        ai: { title: 'Agent Επενδύσεων AI', desc: 'Επενδυτική ευφυΐα AI' },
        lab: { title: 'Εργαστήριο', desc: 'Πειραματικά Εργαλεία' },
      },
      support: 'Υποστήριξη',
      supportThanks: 'Ευχαριστώ για την υποστήριξη',
      pansouDisabled: 'Η υπηρεσία έχει ανασταλεί',
      comingSoon: 'Σύντομα',
      selectLang: 'Premium Πόροι',
    }
  };

  const t = (translations as any)[language] || translations.en;

  const navData = [
    { 
      name: t.nav.learn, 
      items: [
        { title: t.items.readingPro.title, desc: t.items.readingPro.desc, href: '/reading-pro' }
      ] 
    },
    { 
      name: t.nav.entertainment, 
      items: [
        { 
          title: t.items.pansou.title, 
          desc: t.items.pansou.desc, 
          href: pansouEnabled ? 'http://gongcheng.yyboxdns.com:12309' : '#',
          onToast: () => !pansouEnabled ? showToast(t.pansouDisabled) : undefined
        },
        { title: t.items.chat.title, desc: t.items.chat.desc, href: 'http://gongcheng.yyboxdns.com:21312/' }
      ] 
    },
    { 
      name: t.nav.tech, 
      items: [
        { title: t.items.ai.title, desc: t.items.ai.desc, href: 'https://cash.gongpan.org' },
        { title: t.items.lab.title, desc: t.items.lab.desc, href: '/laboratory' }
      ] 
    }
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  // Allow multiple categories to be expanded simultaneously (collapsed by default)
  const [mobileExpandedCategories, setMobileExpandedCategories] = useState<Record<number, boolean>>({});
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const langTimeoutRef = React.useRef<any>(null);
  const navTimeoutRef = React.useRef<any>(null);

  const handleNavTabEnter = (idx: number) => {
    if (navTimeoutRef.current) {
      clearTimeout(navTimeoutRef.current);
      navTimeoutRef.current = null;
    }
    setActiveDropdown(idx);
  };

  const handleNavLeave = () => {
    if (navTimeoutRef.current) {
      clearTimeout(navTimeoutRef.current);
    }
    navTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleLangMouseEnter = () => {
    if (langTimeoutRef.current) {
      clearTimeout(langTimeoutRef.current);
      langTimeoutRef.current = null;
    }
    setLangDropdownOpen(true);
  };

  const handleLangMouseLeave = () => {
    langTimeoutRef.current = setTimeout(() => {
      setLangDropdownOpen(false);
    }, 250);
  };

  const handleLangClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (langTimeoutRef.current) {
      clearTimeout(langTimeoutRef.current);
      langTimeoutRef.current = null;
    }
    setLangDropdownOpen(!langDropdownOpen);
  };

  const isDropdownOpen = activeDropdown !== null;

  const languages = [
    { code: 'zh', label: '简', name: '简体中文' },
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'ja', label: 'JA', name: '日本語' },
    { code: 'ko', label: 'KO', name: '한국어' },
    { code: 'es', label: 'ES', name: 'Español' },
    { code: 'fr', label: 'FR', name: 'Français' },
    { code: 'de', label: 'DE', name: 'Deutsch' },
    { code: 'el', label: 'EL', name: 'Ελληνικά' }
  ];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = () => {
      setLangDropdownOpen(false);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
      if (langTimeoutRef.current) {
        clearTimeout(langTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const shouldLock = mobileMenuOpen || showSupportModal;
    document.body.style.overflow = shouldLock ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, showSupportModal]);

  useEffect(() => {
    // Check if server or storage has an updated QR code
    fetch('/api/support-qr')
      .then(res => {
        if (res.ok) return res.blob();
        throw new Error('No custom server qr');
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setQrImage(url);
      })
      .catch(() => {
        const saved = localStorage.getItem('custom_support_qr');
        if (saved) setQrImage(saved);
      });
  }, []);

  const toggleMobileItem = (index: number) => {
    setMobileExpandedCategories(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSupportClick = () => {
    setShowSupportModal(true);
    setMobileMenuOpen(false);
  };

  const navigate = useNavigate();

  const handleItemClick = (e: React.MouseEvent, title: string, href: string, subItem?: any) => {
    if (href === '#') {
      e.preventDefault();
      if (subItem && subItem.onToast) {
        subItem.onToast();
      } else {
        showToast(t.comingSoon);
      }
      setMobileMenuOpen(false);
      setActiveDropdown(null);
      return;
    }

    if (href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
      setMobileMenuOpen(false);
      setActiveDropdown(null);
      return;
    }

    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const getNavPillStyle = (isActive: boolean) => {
    const isDark = themeMode === 'dark';
    if (!isActive) {
      return isDark ? 'text-gray-300 hover:text-white border border-transparent' : 'text-gray-600 hover:text-black border border-transparent';
    }
    return isDark 
      ? 'text-white bg-white/10 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.4)]'
      : 'text-black bg-white/20 border border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_4px_12px_rgba(0,0,0,0.08)]';
  };

  const getTextEffect = () => themeMode === 'dark' ? '[text-shadow:0_1px_2px_rgba(0,0,0,0.8)]' : '';

  const modalStyle = themeMode === 'dark'
    ? 'bg-black/40 backdrop-blur-[30px] backdrop-saturate-[220%] shadow-[0_50px_100px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1),_inset_0_-1px_1px_rgba(0,0,0,0.5)] border border-white/10 text-white'
    : 'bg-white/70 backdrop-blur-[30px] backdrop-saturate-[180%] shadow-[0_50px_100px_rgba(0,0,0,0.08),_inset_0_1px_1px_rgba(255,255,255,0.9)] border border-white/30 text-gray-900';

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      {/* Dropdown Background Dimmer (Desktop only) */}
      <div 
        className={`hidden lg:block fixed inset-0 z-30 pointer-events-none transition-opacity duration-300 ease-out ${
          activeDropdown !== null ? 'opacity-100' : 'opacity-0'
        } ${
          themeMode === 'dark' ? 'bg-black/40' : 'bg-black/15'
        }`}
      />

      <nav 
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200"
        onMouseLeave={handleNavLeave}
        onMouseEnter={() => {
          if (navTimeoutRef.current) {
            clearTimeout(navTimeoutRef.current);
            navTimeoutRef.current = null;
          }
        }}
      >
        {/* Base Nav Glass */}
        <div 
          className={`absolute top-0 left-0 w-full h-full -z-20 ${
             themeMode === 'dark' 
                ? 'bg-black/20 bg-gradient-to-br from-black/40 via-black/10 to-black/20 backdrop-blur-[25px] backdrop-saturate-[150%] backdrop-contrast-[110%]' 
                : 'bg-white/50 bg-gradient-to-b from-white/75 via-white/45 to-white/20 backdrop-blur-[24px] backdrop-saturate-[180%]'
          } ${
             themeMode === 'dark'
                ? 'shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),_inset_0_-1px_2px_rgba(255,255,255,0.02)]'
                : 'shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),_0_1px_2px_rgba(0,0,0,0.02)]'
          } ${
             isScrolled && activeDropdown === null 
                ? (themeMode === 'dark' ? 'border-b border-white/10 shadow-sm' : 'border-b border-black/[0.06] shadow-sm')
                : 'border-b border-transparent'
          }`}
        />

        {/* Dropdown Glass (Fades in with ultra-smooth progressive feathered mask - Desktop Only) */}
        <div 
          className={`hidden lg:block absolute top-0 left-0 w-full h-[380px] pointer-events-none -z-10 transition-opacity duration-300 ${
             activeDropdown !== null ? 'opacity-100' : 'opacity-0'
          } ${
             themeMode === 'dark' 
                ? 'bg-black/20 bg-gradient-to-b from-black/40 via-black/10 to-transparent backdrop-blur-[25px] backdrop-saturate-[150%] backdrop-contrast-[110%]' 
                : 'bg-white/60 bg-gradient-to-b from-white/80 via-white/50 to-transparent backdrop-blur-[24px] backdrop-saturate-[180%]'
          }`}
          style={{ 
             WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.85) 72%, rgba(0,0,0,0.5) 84%, rgba(0,0,0,0.15) 94%, rgba(0,0,0,0) 100%)',
             maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.85) 72%, rgba(0,0,0,0.5) 84%, rgba(0,0,0,0.15) 94%, rgba(0,0,0,0) 100%)'
          }}
        />

        <div className="max-w-7xl mx-auto px-6 h-14 md:h-16 flex items-center justify-between relative z-50">
          <Link to="/" className="flex items-center space-x-3 group z-50">
            <Logo size={36} className="group-hover:scale-115 transition-transform" />
            <span className={`text-xl font-bold tracking-tight relative ${getTextEffect()} ${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t.brand}
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-2 h-full">
            {navData.map((item, idx) => (
              <div 
                key={item.name} 
                className="h-full flex items-center"
                onMouseEnter={() => handleNavTabEnter(idx)}
              >
                <button className={`px-5 py-2 text-sm font-semibold transition-all duration-200 rounded-full ${getNavPillStyle(activeDropdown === idx)} ${getTextEffect()}`}>
                  {item.name}
                </button>
              </div>
            ))}
            
            <div className="flex items-center space-x-2 ml-4">
              <div 
                className="relative flex items-center"
                onMouseEnter={handleLangMouseEnter}
                onMouseLeave={handleLangMouseLeave}
              >
                <button 
                  onClick={handleLangClick}
                  className={`px-3 py-2 rounded-full transition-colors flex items-center space-x-1 ${themeMode === 'dark' ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-black/5 text-gray-600'}`} 
                  title="切换语言 / Switch Language"
                >
                  <Globe size={18} />
                  <span className="text-xs font-semibold uppercase">{languages.find((l: any) => l.code === language)?.label || 'EN'}</span>
                </button>
                
                {/* Desktop Lang Dropdown */}
                <div 
                  className={`absolute top-full right-0 mt-2 w-32 rounded-2xl overflow-hidden transition-[opacity,transform] duration-150 origin-top flex flex-col z-[100] ${
                    langDropdownOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                  } ${
                    themeMode === 'dark' 
                       ? 'bg-black/40 backdrop-blur-[25px] backdrop-saturate-[150%] border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),_0_10px_40px_rgba(0,0,0,0.5)] text-white' 
                       : 'glass-liquid text-gray-900'
                  }`}
                >
                  {languages.map((l: any) => (
                    <button
                      key={l.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguage(l.code as any);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        language === l.code
                          ? (themeMode === 'dark' ? 'bg-white/10 text-white font-semibold' : 'bg-black/5 text-black font-semibold')
                          : (themeMode === 'dark' ? 'hover:bg-white/5 text-gray-300' : 'hover:bg-black/5 text-gray-700')
                      }`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${themeMode === 'dark' ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-black/5 text-gray-600'}`} title="切换主题 / Switch Theme">
                {themeMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                onClick={handleSupportClick}
                className={`ml-2 px-5 py-2 text-sm font-semibold transition-all duration-200 rounded-full active:scale-95 ${
                  themeMode === 'dark'
                    ? 'text-white bg-white/10 border border-white/20 hover:bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.4)]'
                    : 'text-black bg-white/20 border border-white/50 hover:bg-white/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_4px_12px_rgba(0,0,0,0.08)]'
                }`}
              >
                {t.support}
              </button>
            </div>
          </div>

          <div className="lg:hidden flex items-center justify-center -mr-2 space-x-1">
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLangDropdownOpen(!langDropdownOpen);
                }}
                className={`px-3 py-2 rounded-full active:bg-black/5 flex items-center space-x-1 ${themeMode === 'dark' ? 'text-white' : 'text-gray-800'}`}
              >
                <Globe size={18} />
                <span className="text-xs font-semibold uppercase">{languages.find((l: any) => l.code === language)?.label || 'EN'}</span>
              </button>

              {/* Mobile Lang Dropdown */}
              <div 
                className={`absolute top-full right-0 mt-2 w-32 rounded-2xl overflow-hidden transition-[opacity,transform] duration-150 origin-top flex flex-col z-[100] ${
                  langDropdownOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                } ${
                  themeMode === 'dark' 
                    ? 'bg-black/40 backdrop-blur-[30px] backdrop-saturate-[220%] border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),_0_10px_40px_rgba(0,0,0,0.5)] text-white' 
                    : 'bg-white/70 backdrop-blur-[30px] backdrop-saturate-[180%] border border-white/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),_0_10px_40px_rgba(0,0,0,0.08)] text-gray-900'
                }`}
              >
                {languages.map((l: any) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code as any);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      language === l.code
                        ? (themeMode === 'dark' ? 'bg-white/10 text-white font-semibold' : 'bg-black/5 text-black font-semibold')
                        : (themeMode === 'dark' ? 'active:bg-white/5 text-gray-300' : 'active:bg-black/5 text-gray-700')
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>
            
            <button onClick={toggleTheme} className={`p-2 rounded-full active:bg-black/5 ${themeMode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {themeMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className={`p-2 rounded-full active:bg-black/5 ${themeMode === 'dark' ? 'text-white' : 'text-gray-800'}`}
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setLangDropdownOpen(false);
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Desktop Dropdown */}
        <div 
          className={`hidden lg:block absolute top-full left-0 w-full transition-[opacity,transform] duration-200 z-10 ${
            activeDropdown !== null ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
          onMouseEnter={() => {
            if (navTimeoutRef.current) {
              clearTimeout(navTimeoutRef.current);
              navTimeoutRef.current = null;
            }
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-10 relative h-[280px]">
            {navData.map((data, idx) => (
              <div 
                key={idx}
                className={`grid grid-cols-3 gap-12 absolute top-10 left-6 right-6 transition-opacity duration-200 ease-out ${
                  activeDropdown === idx 
                    ? 'opacity-100 pointer-events-auto' 
                    : 'opacity-0 pointer-events-none'
                }`}
              >
                  <div className={`col-span-1 border-r pr-8 ${themeMode === 'dark' ? 'border-white/10' : 'border-gray-200/20'}`}>
                    <h3 className={`text-2xl font-bold mb-2 ${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>{data.name}</h3>
                    <p className={`text-sm ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t.selectLang}</p>
                  </div>
                  <div className="col-span-2 grid grid-cols-2 gap-6">
                    {data.items.map((subItem) => (
                      <a 
                        key={subItem.title} 
                        href={subItem.href}
                        onClick={(e) => handleItemClick(e, subItem.title, subItem.href, subItem)}
                        className={`group block p-4 rounded-2xl transition-colors duration-150 ${
                          themeMode === 'dark'
                            ? 'hover:bg-white/10 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]'
                            : 'hover:bg-white/30 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]'
                        }`}
                      >
                        <div className="flex items-center mb-1">
                          <span className={`font-semibold ${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>{subItem.title}</span>
                          <ExternalLink size={14} className="ml-2 opacity-50" />
                        </div>
                        <p className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{subItem.desc}</p>
                      </a>
                    ))}
                  </div>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            key="mobile-menu-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden fixed inset-0 z-40 overflow-hidden"
          >
            {/* Backdrop Dimmer Overlay */}
            <div 
              className={`absolute inset-0 ${themeMode === 'dark' ? 'bg-black/40' : 'bg-black/15'}`}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Glass Drawer Surface & Scrollable Content */}
            <motion.div 
              key="mobile-menu-drawer"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`relative h-full pt-20 px-6 overflow-y-auto scrollbar-hide overscroll-contain transform-gpu ${
                themeMode === 'dark'
                  ? 'bg-[#0d0d10]/85 backdrop-blur-[28px] backdrop-saturate-[200%] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                  : 'bg-white/80 backdrop-blur-[28px] backdrop-saturate-[180%] text-gray-900 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]'
              }`}
            >
              <div className="flex flex-col pb-16">
                {navData.map((link, idx) => {
                  const isExpanded = !!mobileExpandedCategories[idx];
                  return (
                    <div key={link.name} className="relative">
                      <button 
                        onClick={() => toggleMobileItem(idx)}
                        className={`w-full flex items-center justify-between py-4 transition-colors select-none group active:opacity-75 ${
                          themeMode === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        <span className="text-lg font-bold tracking-tight">{link.name}</span>
                        <div
                          style={{
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.25s cubic-bezier(0.33, 1, 0.68, 1)'
                          }}
                          className={`p-1.5 rounded-full flex items-center justify-center transition-colors ${
                            themeMode === 'dark' 
                              ? 'bg-white/[0.06] text-white/80 group-hover:bg-white/[0.1]' 
                              : 'bg-black/[0.04] text-gray-700 group-hover:bg-black/[0.08]'
                          }`}
                        >
                          <ChevronDown size={17} />
                        </div>
                      </button>
                      
                      {/* CSS Grid Accordion: Continuous hardware interpolation with zero layout snaps/flashing */}
                      <div 
                        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className={`transition-opacity duration-200 ease-out space-y-2.5 pt-1 pb-4 ${
                            isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          }`}>
                            {link.items.map((sub) => (
                              <a 
                                key={sub.title} 
                                href={sub.href}
                                onClick={(e) => handleItemClick(e, sub.title, sub.href, sub)}
                                className={`group relative block p-3.5 rounded-2xl transition-all duration-200 border overflow-hidden ${
                                  themeMode === 'dark'
                                    ? 'bg-white/[0.04] border-white/10 hover:border-white/20 active:bg-white/[0.08] active:scale-[0.985] shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.08)]'
                                    : 'bg-white/25 border-white/40 hover:bg-white/40 active:bg-white/50 active:scale-[0.985] shadow-[0_4px_16px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.7)]'
                                }`}
                              >
                                {/* Glossy specular highlight reflection */}
                                <div className={`absolute top-0 left-0 right-0 h-1/2 pointer-events-none bg-gradient-to-b ${themeMode === 'dark' ? 'from-white/[0.05]' : 'from-white/25'} to-transparent`} />
                                
                                <div className="relative z-10">
                                  <div className={`font-semibold text-sm flex items-center justify-between ${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    <span>{sub.title}</span>
                                    <div className={`p-1 rounded-full transition-transform duration-200 group-hover:translate-x-0.5 group-active:translate-x-1 ${
                                      themeMode === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-black/5 text-gray-500'
                                    }`}>
                                      <ChevronRight size={14} />
                                    </div>
                                  </div>
                                  {sub.desc && (
                                    <p className={`text-xs mt-1 leading-normal ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                      {sub.desc}
                                    </p>
                                  )}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Pixel solid border line */}
                      <div className={`w-full h-px ${themeMode === 'dark' ? 'bg-white/[0.08]' : 'bg-black/[0.06]'}`} />
                    </div>
                  );
                })}
                
                <div className="relative">
                  <button 
                    onClick={handleSupportClick}
                    className={`w-full flex items-center justify-between py-4 text-left group active:opacity-75 transition-opacity ${
                      themeMode === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    <span className="text-lg font-bold tracking-tight">{t.support}</span>
                    <div className={`p-1.5 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-active:translate-x-1 ${
                      themeMode === 'dark' ? 'bg-white/[0.06] text-white/80' : 'bg-black/[0.04] text-gray-700'
                    }`}>
                      <ChevronRight size={17} />
                    </div>
                  </button>
                  <div className={`w-full h-px ${themeMode === 'dark' ? 'bg-white/[0.08]' : 'bg-black/[0.06]'}`} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Modal */}
      <AnimatePresence>
        {showSupportModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 pointer-events-auto">
            {/* Click-away overlay with subtle dimmer matching overall theme */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`absolute inset-0 ${themeMode === 'dark' ? 'bg-black/40' : 'bg-black/15'}`} 
              onClick={() => setShowSupportModal(false)} 
            />
            
            <motion.div 
              key="support-modal-box"
              initial={{ opacity: 0, scale: 0.93, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ 
                type: "spring",
                stiffness: 420,
                damping: 32,
                mass: 0.7
              }}
              className={`relative w-full max-w-xl rounded-[2rem] p-8 text-center ${modalStyle}`}
            >
               <button 
                 onClick={() => setShowSupportModal(false)} 
                 className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${themeMode === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'}`}
               >
                 <X size={18} />
               </button>
               <h3 className={`text-2xl font-bold mb-2`}>{t.supportThanks}</h3>
               <div className={`bg-white p-2 rounded-xl shadow-inner mb-2 mx-auto w-full ${themeMode === 'dark' ? 'opacity-95' : ''}`}>
                  <img 
                    src={qrImage} 
                    loading="eager" 
                    decoding="async" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const currentSrc = target.src;
                      const currentIndex = SUPPORT_QR_SOURCES.findIndex(s => currentSrc.includes(s) || currentSrc === s);
                      if (currentIndex !== -1 && currentIndex + 1 < SUPPORT_QR_SOURCES.length) {
                        target.src = SUPPORT_QR_SOURCES[currentIndex + 1];
                      } else {
                        target.src = SUPPORT_QR_BASE64;
                      }
                    }}
                    className="w-full h-auto rounded-lg shadow-sm object-contain max-h-[70vh]" 
                    alt="Support Payment QR Code" 
                  />
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
