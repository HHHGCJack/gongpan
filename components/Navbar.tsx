import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight, 
  ExternalLink, 
  Moon, 
  Sun, 
  Globe, 
  ArrowLeft, 
  ArrowUpRight, 
  Sparkles,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../App';
import { Logo } from './Logo';
import { showcaseData } from '../src/data/showcases';
import { useCardTransition } from '../src/context/CardTransitionContext';
import { scrollToElementSmoothly } from '../src/utils/smoothScroll';

export const Navbar: React.FC = () => {
  const { themeMode, setThemeMode, language, setLanguage, showToast, pansouEnabled, openWelcomeModal, openSupportModal } = useTheme();
  const { startCollapse, status } = useCardTransition();
  const location = useLocation();
  const navigate = useNavigate();

  const handleBackToHome = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigate('/');
  };

  const isShowcasePage = location.pathname.startsWith('/showcase/');
  const currentShowcaseId = isShowcasePage ? location.pathname.replace('/showcase/', '') : '';
  const currentShowcase = currentShowcaseId && showcaseData[currentShowcaseId]
    ? (showcaseData[currentShowcaseId][language] || showcaseData[currentShowcaseId].zh)
    : null;

  const translations = {
    zh: {
      brand: 'G胖儿GongPan',
      backToHome: '返回主页',
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
      visitNow: '立即访问',
    },
    en: {
      brand: 'GongPan',
      backToHome: 'Back Home',
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
      visitNow: 'Visit Now',
    },
    ja: {
      brand: 'GongPan',
      backToHome: 'ホームに戻る',
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
      visitNow: '今すぐアクセス',
    },
    ko: {
      brand: 'GongPan',
      backToHome: '홈으로 돌아가기',
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
      visitNow: '지금 방문',
    },
    es: {
      brand: 'GongPan',
      backToHome: 'Volver al Inicio',
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
      visitNow: 'Visitar Ahora',
    },
    fr: {
      brand: 'GongPan',
      backToHome: 'Retour à l\'Accueil',
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
      visitNow: 'Visiter',
    },
    de: {
      brand: 'GongPan',
      backToHome: 'Zurück zur Startseite',
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
      visitNow: 'Jetzt besuchen',
    },
    el: {
      brand: 'GongPan',
      backToHome: 'Επιστροφή στην Αρχική',
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
      visitNow: 'Επίσκεψη Τώρα',
    }
  };

  const t = (translations as any)[language] || translations.en;

  const navData = [
    { 
      name: t.nav.learn, 
      targetId: 'section-learn',
      items: [
        { title: t.items.readingPro.title, desc: t.items.readingPro.desc, href: '/showcase/reading-pro' }
      ] 
    },
    { 
      name: t.nav.entertainment, 
      targetId: 'section-entertainment',
      items: [
        { 
          title: t.items.pansou.title, 
          desc: t.items.pansou.desc, 
          href: '/showcase/pansou'
        },
        { title: t.items.chat.title, desc: t.items.chat.desc, href: '/showcase/chat' }
      ] 
    },
    { 
      name: t.nav.tech, 
      targetId: 'section-tech',
      items: [
        { title: t.items.ai.title, desc: t.items.ai.desc, href: '/showcase/ai-agent' },
        { title: t.items.lab.title, desc: t.items.lab.desc, href: '/laboratory' }
      ] 
    }
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
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
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const toggleMobileItem = (index: number) => {
    setMobileExpandedCategories(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSupportClick = () => {
    if (openSupportModal) {
      openSupportModal();
    }
    setMobileMenuOpen(false);
  };

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

  const handleCategoryClick = (targetId?: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (!targetId) return;

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToElementSmoothly(targetId);
      }, 100);
    } else {
      scrollToElementSmoothly(targetId);
    }
  };

  const handleShowcaseVisit = () => {
    if (!currentShowcase) return;
    if (currentShowcase.requiresPansouCheck && !pansouEnabled) {
      showToast(language === 'zh' ? '因政策原因暂停服务' : 'Service suspended due to policy');
      return;
    }
    if (currentShowcase.isExternal) {
      window.open(currentShowcase.targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      navigate(currentShowcase.targetUrl);
    }
  };

  const getNavPillStyle = (isActive: boolean) => {
    const isDark = themeMode === 'dark';
    if (!isActive) {
      return isDark ? 'text-gray-300 hover:text-white border border-transparent' : 'text-gray-600 hover:text-black border border-transparent';
    }
    return isDark 
      ? 'text-white liquid-glass-pill-dark font-bold'
      : 'text-black liquid-glass-pill-light font-bold';
  };

  const getTextEffect = () => themeMode === 'dark' ? '[text-shadow:0_1px_2px_rgba(0,0,0,0.8)]' : '';

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
          themeMode === 'dark' ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/20 backdrop-blur-sm'
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
        {/* Base Nav Glass with Liquid Specular Highlight */}
        <div 
          className={`absolute top-0 left-0 w-full h-full -z-20 liquid-glass ${
             themeMode === 'dark' 
                ? 'bg-black/30 bg-gradient-to-b from-white/10 via-black/20 to-black/40 border-b border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)]' 
                : 'bg-white/40 bg-gradient-to-b from-white/80 via-white/40 to-white/20 border-b border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.04),inset_0_1.5px_1.5px_rgba(255,255,255,0.9)]'
          }`}
        />
        
        {/* Specular Liquid Edge Line */}
        <div className="absolute top-0 left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/40 to-transparent pointer-events-none -z-10" />

        {/* Dropdown Glass */}
        <div 
          className={`hidden lg:block absolute top-0 left-0 w-full h-[380px] pointer-events-none -z-10 transition-opacity duration-300 liquid-glass-heavy ${
             activeDropdown !== null ? 'opacity-100' : 'opacity-0'
          } ${
             themeMode === 'dark' 
                ? 'bg-black/40 bg-gradient-to-b from-white/10 via-black/20 to-transparent border-b border-white/10' 
                : 'bg-white/60 bg-gradient-to-b from-white/90 via-white/50 to-transparent border-b border-white/50'
          }`}
          style={{ 
             WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.85) 72%, rgba(0,0,0,0.5) 84%, rgba(0,0,0,0.15) 94%, rgba(0,0,0,0) 100%)',
             maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.85) 72%, rgba(0,0,0,0.5) 84%, rgba(0,0,0,0.15) 94%, rgba(0,0,0,0) 100%)'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between relative z-50">
          
          {/* LEFT: Showcase Specific Back Button OR Global Brand Logo */}
          <div className="flex items-center space-x-3">
            {isShowcasePage ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  onClick={handleBackToHome}
                  className={`group relative px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 text-xs sm:text-sm font-bold transition-all duration-300 active:scale-95 overflow-hidden ${
                    themeMode === 'dark'
                      ? 'liquid-glass liquid-glass-pill-dark text-white border border-white/25 shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1.5px_1.5px_rgba(255,255,255,0.35)] hover:border-white/40 hover:bg-white/15'
                      : 'liquid-glass liquid-glass-pill-light text-gray-900 border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.06),inset_0_1.5px_1.5px_rgba(255,255,255,1)] hover:border-white hover:bg-white/80'
                  }`}
                  title={t.backToHome}
                >
                  <div className="absolute inset-x-0 top-0 h-1/2 pointer-events-none bg-gradient-to-b from-white/30 dark:from-white/15 to-transparent" />
                  <ArrowLeft size={15} className="transition-transform duration-200 group-hover:-translate-x-0.5 relative z-10" />
                  <span className="hidden sm:inline relative z-10">{t.backToHome}</span>
                </button>

                {currentShowcase && (
                  <div className="flex items-center space-x-2 border-l border-black/10 dark:border-white/10 pl-2 sm:pl-3">
                    <span className="text-sm sm:text-base font-black tracking-tight truncate max-w-[140px] sm:max-w-xs">
                      {currentShowcase.title}
                    </span>
                    <span className="hidden md:inline-flex text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                      SHOWCASE
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/" className="flex items-center space-x-3 group z-50">
                <Logo size={36} className="group-hover:scale-115 transition-transform" />
                <span className={`text-xl font-bold tracking-tight relative ${getTextEffect()} ${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t.brand}
                </span>
              </Link>
            )}
          </div>

          {/* CENTER: Showcase CTA or Main Navigation */}
          {isShowcasePage && currentShowcase ? (
            <div className="hidden md:flex items-center space-x-3">
              <span className="text-xs font-mono text-gray-400">
                {currentShowcase.tag}
              </span>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-2 h-full">
              {navData.map((item, idx) => (
                <div 
                  key={item.name} 
                  className="h-full flex items-center"
                  onMouseEnter={() => handleNavTabEnter(idx)}
                >
                  <button 
                    onClick={() => handleCategoryClick(item.targetId)}
                    className={`px-5 py-2 text-sm font-semibold transition-all duration-200 rounded-full ${getNavPillStyle(activeDropdown === idx)} ${getTextEffect()}`}
                  >
                    {item.name}
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* RIGHT: Actions */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            
            {/* Direct Visit CTA on Showcase Page */}
            {isShowcasePage && currentShowcase && (
              <button
                onClick={handleShowcaseVisit}
                className="hidden sm:flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all mr-1"
              >
                <span>{currentShowcase.ctaText || t.visitNow}</span>
                <ArrowUpRight size={14} />
              </button>
            )}

            {/* Language Switcher */}
            <div 
              className="relative flex items-center"
              onMouseEnter={handleLangMouseEnter}
              onMouseLeave={handleLangMouseLeave}
            >
              <button 
                onClick={handleLangClick}
                className={`px-3 py-1.5 sm:py-2 rounded-full transition-colors flex items-center space-x-1.5 ${themeMode === 'dark' ? 'hover:bg-white/10 text-gray-200' : 'hover:bg-black/5 text-gray-700'}`} 
                title="切换语言 / Switch Language"
              >
                <Globe size={18} />
                <span className="text-sm font-semibold tracking-wide uppercase">{languages.find((l: any) => l.code === language)?.label || 'EN'}</span>
              </button>
              
              {/* Desktop Lang Dropdown */}
              <div 
                className={`absolute top-full right-0 mt-2 w-32 rounded-2xl overflow-hidden transition-[opacity,transform] duration-150 origin-top flex flex-col z-[100] p-1.5 liquid-glass border ${
                  langDropdownOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                } ${
                  themeMode === 'dark' 
                     ? 'liquid-glass-dark text-white border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.25)]' 
                     : 'liquid-glass-light text-gray-900 border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_1px_1.5px_rgba(255,255,255,0.95)]'
                }`}
              >
                {languages.map((l: any) => {
                  const isSelected = language === l.code;
                  return (
                    <button
                      key={l.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguage(l.code as any);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left pl-3.5 pr-4 py-1.5 text-xs sm:text-[13px] rounded-xl transition-all duration-150 flex items-center justify-between group ${
                        isSelected
                          ? (themeMode === 'dark' 
                              ? 'bg-white/[0.14] text-white font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] border border-white/20' 
                              : 'bg-black/[0.07] text-gray-950 font-bold shadow-[inset_0_1px_1px_rgba(0,0,0,0.06)] border border-black/[0.08]')
                          : (themeMode === 'dark' 
                              ? 'hover:bg-white/[0.08] text-white/70 hover:text-white border border-transparent font-medium' 
                              : 'hover:bg-black/[0.04] text-gray-600 hover:text-gray-950 border border-transparent font-medium')
                      }`}
                    >
                      <span className="tracking-tight">{l.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dark Mode Switcher */}
            <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${themeMode === 'dark' ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-black/5 text-gray-600'}`} title="切换主题 / Switch Theme">
              {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Support Me Button */}
            {!isShowcasePage && (
              <button 
                onClick={handleSupportClick}
                className={`hidden sm:inline-block ml-1 px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 rounded-full active:scale-95 ${
                  themeMode === 'dark'
                    ? 'liquid-glass-pill-dark text-white hover:bg-white/20'
                    : 'liquid-glass-pill-light text-black hover:bg-white/70'
                }`}
              >
                {t.support}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button 
              className={`lg:hidden p-2 rounded-full active:bg-black/5 ${themeMode === 'dark' ? 'text-white' : 'text-gray-800'}`}
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setLangDropdownOpen(false);
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Dropdown Content */}
        <div 
          className={`hidden lg:block absolute top-full left-0 w-full transition-[opacity,transform] duration-200 z-10 ${
            activeDropdown !== null && !isShowcasePage ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
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
                        <div className={`font-semibold text-lg mb-1 flex items-center space-x-1 ${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          <span>{subItem.title}</span>
                          <ChevronRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </div>
                        <div className={`text-sm ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{subItem.desc}</div>
                      </a>
                    ))}
                  </div>
              </div>
            ))}
          </div>
        </div>

      {/* Mobile Menu - Full Screen Liquid Glass Drawer */}
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
                {isShowcasePage && (
                  <div className="mb-4">
                    <button
                      onClick={() => {
                        navigate('/');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 transition-all duration-300 active:scale-95 border relative overflow-hidden ${
                        themeMode === 'dark'
                          ? 'liquid-glass liquid-glass-pill-dark text-white border-white/25 shadow-[0_8px_25px_rgba(0,0,0,0.5),inset_0_1.5px_1.5px_rgba(255,255,255,0.3)] hover:bg-white/15'
                          : 'liquid-glass liquid-glass-pill-light text-gray-900 border-white/80 shadow-[0_8px_25px_rgba(0,0,0,0.08),inset_0_1.5px_1.5px_rgba(255,255,255,1)] hover:bg-white/80'
                      }`}
                    >
                      <div className="absolute inset-x-0 top-0 h-1/2 pointer-events-none bg-gradient-to-b from-white/30 dark:from-white/15 to-transparent" />
                      <ArrowLeft size={16} className="relative z-10" />
                      <span className="relative z-10">{t.backToHome}</span>
                    </button>
                  </div>
                )}

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
      </nav>
    </>
  );
};
