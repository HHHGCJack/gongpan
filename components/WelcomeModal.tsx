import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Wrench, 
  Heart, 
  Coffee, 
  CheckCircle2, 
  ExternalLink, 
  Compass, 
  Layers, 
  Zap, 
  Smartphone,
  ChevronRight,
  Gift,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { useTheme } from '../App';
import { Logo } from './Logo';
import { 
  DEFAULT_SUPPORT_QR, 
  SUPPORT_QR_BASE64, 
  SUPPORT_QR_SOURCES 
} from '../src/assets/support_qr_base64';

interface WelcomeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialTab?: 'intro' | 'support';
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ 
  isOpen: externalIsOpen, 
  onClose: externalOnClose,
  initialTab = 'intro'
}) => {
  const { themeMode, language, showToast } = useTheme();
  const isDark = themeMode === 'dark';

  const [internalOpen, setInternalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'intro' | 'support'>(initialTab);
  const [copiedNote, setCopiedNote] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);
  const [qrImage, setQrImage] = useState<string>(() => {
    const saved = localStorage.getItem('custom_support_qr');
    if (saved && (saved.includes('nloln.de') || saved.includes('img2.') || saved.includes('support_qr_code_1787368553422'))) {
      localStorage.removeItem('custom_support_qr');
      return DEFAULT_SUPPORT_QR;
    }
    return saved || DEFAULT_SUPPORT_QR;
  });

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalOpen;

  useEffect(() => {
    if (externalIsOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [externalIsOpen, initialTab]);

  // Pre-warm support QR image in idle time
  useEffect(() => {
    if (typeof window !== 'undefined' && qrImage) {
      const img = new Image();
      img.src = qrImage;
    }
  }, [qrImage]);

  // Prevent background scrolling cleanly without causing page jumping
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflowY;
      const originalTouchAction = document.body.style.touchAction;
      
      document.body.style.overflowY = 'hidden';
      document.body.style.touchAction = 'none';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflowY = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  // Auto show on website open if not dismissed today
  useEffect(() => {
    if (externalIsOpen !== undefined) return;
    
    const todayKey = new Date().toISOString().slice(0, 10);
    const dismissedDate = localStorage.getItem('gongpan_welcome_dismiss_date');
    const hasSeenSession = sessionStorage.getItem('gongpan_welcome_seen_session');

    // If not dismissed for today and not seen this session, show after a slight delay for smooth entry
    if (dismissedDate !== todayKey && !hasSeenSession) {
      const timer = setTimeout(() => {
        setInternalOpen(true);
        sessionStorage.setItem('gongpan_welcome_seen_session', 'true');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [externalIsOpen]);

  const handleClose = () => {
    if (dontShowToday) {
      const todayKey = new Date().toISOString().slice(0, 10);
      localStorage.setItem('gongpan_welcome_dismiss_date', todayKey);
    }
    if (externalOnClose) {
      externalOnClose();
    } else {
      setInternalOpen(false);
    }
  };

  const translations = {
    zh: {
      badge: '最新版本 v2.9・更新日志',
      title: '欢迎来到 G胖儿 GongPan',
      subtitle: '极简・纯粹・高效的一站式优质资源与探索平台',
      tabIntro: '🚀 简介与更新日志',
      tabSupport: '💖 支持作者',
      aboutTitle: '平台简介',
      aboutDesc: 'G胖儿 (GongPan) 致力于打造无干扰、高质感的数字体验空间。聚合学习精读、极客工具箱、影视搜索、AI 智能体与前沿科技实验。',
      updatesTitle: '最新版本特性与视觉升级',
      fixesTitle: '体验打磨与细节优化',
      updateItems: [
        {
          icon: 'theme',
          tag: '设计升级',
          title: '详情页升级「液态玻璃流光 CTA」',
          desc: '详情页立即探索与跳转按键重构为 Apple 级 Liquid Glass 胶囊，融合多重折射与悬停呼吸光晕。'
        },
        {
          icon: 'ai',
          tag: '新功能',
          title: '上线「AI 投资智能体」',
          desc: 'AI 驱动的智能投资分析与财富决策助手，深度赋能个人洞察与策略模拟。'
        },
        {
          icon: 'search',
          tag: '搜索升级',
          title: '影视盘搜 & 资源极速聚合通道',
          desc: '全新跨网盘即时搜索通道，一键检索高清影视、学习资料与热门网盘。'
        }
      ],
      fixItems: [
        {
          title: '详情页界面精简化与视觉降噪',
          desc: '去除标题旋转动效与冗余交互按钮，首屏排版更加大气清爽、直达核心。'
        },
        {
          title: '支持作者界面全屏超清大图升级',
          desc: '重构收款码展示，取消内嵌多余滚动，大幅放大微信/支付宝收款码，即开即扫。'
        },
        {
          title: '弹窗全透亮无压暗置顶架构',
          desc: '弹窗完全置顶于导航栏之上，去除背景遮罩压暗，保持页面通透晶莹。'
        },
        {
          title: 'GPU 复合图层加速与抗微闪烁优化',
          desc: '采用独立渲染图层与 GPU 复合通道，消除液态玻璃材质在所有设备滚动时的微闪烁。'
        }
      ],
      supportHeading: '请作者喝杯咖啡 ☕',
      supportDesc: 'G胖儿由独立开发者倾心维护，您的每一份支持都是持续优化体验、接入新工具与维系平台运行的最大动力！',
      supportTip: '支持微信 / 支付宝扫码赞助',
      dontShowToday: '今日不再弹出',
      exploreBtn: '开始探索',
      supportBtn: '赞助支持',
      copiedToast: '感谢您的支持与厚爱！'
    },
    en: {
      badge: "What's New v2.9・Changelog",
      title: 'Welcome to GongPan',
      subtitle: 'A minimalist, high-efficiency portal for tools and premium resources',
      tabIntro: '🚀 Overview & Changelog',
      tabSupport: '💖 Support Me',
      aboutTitle: 'About GongPan',
      aboutDesc: 'GongPan is a distraction-free, Apple-inspired digital hub integrating AI agents, cloud search, tools, and curated portals.',
      updatesTitle: 'Recent Updates & Design Upgrades',
      fixesTitle: 'UI Polishing & Optimizations',
      updateItems: [
        {
          icon: 'theme',
          tag: 'Design',
          title: 'Liquid Glass CTA Action Buttons',
          desc: 'Product detail pages upgraded with Apple-inspired Liquid Glass capsules with specular light reflection.'
        },
        {
          icon: 'ai',
          tag: 'New Feature',
          title: 'AI Investment Agent Launched',
          desc: 'AI-driven financial market intelligence and investment decision assistant.'
        },
        {
          icon: 'search',
          tag: 'Upgraded',
          title: 'Cloud Drive Media & Search Aggregator',
          desc: 'Instant cross-platform search for high-definition media, files, and resources.'
        }
      ],
      fixItems: [
        {
          title: 'Detail page visual decluttering',
          desc: 'Removed distracting spinners and redundant buttons for a pristine, focused hero view.'
        },
        {
          title: 'Sponsor QR enlarged with zero scroll',
          desc: 'Significantly enlarged payment QR code and eliminated inner scrolling for effortless scanning.'
        },
        {
          title: 'Fully transparent backdrop & top z-index',
          desc: 'Removed dark backdrop dimming to keep the background crystal clear and unobstructed.'
        },
        {
          title: 'Flicker-free GPU-accelerated glass rendering',
          desc: 'Compositing layer optimization that eliminates micro-flickers during card scrolling.'
        }
      ],
      supportHeading: 'Buy me a coffee ☕',
      supportDesc: 'GongPan is maintained by an independent creator. Your support fuels ongoing updates, curated tools, and server maintenance!',
      supportTip: 'Scan with WeChat / Alipay to sponsor',
      dontShowToday: "Don't show again today",
      exploreBtn: 'Explore Now',
      supportBtn: 'Support Creator',
      copiedToast: 'Thank you for your warm support!'
    },
    ja: {
      badge: '最新情報 v2.9・更新履歴',
      title: 'GongPan へようこそ',
      subtitle: '洗练されたデザインと高機能なリソース＆ツールハブ',
      tabIntro: '🚀 概要と更新履歴',
      tabSupport: '💖 開発者を支援',
      aboutTitle: 'サイト紹介',
      aboutDesc: 'GongPan はミニマリスト向けの一体型ポータルです。AI 投資モデル、リソース検索、便利ツールを提供します。',
      updatesTitle: '最新アップデートとデザイン改善',
      fixesTitle: 'UIブラッシュアップと最適化',
      updateItems: [
        {
          icon: 'theme',
          tag: 'デザイン',
          title: 'リキッドグラス CTA ボタン実装',
          desc: '詳細ページのアクションボタンをApple風のリキッドグラス仕様に一新。'
        },
        {
          icon: 'ai',
          tag: '新機能',
          title: '「AI投資エージェント」公開',
          desc: 'AI主導のスマート投資分析および資産意思決定アシスタント。'
        },
        {
          icon: 'search',
          tag: '更新',
          title: 'クラウド検索 & メディア集約',
          desc: '高解像度メディアや学習リソースを瞬時に横断検索。'
        }
      ],
      fixItems: [
        {
          title: '詳細ページのレイアウト簡素化',
          desc: '回転エフェクトや余分なボタンを整理し、洗練されたファーストビューを実現。'
        },
        {
          title: '支援QRコードの拡大とスクロール廃止',
          desc: 'QRコードをより大きく高解像度で表示し、スムーズに読み取り可能。'
        },
        {
          title: '透明背景と最前面モーダル構造',
          desc: '背後の暗転をなくし、明るく開放感のあるガラスオーバーレイを提供。'
        },
        {
          title: 'GPUアクセラレーションによるちらつき防止',
          desc: 'すりガラス効果のスクロール時のレンダリングチラつきを完全防止。'
        }
      ],
      supportHeading: 'コーヒーを奢る ☕',
      supportDesc: '皆様の温かいご支援が、継続的な機能追加やツールの開発、サーバー運営の原動力となります！',
      supportTip: 'WeChat / Alipay で支援できます',
      dontShowToday: '今日中は再表示しない',
      exploreBtn: 'サイトを見る',
      supportBtn: '支援する',
      copiedToast: 'ご支援ありがとうございます！'
    },
    ko: {
      badge: '최신 업데이트 v2.9・변경 내역',
      title: 'GongPan 에 오신 것을 환영합니다',
      subtitle: '심플함과 효율성을 극대화한 프리미엄 리소스 허브',
      tabIntro: '🚀 소개 및 업데이트 내역',
      tabSupport: '💖 후원하기',
      aboutTitle: '플랫폼 소개',
      aboutDesc: 'GongPan 은 AI 투자 에이전트, 클라우드 검색 및 다양한 도구를 한곳에 모은 직관적인 디지털 포털입니다.',
      updatesTitle: '최신 기능 및 디자인 업그레이드',
      fixesTitle: '디테일 개선 및 최적화',
      updateItems: [
        {
          icon: 'theme',
          tag: '디자인',
          title: '상세 페이지 리퀴드 글래스 CTA 버튼',
          desc: '빛 굴절 효과와 반투명 유리 질감을 결합한 프리미엄 액션 버튼 적용.'
        },
        {
          icon: 'ai',
          tag: '신규',
          title: '「AI 투자 에이전트」 출시',
          desc: 'AI 기반 스마트 투자 분석 및 자산 의사결정 비서.'
        },
        {
          icon: 'search',
          tag: '개선',
          title: '클라우드 리소스 및 미디어 통합 검색',
          desc: '고화질 미디어와 유용한 자료를 원클릭으로 신속하게 검색.'
        }
      ],
      fixItems: [
        {
          title: '상세 페이지 화면 집중도 향상',
          desc: '불필요한 회전 효과와 중복 버튼을 제거하여 직관적 탐색 지원.'
        },
        {
          title: '후원 QR 코드 확대 및 내부 스크롤 제거',
          desc: '더 크고 선명한 QR 코드를 제공하여 손쉬운 스캔 지원.'
        },
        {
          title: '배경 암전 없는 투명 모달 구조',
          desc: '배경을 어둡게 하지 않고 맑고 투명한 오버레이 레이아웃 유지.'
        },
        {
          title: 'GPU 가속 스크롤 깜빡임 제거',
          desc: '유리 질감 카드 스크롤 시 발생하던 미세한 화면 떨림 해결.'
        }
      ],
      supportHeading: '개발자에게 커피 한 잔 ☕',
      supportDesc: '여러분의 따뜻한 관심과 후원은 지속적인 서비스 개선과 새로운 기능 개발에 큰 힘이 됩니다!',
      supportTip: 'WeChat / Alipay QR 코드 지원',
      dontShowToday: '오늘 하루 보지 않기',
      exploreBtn: '시작하기',
      supportBtn: '후원하기',
      copiedToast: '응원해 주셔서 진심으로 감사드립니다!'
    },
    es: {
      badge: 'Novedades v2.9・Historial',
      title: 'Bienvenido a GongPan',
      subtitle: 'Un portal minimalista y eficiente para herramientas y recursos premium',
      tabIntro: '🚀 Resumen y Cambios',
      tabSupport: '💖 Apoyar al Creador',
      aboutTitle: 'Sobre GongPan',
      aboutDesc: 'GongPan es un espacio digital inspirado en Apple que integra agentes de IA, búsqueda de recursos y utilidades.',
      updatesTitle: 'Actualizaciones y Diseño',
      fixesTitle: 'Correcciones y Rendimiento',
      updateItems: [
        {
          icon: 'theme',
          tag: 'Diseño',
          title: 'Botones CTA en Liquid Glass',
          desc: 'Páginas de producto renovadas con botones translúcidos y reflejos luminosos.'
        },
        {
          icon: 'ai',
          tag: 'Nuevo',
          title: 'Agente de Inversión IA',
          desc: 'Asistente inteligente de análisis de inversiones y decisiones financieras.'
        },
        {
          icon: 'search',
          tag: 'Mejora',
          title: 'Buscador de Nube y Multimedia',
          desc: 'Búsqueda instantánea de recursos, películas y archivos multimedia.'
        }
      ],
      fixItems: [
        {
          title: 'Diseño limpio y enfocado',
          desc: 'Eliminación de elementos distractores y botones redundantes en la vista principal.'
        },
        {
          title: 'Código QR ampliado y sin desplazamiento',
          desc: 'Código de pago más grande y nítido para un escaneo inmediato.'
        },
        {
          title: 'Fondo totalmente transparente',
          desc: 'Ventana modal nítida sin oscurecer el fondo de la página.'
        },
        {
          title: 'Renderizado acelerado por GPU',
          desc: 'Desplazamiento suave sin parpadeos en tarjetas translúcidas.'
        }
      ],
      supportHeading: 'Invítame a un café ☕',
      supportDesc: '¡Tu apoyo ayuda a mantener el sitio, actualizar contenidos y desarrollar nuevas utilidades!',
      supportTip: 'Escanea el código QR para patrocinar',
      dontShowToday: 'No mostrar hoy',
      exploreBtn: 'Explorar',
      supportBtn: 'Apoyar',
      copiedToast: '¡Muchas gracias por su apoyo!'
    },
    fr: {
      badge: 'Nouveautés & Aperçu',
      title: 'Bienvenue sur GongPan',
      subtitle: 'Un portail minimaliste et puissant pour vos ressources et outils',
      tabIntro: '🚀 Aperçu & Journal',
      tabSupport: '💖 Soutenir',
      aboutTitle: 'À propos de GongPan',
      aboutDesc: 'GongPan est un hub numérique épuré réunissant agents IA, recherche de ressources et utilitaires.',
      updatesTitle: 'Mises à jour récentes',
      fixesTitle: 'Correctifs & Performances',
      updateItems: [
        {
          icon: 'ai',
          tag: 'Nouveau',
          title: 'Agent d’Investissement IA',
          desc: 'Assistant d’analyse d’investissement intelligent et d’aide à la décision.'
        },
        {
          icon: 'search',
          tag: 'Mise à niveau',
          title: 'Moteur de Recherche Multimédia Cloud',
          desc: 'Recherche instantanée multiplateforme de médias et documents.'
        },
        {
          icon: 'theme',
          tag: 'Design',
          title: 'Interface Liquid Glass',
          desc: 'Esthétique de verre dépoli ultra-fluide inspirée d’Apple.'
        }
      ],
      fixItems: [
        {
          title: 'Verrouillage du défilement d’arrière-plan',
          desc: 'Empêche l’arrière-plan de bouger lors du défilement dans la modale.'
        },
        {
          title: 'Anti-scintillement accéléré par GPU',
          desc: 'Défilement fluide sur toutes les surfaces en verre dépoli.'
        },
        {
          title: 'Capsule mobile supérieure réajustée',
          desc: 'Disposition plus aérée des boutons de langue, thème et menu.'
        },
        {
          title: 'QR Code haute définition avec secours CDN',
          desc: 'Cadre agrandi et chargement instantané garanti.'
        }
      ],
      supportHeading: 'Offrez-moi un café ☕',
      supportDesc: 'Votre soutien permet de maintenir ce projet indépendant et d’ajouter de nouvelles fonctionnalités !',
      supportTip: 'Scannez le QR code pour contribuer',
      dontShowToday: 'Ne plus afficher aujourd’hui',
      exploreBtn: 'Explorer',
      supportBtn: 'Soutenir',
      copiedToast: 'Merci infiniment pour votre soutien !'
    },
    de: {
      badge: 'Neuigkeiten & Übersicht',
      title: 'Willkommen bei GongPan',
      subtitle: 'Ein minimalistisches Portal für Werkzeuge und hochwertige Ressourcen',
      tabIntro: '🚀 Übersicht & Changelog',
      tabSupport: '💖 Entwickler unterstützen',
      aboutTitle: 'Über GongPan',
      aboutDesc: 'GongPan ist ein digitales Zentrum für KI-Investment-Agenten, Cloud-Suche und praktische Werkzeuge.',
      updatesTitle: 'Aktuelle Updates & Funktionen',
      fixesTitle: 'Fehlerbehebungen & Optimierung',
      updateItems: [
        {
          icon: 'ai',
          tag: 'Neu',
          title: 'KI-Investment-Agent gestartet',
          desc: 'KI-gestützter Assistent für intelligente Anlageanalyse und Vermögensentscheidungen.'
        },
        {
          icon: 'search',
          tag: 'Upgrade',
          title: 'Cloud-Medien & Ressourcensuche',
          desc: 'Blitzschnelle plattformübergreifende Suche nach Medien und Dateien.'
        },
        {
          icon: 'theme',
          tag: 'Design',
          title: 'Liquid Glass UI',
          desc: 'Feine Glasmorphismus-Ästhetik mit subtilen Lichtreflexen.'
        }
      ],
      fixItems: [
        {
          title: 'Hintergrund-Scrollsperre für Dialoge',
          desc: 'Verhindert das Scrollen des Seitenhintergrunds bei geöffnetem Fenster.'
        },
        {
          title: 'GPU-beschleunigtes flimmerfreies Scrollen',
          desc: 'Flüssiges Scrollen auf transluzenten Glasoberflächen.'
        },
        {
          title: 'Mobile Header-Kapsel optimiert',
          desc: 'Mehr Raum für Sprachauswahl, Theme-Schalter und Menü.'
        },
        {
          title: 'Hochauflösender QR-Code mit CDN-Fallback',
          desc: 'Vergrößerter Rahmen mit schneller Base64-Ausfallsicherung.'
        }
      ],
      supportHeading: 'Spendier mir einen Kaffee ☕',
      supportDesc: 'Deine Unterstützung treibt die kontinuierliche Entwicklung und Pflege der Plattform voran!',
      supportTip: 'QR-Code scannen zur Unterstützung',
      dontShowToday: 'Heute nicht mehr anzeigen',
      exploreBtn: 'Entdecken',
      supportBtn: 'Unterstützen',
      copiedToast: 'Vielen Dank für Ihre Unterstützung!'
    },
    el: {
      badge: 'Ενημερώσεις & Επισκόπηση',
      title: 'Καλώς ήρθατε στο GongPan',
      subtitle: 'Μινιμαλιστική πλατφόρμα εργαλείων και premium πόρων',
      tabIntro: '🚀 Επισκόπηση & Αλλαγές',
      tabSupport: '💖 Υποστήριξη',
      aboutTitle: 'Σχετικά με το GongPan',
      aboutDesc: 'Ένας ψηφιακός κόμβος με πράκτορες AI, αναζήτηση πόρων και σύγχρονα εργαλεία.',
      updatesTitle: 'Πρόσφατες Ενημερώσεις',
      fixesTitle: 'Διορθώσεις & Απόδοση',
      updateItems: [
        {
          icon: 'ai',
          tag: 'Νέο',
          title: 'Agent Επενδύσεων AI',
          desc: 'Βοηθός ανάλυσης επενδύσεων και λήψης οικονομικών αποφάσεων με AI.'
        },
        {
          icon: 'search',
          tag: 'Αναβάθμιση',
          title: 'Συγκέντρωση Αναζήτησης Cloud & Media',
          desc: 'Άμεση αναζήτηση ταινιών, εγγράφων και ψηφιακών πόρων.'
        },
        {
          icon: 'theme',
          tag: 'Σχεδίαση',
          title: 'Liquid Glass UI',
          desc: 'Κομψή αισθητική ημιδιαφανούς γυαλιού.'
        }
      ],
      fixItems: [
        {
          title: 'Κλείδωμα κύλισης παρασκηνίου',
          desc: 'Πλήρης απομόνωση κύλισης κατά την ανάγνωση του παραθύρου.'
        },
        {
          title: 'Ομαλή κύλιση χωρίς τρεμόπαιγμα GPU',
          desc: 'Βελτιστοποιημένη απόδοση σε όλες τις επιφάνειες γυαλιού.'
        },
        {
          title: 'Ανανεωμένη κάψουλα κεφαλίδας κινητού',
          desc: 'Καλύτερες αποστάσεις για αλλαγή γλώσσας, θέματος και μενού.'
        },
        {
          title: 'QR Code υψηλής ανάλυσης με εφεδρεία CDN',
          desc: 'Μεγαλύτερο πλαίσιο και άμεση φόρτωση.'
        }
      ],
      supportHeading: 'Κέρασέ με έναν καφέ ☕',
      supportDesc: 'Η υποστήριξή σας διατηρεί την πλατφόρμα ενεργή και ανανεωμένη!',
      supportTip: 'Σαρώστε τον κωδικό QR για χορηγία',
      dontShowToday: 'Να μην εμφανιστεί ξανά σήμερα',
      exploreBtn: 'Εξερεύνηση',
      supportBtn: 'Υποστήριξη',
      copiedToast: 'Ευχαριστούμε θερμά για την υποστήριξη!'
    }
  };

  const t = translations[language] || translations.zh;

  // Pure liquid crystal glass modal styling with refractive highlight and specular translucency
  const glassCardStyle = isDark
    ? 'liquid-glass liquid-glass-dark text-white shadow-[0_40px_100px_rgba(0,0,0,0.8),inset_0_1.5px_2px_rgba(255,255,255,0.25)]'
    : 'liquid-glass liquid-glass-light text-gray-900 shadow-[0_40px_100px_rgba(0,0,0,0.12),inset_0_2px_3px_rgba(255,255,255,1)]';

  const tabActiveStyle = isDark
    ? 'liquid-glass-pill-dark text-white font-bold'
    : 'liquid-glass-pill-light text-gray-900 font-bold';

  const tabInactiveStyle = isDark
    ? 'text-white/60 hover:text-white hover:bg-white/[0.08] border border-transparent'
    : 'text-gray-600 hover:text-gray-950 hover:bg-white/30 border border-transparent';

  // Inner cards: high-transparency liquid glass facets
  const itemCardStyle = isDark
    ? 'liquid-glass-pill-dark text-white/90 hover:bg-white/[0.12] transition-all duration-200'
    : 'liquid-glass-pill-light text-gray-800 hover:bg-white/80 transition-all duration-200';

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-auto overscroll-none"
          id="welcome-modal-container"
        >
          {/* Backdrop overlay (Transparent, does not darken background) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-transparent cursor-pointer"
            onClick={handleClose}
          />

          {/* Modal box - Spacious, Centered & High Resolution */}
          <motion.div
            key="welcome-modal-dialog"
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            className={`relative w-full max-w-2xl sm:max-w-3xl my-auto max-h-[90vh] flex flex-col rounded-[2.5rem] overflow-hidden isolate transform-gpu shadow-2xl [transform:translateZ(0)] ${glassCardStyle}`}
            role="dialog"
            aria-modal="true"
          >
            {/* Top Glossy Specular Reflection Accent */}
            <div className={`absolute top-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-b ${isDark ? 'from-white/[0.16] via-white/[0.03]' : 'from-white/40 via-white/10'} to-transparent`} />

            {/* Header */}
            <div className="relative z-10 shrink-0 px-5 pt-5 pb-3.5 sm:px-8 sm:pt-7 sm:pb-4 border-b border-black/[0.06] dark:border-white/[0.08] flex items-start justify-between">
              <div className="flex items-center space-x-3 sm:space-x-3.5">
                <Logo size={42} className="sm:w-[46px] sm:h-[46px] shrink-0" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h2 className="text-lg sm:text-2xl font-bold tracking-tight truncate">{t.title}</h2>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border shrink-0 ${
                      isDark 
                        ? 'bg-white/10 text-white/90 border-white/20' 
                        : 'bg-black/5 text-gray-800 border-black/10'
                    }`}>
                      <Sparkles size={10} className="mr-1 sm:w-[11px] sm:h-[11px]" />
                      {t.badge}
                    </span>
                  </div>
                  <p className={`text-[11px] sm:text-sm mt-0.5 line-clamp-1 sm:line-clamp-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.subtitle}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className={`p-2 sm:p-2.5 rounded-full transition-all duration-200 active:scale-95 shrink-0 ml-2 ${
                  isDark 
                    ? 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]' 
                    : 'bg-white/60 hover:bg-white/90 text-gray-700 hover:text-gray-950 border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.05),inset_0_1px_1.5px_rgba(255,255,255,0.9)]'
                }`}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs Navigation */}
            <div className="relative z-10 shrink-0 px-6 sm:px-8 pt-3.5 pb-2 flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('intro')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                  activeTab === 'intro' ? tabActiveStyle : tabInactiveStyle
                }`}
              >
                <Compass size={15} />
                <span>{t.tabIntro}</span>
              </button>
              <button
                onClick={() => setActiveTab('support')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                  activeTab === 'support' ? tabActiveStyle : tabInactiveStyle
                }`}
              >
                <Heart size={15} className={activeTab === 'support' ? 'text-rose-500' : ''} />
                <span>{t.tabSupport}</span>
              </button>
            </div>

            {/* Modal Body - Scrollable with fixed hardware layer */}
            <div className="relative z-10 px-6 sm:px-8 py-4 overflow-y-auto overscroll-contain flex-1 min-h-0 scrollbar-hide space-y-6 transform-gpu [transform:translateZ(0)]">
              {activeTab === 'intro' ? (
                <div className="space-y-6">
                  {/* Website Intro Card */}
                  <div className={`p-4 sm:p-5 rounded-2xl ${itemCardStyle}`}>
                    <div className="flex items-center space-x-2.5 mb-2">
                      <div className="p-1.5 rounded-lg bg-blue-500/15 text-blue-500">
                        <Layers size={17} />
                      </div>
                      <h3 className="font-bold text-sm sm:text-base">{t.aboutTitle}</h3>
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.aboutDesc}
                    </p>
                  </div>

                  {/* Recent Updates */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Zap size={16} className="text-amber-500" />
                      <h3 className="font-bold text-sm sm:text-base tracking-tight">{t.updatesTitle}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {t.updateItems.map((item, i) => (
                        <div key={i} className={`p-3.5 rounded-2xl flex flex-col justify-between ${itemCardStyle}`}>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                                {item.tag}
                              </span>
                            </div>
                            <h4 className="font-semibold text-xs sm:text-sm mb-1">{item.title}</h4>
                            <p className={`text-xs leading-normal ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bug Fixes & Optimization */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Wrench size={16} className="text-blue-500" />
                      <h3 className="font-bold text-sm sm:text-base tracking-tight">{t.fixesTitle}</h3>
                    </div>
                    <div className="space-y-2.5">
                      {t.fixItems.map((item, i) => (
                        <div key={i} className={`p-3 sm:p-3.5 rounded-2xl flex items-start space-x-3 ${itemCardStyle}`}>
                          <div className="mt-0.5 text-emerald-500 shrink-0">
                            <CheckCircle2 size={16} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-xs sm:text-sm">{item.title}</h4>
                            <p className={`text-xs mt-0.5 leading-normal ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Support Option Tab - Enlarged QR Container with Clean Presentation */
                <div className="flex flex-col items-center text-center py-2 sm:py-3 space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-500 shadow-inner">
                      <Coffee size={20} className="text-rose-500 shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">{t.supportHeading}</h3>
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed mt-2 max-w-md ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.supportDesc}
                    </p>
                  </div>

                  {/* Elegant Enlarged QR Image Container with Liquid Glass Specular Frame */}
                  <div className={`relative p-4 sm:p-6 rounded-3xl max-w-[380px] sm:max-w-[450px] w-full shadow-2xl transition-all duration-300 ${
                    isDark 
                      ? 'bg-white/5 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)]' 
                      : 'bg-white/40 border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,0.95)]'
                  }`}>
                    <div className="bg-white p-3.5 sm:p-5 rounded-2xl shadow-sm overflow-hidden flex items-center justify-center">
                      <img 
                        src={qrImage || SUPPORT_QR_BASE64} 
                        loading="eager" 
                        decoding="async" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== SUPPORT_QR_BASE64) {
                            target.src = SUPPORT_QR_BASE64;
                          }
                        }}
                        className="w-full h-auto max-h-[380px] sm:max-h-[450px] rounded-xl object-contain" 
                        alt="Support QR Code" 
                      />
                    </div>

                    {/* QR Tip & Quick Action Controls */}
                    <div className="mt-3 flex flex-col items-center space-y-2.5">
                      <div className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-300 flex items-center justify-center space-x-1.5">
                        <Gift size={14} className="text-rose-500 shrink-0" />
                        <span>{t.supportTip}</span>
                      </div>

                      <div className="flex items-center gap-2 w-full justify-center">
                        <a
                          href={qrImage || SUPPORT_QR_BASE64}
                          download="GongPan_Support_QR.jpg"
                          className={`w-full max-w-[340px] sm:max-w-[380px] py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all duration-200 active:scale-95 ${
                            isDark 
                              ? 'bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-white/30' 
                              : 'bg-black/5 hover:bg-black/10 text-gray-800 border border-black/10 hover:border-black/20'
                          }`}
                          title="保存赞赏码图片到本地"
                        >
                          <Download size={14} />
                          <span>保存收款码到本地</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer - Fully transparent liquid glass seamlessly connected to dialog frame */}
            <div className={`relative z-10 shrink-0 px-5 py-3.5 sm:px-8 sm:py-4 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 transform-gpu [transform:translateZ(0)] ${
              isDark ? 'bg-black/15' : 'bg-white/15'
            }`}>
              {/* Remember choice today checkbox */}
              <label className="flex items-center space-x-2.5 cursor-pointer select-none text-xs text-gray-500 dark:text-gray-400 py-1 touch-manipulation">
                <input 
                  type="checkbox"
                  checked={dontShowToday}
                  onChange={(e) => setDontShowToday(e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500/40 w-4 h-4 cursor-pointer accent-blue-500 shrink-0"
                />
                <span className="leading-tight">{t.dontShowToday}</span>
              </label>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
                {activeTab === 'intro' ? (
                  <>
                    <button
                      onClick={() => setActiveTab('support')}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 active:scale-95 ${
                        isDark 
                          ? 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30' 
                          : 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200'
                      }`}
                    >
                      <Heart size={14} className="text-rose-500" />
                      <span>{t.supportBtn}</span>
                    </button>
                    <button
                      onClick={handleClose}
                      className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-95 flex items-center space-x-1"
                    >
                      <span>{t.exploreBtn}</span>
                      <ChevronRight size={15} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setActiveTab('intro')}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 active:scale-95 ${
                        isDark 
                          ? 'bg-white/10 hover:bg-white/15 text-white border border-white/10' 
                          : 'bg-black/5 hover:bg-black/10 text-gray-700 border border-black/5'
                      }`}
                    >
                      <Compass size={14} />
                      <span>{t.tabIntro}</span>
                    </button>
                    <button
                      onClick={handleClose}
                      className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-95 flex items-center space-x-1"
                    >
                      <span>{language === 'zh' ? '关闭' : language === 'en' ? 'Close' : '閉じる'}</span>
                      <Check size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
