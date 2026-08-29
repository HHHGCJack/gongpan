import { Language } from '../types';

export interface ShowcaseFeature {
  icon: string;
  title: string;
  description: string;
  highlight?: string;
  metric?: string;
  metricLabel?: string;
}

export interface ShowcaseSpec {
  value: string;
  label: string;
  subtext: string;
}

export interface ShowcaseProduct {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  heroHeadline: string;
  heroSubheadline: string;
  accentColor: string;
  gradient: string;
  heroImage: string;
  targetUrl: string;
  fallbackUrls?: string[];
  isExternal: boolean;
  requiresPansouCheck?: boolean;
  ctaText?: string;
  visionStatement: string;
  visionDetails: string;
  features: ShowcaseFeature[];
  specs: ShowcaseSpec[];
  interactiveDemoType: 'search' | 'reader' | 'ai' | 'chat';
  demoDetails: {
    title: string;
    subtitle: string;
    sampleData: any;
  };
  finalCtaTitle: string;
  finalCtaSubtitle: string;
}

export const showcaseData: Record<string, Record<Language, ShowcaseProduct>> = {
  pansou: {
    zh: {
      id: 'pansou',
      tag: 'HOT TOOL · 极速聚合',
      tagColor: 'from-amber-500 to-orange-500',
      title: '网盘影视资源搜',
      heroHeadline: '全网云端资源，一触即达。',
      heroSubheadline: '打破信息孤岛与平台壁垒。秒级爬梳海量网盘生态，直通 4K 蓝光影视、无损音乐与海量学习资料。',
      accentColor: '#f59e0b',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1618005182384-a83a8bd57fbe&w=1200&q=75&output=webp',
      targetUrl: 'https://so.252035.xyz',
      fallbackUrls: ['https://pansou.app/', 'http://gongcheng.yyboxdns.com:12309'],
      isExternal: true,
      requiresPansouCheck: true,
      ctaText: '立即进入资源搜索',
      visionStatement: '每一次搜索，都是对浩瀚信息网络的一次极速穿梭。',
      visionDetails: '传统搜索常常被冗余广告、失效链接与多层跳转所困扰。网盘影视资源搜采用自研分布式索引节点，配合智能死链过滤与多源嗅探算法，让高价值资源秒级呈现在你眼前。',
      features: [
        {
          icon: 'Search',
          title: '全生态多盘聚合',
          description: '深度支持百度网盘、夸克网盘、阿里云盘、迅雷云盘等主流平台，一次输入同步检索全网公共共享。',
          highlight: '全网覆盖 99% 热门共享'
        },
        {
          icon: 'Zap',
          title: '0.08 秒极速响应',
          description: '优化的倒排索引与高并发请求通道，毫秒级返回海量优质条目，搜索无需漫长等待。',
          highlight: '毫秒级异步索引'
        },
        {
          icon: 'ShieldCheck',
          title: '智能失效自检与过滤',
          description: '内置实时链接健康探测引擎，自动剔除失效或被封禁的死链，只呈现 100% 可用资源。',
          highlight: '实时健康检测'
        },
        {
          icon: 'Sparkles',
          title: '纯净原画无广直链',
          description: '拒绝套路跳转与营销弹窗，直达原网盘官方转存页面，享受原汁原味的高清视听盛宴。',
          highlight: '4K HDR / 原画直达'
        }
      ],
      specs: [
        { value: '0.08s', label: '平均响应延迟', subtext: '全网索引秒级调度' },
        { value: '10M+', label: '已收录公共资源', subtext: '涵盖影视/软件/学习' },
        { value: '99.8%', label: '有效资源存活率', subtext: '全天候智能健康校验' },
        { value: '4K HDR', label: '极致影音画质', subtext: '无损原画转存即享' }
      ],
      interactiveDemoType: 'search',
      demoDetails: {
        title: '体验超光速搜索交互',
        subtitle: '输入关键词，预览多网盘即时索引匹配效果',
        sampleData: [
          { name: '奥本海默 Oppenheimer 2023 [4K HDR 蓝光原盘 杜比视界]', source: '夸克网盘', size: '24.8 GB', time: '10分钟前更新' },
          { name: '沙丘2 Dune: Part Two [IMAX 增强版 60FPS 双语字幕]', source: '阿里云盘', size: '18.2 GB', time: '1小时前更新' },
          { name: '星际穿越 Interstellar [1080P/4K 无损收藏版]', source: '百度网盘', size: '14.5 GB', time: '3小时前更新' }
        ]
      },
      finalCtaTitle: '海量影视与资源，即刻探索',
      finalCtaSubtitle: '告别找资源的繁琐，开启你的极速云端视界。'
    },
    en: {
      id: 'pansou',
      tag: 'HOT TOOL · FAST AGGREGATOR',
      tagColor: 'from-amber-500 to-orange-500',
      title: 'Cloud Resource Search',
      heroHeadline: 'All Cloud Resources. One Instant Search.',
      heroSubheadline: 'Break information silos and platform barriers. Ultra-fast indexing across major cloud storage platforms for 4K movies, lossless audio, and educational resources.',
      accentColor: '#f59e0b',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1618005182384-a83a8bd57fbe&w=1200&q=75&output=webp',
      targetUrl: 'https://so.252035.xyz',
      fallbackUrls: ['https://pansou.app/', 'http://gongcheng.yyboxdns.com:12309'],
      isExternal: true,
      requiresPansouCheck: true,
      ctaText: 'Visit Search Engine',
      visionStatement: 'Every query is a lightning-fast voyage across the universe of shared data.',
      visionDetails: 'Traditional search is plagued by broken links and endless redirects. Our search engine utilizes distributed indexing and link health verification to present high-value content in milliseconds.',
      features: [
        {
          icon: 'Search',
          title: 'Multi-Cloud Aggregation',
          description: 'Seamlessly query Quark, Baidu, AliCloud, and Xunlei in a single pass without switching tabs.',
          highlight: '99% Cloud Coverage'
        },
        {
          icon: 'Zap',
          title: '0.08s Lightning Response',
          description: 'Optimized inverted indices and concurrent query channels deliver search results almost instantly.',
          highlight: 'Sub-second Indexing'
        },
        {
          icon: 'ShieldCheck',
          title: 'Smart Health Verification',
          description: 'Automatic real-time link validation discards expired or removed links, serving only live resources.',
          highlight: 'Live Link Auditing'
        },
        {
          icon: 'Sparkles',
          title: 'Zero Ads & Clean Direct Links',
          description: 'No marketing popups or tricky redirects. Directly open official cloud saving pages for 4K content.',
          highlight: '4K HDR & Original Bitrate'
        }
      ],
      specs: [
        { value: '0.08s', label: 'Average Latency', subtext: 'Global real-time dispatch' },
        { value: '10M+', label: 'Indexed Resources', subtext: 'Movies, software, guides' },
        { value: '99.8%', label: 'Link Survival Rate', subtext: 'Automated health filtering' },
        { value: '4K HDR', label: 'Video Quality', subtext: 'Lossless direct downloads' }
      ],
      interactiveDemoType: 'search',
      demoDetails: {
        title: 'Experience Lightning Search',
        subtitle: 'Type a keyword to preview live multi-cloud aggregation',
        sampleData: [
          { name: 'Oppenheimer 2023 [4K HDR BluRay Dolby Vision]', source: 'Quark Cloud', size: '24.8 GB', time: '10m ago' },
          { name: 'Dune: Part Two [IMAX Enhanced 60FPS Multi-Sub]', source: 'AliCloud', size: '18.2 GB', time: '1h ago' },
          { name: 'Interstellar [1080P/4K Remastered Edition]', source: 'Baidu Pan', size: '14.5 GB', time: '3h ago' }
        ]
      },
      finalCtaTitle: 'Explore Boundless Resources Today',
      finalCtaSubtitle: 'Leave tedious searching behind and step into lightning-fast discovery.'
    },
    ja: {
      id: 'pansou',
      tag: 'HOT TOOL · 高速検索',
      tagColor: 'from-amber-500 to-orange-500',
      title: 'クラウド映画・資源検索',
      heroHeadline: 'あらゆるクラウド資源を、指先ひとつで。',
      heroSubheadline: 'プラットフォームの壁を打ち破り、4K映画、音楽、学習リソースをミリ秒単位で集約検索。',
      accentColor: '#f59e0b',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1618005182384-a83a8bd57fbe&w=1200&q=75&output=webp',
      targetUrl: 'https://so.252035.xyz',
      fallbackUrls: ['https://pansou.app/', 'http://gongcheng.yyboxdns.com:12309'],
      isExternal: true,
      requiresPansouCheck: true,
      ctaText: '今すぐ検索エンジンへ',
      visionStatement: '1回の検索で、インターネットの海を光速横断。',
      visionDetails: '広告やリンク切れを排除し、最高画質のコンテンツをストレスフリーでお届けします。',
      features: [
        { icon: 'Search', title: 'マルチクラウド統合', description: '複数の主要クラウドを横断検索。', highlight: '広範なカバー率' },
        { icon: 'Zap', title: '0.08秒の超高速応答', description: '待たされることのない快適な検索体験。', highlight: 'ミリ秒単位の処理' },
        { icon: 'ShieldCheck', title: 'リンク生存チェック', description: '無効なリンクを自動排除。', highlight: '高精度フィルタ' },
        { icon: 'Sparkles', title: '広告ゼロ・4K直通', description: '不要な広告なしで直接保存。', highlight: '高画质サポート' }
      ],
      specs: [
        { value: '0.08s', label: '平均応答速度', subtext: 'ミリ秒クラスの超高速' },
        { value: '10M+', label: 'インデックス数', subtext: '映画・教材・ツール' },
        { value: '99.8%', label: '有効リンク率', subtext: '自動クリーンアップ' },
        { value: '4K HDR', label: '最高画質', subtext: 'オリジナル画質直通' }
      ],
      interactiveDemoType: 'search',
      demoDetails: {
        title: '超高速検索をプレビュー',
        subtitle: 'クラウド資源のリアルタイム検索結果',
        sampleData: [
          { name: 'Oppenheimer 2023 [4K HDR 映画]', source: 'Quark', size: '24.8 GB', time: '10分前' },
          { name: 'Dune: Part Two [IMAX 60FPS]', source: 'AliCloud', size: '18.2 GB', time: '1時間前' }
        ]
      },
      finalCtaTitle: '今すぐクラウド検索を体験',
      finalCtaSubtitle: '膨大な映画や資料を快適に検索しましょう。'
    },
    ko: {
      id: 'pansou',
      tag: 'HOT TOOL · 초고속 검색',
      tagColor: 'from-amber-500 to-orange-500',
      title: '클라우드 리소스 통합 검색',
      heroHeadline: '모든 클라우드 리소스를 한번에.',
      heroSubheadline: '정보의 고립을 깨고 4K 영화, 고음질 음악, 학습 자료를 번개처럼 빠르게 검색하세요.',
      accentColor: '#f59e0b',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1618005182384-a83a8bd57fbe&w=1200&q=75&output=webp',
      targetUrl: 'https://so.252035.xyz',
      fallbackUrls: ['https://pansou.app/', 'http://gongcheng.yyboxdns.com:12309'],
      isExternal: true,
      requiresPansouCheck: true,
      ctaText: '지금 바로 검색하기',
      visionStatement: '단 한 번의 검색으로 방대한 데이터의 바다를 가로지릅니다.',
      visionDetails: '유효하지 않은 링크를 자동으로 필터링하고 깔끔한 다이렉트 링크를 제공합니다.',
      features: [
        { icon: 'Search', title: '멀티 클라우드 통합', description: '주요 클라우드 플랫폼을 한 번에 검색.', highlight: '폭넓은 커버리지' },
        { icon: 'Zap', title: '0.08초 초고속 응답', description: '기다림 없는 쾌적한 검색 속도.', highlight: '밀리초 단위 처리' },
        { icon: 'ShieldCheck', title: '실시간 유효성 검사', description: '만료된 링크를 자동 제거.', highlight: '정확한 링크' },
        { icon: 'Sparkles', title: '광고 없는 직관적 링크', description: '4K 고화질 자료를 즉시 저장.', highlight: '4K HDR 지원' }
      ],
      specs: [
        { value: '0.08s', label: '평균 응답 속도', subtext: '초고속 인덱싱' },
        { value: '10M+', label: '수록 리소스', subtext: '영화, 문서, 소프트웨어' },
        { value: '99.8%', label: '유효 링크 비율', subtext: '상시 상태 모니터링' },
        { value: '4K HDR', label: '화질 보장', subtext: '원본 품질 제공' }
      ],
      interactiveDemoType: 'search',
      demoDetails: {
        title: '실시간 검색 미리보기',
        subtitle: '클라우드 리소스 통합 매칭 결과',
        sampleData: [
          { name: 'Oppenheimer 2023 [4K HDR 블루레이]', source: 'Quark', size: '24.8 GB', time: '10분 전' }
        ]
      },
      finalCtaTitle: '끝없는 리소스를 지금 만나보세요',
      finalCtaSubtitle: '스마트한 클라우드 탐색의 새로운 기준을 경험하세요.'
    },
    es: {
      id: 'pansou',
      tag: 'HOT TOOL · BÚSQUEDA RÁPIDA',
      tagColor: 'from-amber-500 to-orange-500',
      title: 'Búsqueda de Recursos Cloud',
      heroHeadline: 'Todos los recursos en la nube. Al instante.',
      heroSubheadline: 'Rompe barreras de plataformas. Búsqueda instantánea de películas en 4K, audio sin pérdida y material educativo.',
      accentColor: '#f59e0b',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1618005182384-a83a8bd57fbe&w=1200&q=75&output=webp',
      targetUrl: 'https://so.252035.xyz',
      fallbackUrls: ['https://pansou.app/', 'http://gongcheng.yyboxdns.com:12309'],
      isExternal: true,
      requiresPansouCheck: true,
      ctaText: 'Visitar Buscador',
      visionStatement: 'Cada búsqueda es un viaje instantáneo por la red de datos.',
      visionDetails: 'Filtra enlaces rotos y ofrece enlaces directos sin publicidad intrusiva.',
      features: [
        { icon: 'Search', title: 'Agregación Multinube', description: 'Busca en múltiples plataformas a la vez.', highlight: 'Cobertura total' },
        { icon: 'Zap', title: '0.08s de Respuesta', description: 'Resultados ultrarrápidos.', highlight: 'Velocidad pura' },
        { icon: 'ShieldCheck', title: 'Enlaces Verificados', description: 'Eliminación automática de enlaces caídos.', highlight: 'Alta precisión' },
        { icon: 'Sparkles', title: 'Sin Publicidad', description: 'Descargas directas en 4K.', highlight: 'Máxima calidad' }
      ],
      specs: [
        { value: '0.08s', label: 'Latencia Media', subtext: 'Indexación en tiempo real' },
        { value: '10M+', label: 'Recursos Indexados', subtext: 'Películas y archivos' },
        { value: '99.8%', label: 'Tasa de Enlaces Vivos', subtext: 'Monitoreo activo' },
        { value: '4K HDR', label: 'Calidad Máxima', subtext: 'Archivos originales' }
      ],
      interactiveDemoType: 'search',
      demoDetails: {
        title: 'Demostración Interactiva',
        subtitle: 'Resultados en tiempo real',
        sampleData: [{ name: 'Oppenheimer 2023 [4K HDR]', source: 'Cloud', size: '24.8 GB', time: 'Hace 10 min' }]
      },
      finalCtaTitle: 'Comienza a Explorar Ahora',
      finalCtaSubtitle: 'Tu portal directo a la información.'
    },
    fr: {
      id: 'pansou',
      tag: 'HOT TOOL · RECHERCHE RAPIDE',
      tagColor: 'from-amber-500 to-orange-500',
      title: 'Recherche Ressources Cloud',
      heroHeadline: 'Toutes vos ressources cloud en un instant.',
      heroSubheadline: 'Accédez instantanément à des films 4K, de la musique haute fidélité et des contenus éducatifs.',
      accentColor: '#f59e0b',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1618005182384-a83a8bd57fbe&w=1200&q=75&output=webp',
      targetUrl: 'https://so.252035.xyz',
      fallbackUrls: ['https://pansou.app/', 'http://gongcheng.yyboxdns.com:12309'],
      isExternal: true,
      requiresPansouCheck: true,
      ctaText: 'Visiter le Moteur',
      visionStatement: 'Une recherche ultra-rapide pour des ressources fiables.',
      visionDetails: 'Filtre automatique des liens morts et accès direct sans publicité.',
      features: [
        { icon: 'Search', title: 'Agrégation Multi-Plateformes', description: 'Recherche sur plusieurs services cloud.', highlight: 'Exhaustif' },
        { icon: 'Zap', title: '0.08s Réponse Éclair', description: 'Navigation ultra-fluide.', highlight: 'Haute performance' },
        { icon: 'ShieldCheck', title: 'Validation des Liens', description: 'Contrôle continu de la disponibilité.', highlight: 'Fiabilité' },
        { icon: 'Sparkles', title: 'Sans Publicité', description: 'Accès direct en 4K.', highlight: 'Qualité native' }
      ],
      specs: [
        { value: '0.08s', label: 'Temps de réponse', subtext: 'Indexation continue' },
        { value: '10M+', label: 'Ressources', subtext: 'Films et contenus' },
        { value: '99.8%', label: 'Liens actifs', subtext: 'Vérification live' },
        { value: '4K HDR', label: 'Qualité vidéo', subtext: 'Haute définition' }
      ],
      interactiveDemoType: 'search',
      demoDetails: {
        title: 'Aperçu de la recherche',
        subtitle: 'Résultats instantanés',
        sampleData: [{ name: 'Oppenheimer 2023 [4K HDR]', source: 'Cloud', size: '24.8 GB', time: 'Il y a 10 min' }]
      },
      finalCtaTitle: 'Explorez dès maintenant',
      finalCtaSubtitle: 'Le moteur de recherche cloud de nouvelle génération.'
    },
    de: {
      id: 'pansou',
      tag: 'HOT TOOL · SCHNELLE SUCHE',
      tagColor: 'from-amber-500 to-orange-500',
      title: 'Cloud-Ressourcen Suche',
      heroHeadline: 'Alle Cloud-Ressourcen. Ein Klick entfernt.',
      heroSubheadline: 'Durchsuchen Sie führende Cloud-Speicher blitzschnell nach 4K-Filmen, verlustfreiem Audio und Lernressourcen.',
      accentColor: '#f59e0b',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1618005182384-a83a8bd57fbe&w=1200&q=75&output=webp',
      targetUrl: 'https://so.252035.xyz',
      fallbackUrls: ['https://pansou.app/', 'http://gongcheng.yyboxdns.com:12309'],
      isExternal: true,
      requiresPansouCheck: true,
      ctaText: 'Suchmaschine öffnen',
      visionStatement: 'Jede Suche liefert sekundenschnell verifizierte Ergebnisse.',
      visionDetails: 'Keine toten Links, keine aufdringliche Werbung – nur direkte Ergebnisse.',
      features: [
        { icon: 'Search', title: 'Multi-Cloud Index', description: 'Gleichzeitige Abfrage mehrerer Plattformen.', highlight: 'Komplett' },
        { icon: 'Zap', title: '0.08s Latenz', description: 'Echtzeit-Ergebnisse.', highlight: 'Superschnell' },
        { icon: 'ShieldCheck', title: 'Link-Prüfung', description: 'Filtert tote Links automatisch.', highlight: 'Zuverlässig' },
        { icon: 'Sparkles', title: 'Werbefrei & 4K', description: 'Direkte Übertragung in Originalqualität.', highlight: 'Kristallklar' }
      ],
      specs: [
        { value: '0.08s', label: 'Antwortzeit', subtext: 'Blitzschnell' },
        { value: '10M+', label: 'Ressourcen', subtext: 'Große Auswahl' },
        { value: '99.8%', label: 'Gültigkeitsrate', subtext: 'Ständige Prüfung' },
        { value: '4K HDR', label: 'Qualität', subtext: 'Originalauflösung' }
      ],
      interactiveDemoType: 'search',
      demoDetails: {
        title: 'Live-Vorschau',
        subtitle: 'Echtzeit-Suchergebnisse',
        sampleData: [{ name: 'Oppenheimer 2023 [4K HDR]', source: 'Cloud', size: '24.8 GB', time: 'vor 10 Min' }]
      },
      finalCtaTitle: 'Jetzt entdecken',
      finalCtaSubtitle: 'Die moderne Art, Cloud-Ressourcen zu finden.'
    },
    el: {
      id: 'pansou',
      tag: 'HOT TOOL · ΓΡΗΓΟΡΗ ΑΝΑΖΗΤΗΣΗ',
      tagColor: 'from-amber-500 to-orange-500',
      title: 'Αναζήτηση Πόρων Cloud',
      heroHeadline: 'Όλοι οι πόροι cloud. Άμεσα και απλά.',
      heroSubheadline: 'Αναζητήστε ταινίες 4K, αρχεία ήχου υψηλής πιστότητας και εκπαιδευτικό υλικό σε πραγματικό χρόνο.',
      accentColor: '#f59e0b',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1618005182384-a83a8bd57fbe&w=1200&q=75&output=webp',
      targetUrl: 'https://so.252035.xyz',
      fallbackUrls: ['https://pansou.app/', 'http://gongcheng.yyboxdns.com:12309'],
      isExternal: true,
      requiresPansouCheck: true,
      ctaText: 'Επίσκεψη Αναζήτησης',
      visionStatement: 'Κάθε αναζήτηση σας φέρνει άμεσα στο κατάλληλο περιεχόμενο.',
      visionDetails: 'Αυτόματος έλεγχος συνδέσμων και καθαρή διεπαφή χωρίς διαφημίσεις.',
      features: [
        { icon: 'Search', title: 'Συγκέντρωση Πλατφορμών', description: 'Ταυτόχρονη αναζήτηση σε πολλαπλά cloud.', highlight: 'Πλήρης κάλυψη' },
        { icon: 'Zap', title: '0.08s Ταχύτητα', description: 'Αστραπιαία απόκριση.', highlight: 'Υψηλή ταχύτητα' },
        { icon: 'ShieldCheck', title: 'Έλεγχος Συνδέσμων', description: 'Αφαίρεση ανενεργών συνδέσμων.', highlight: 'Αξιοπιστία' },
        { icon: 'Sparkles', title: 'Χωρίς Διαφημίσεις', description: 'Απευθείας λήψη σε 4K.', highlight: 'Κορυφαία ποιότητα' }
      ],
      specs: [
        { value: '0.08s', label: 'Χρόνος απόκρισης', subtext: 'Άμεση αναζήτηση' },
        { value: '10M+', label: 'Πόροι', subtext: 'Ταινίες και αρχεία' },
        { value: '99.8%', label: 'Ενεργοί σύνδεσμοι', subtext: 'Συνεχής έλεγχος' },
        { value: '4K HDR', label: 'Ποιότητα', subtext: 'Αρχική ανάλυση' }
      ],
      interactiveDemoType: 'search',
      demoDetails: {
        title: 'Προεπισκόπηση Αναζήτησης',
        subtitle: 'Αποτελέσματα σε πραγματικό χρόνο',
        sampleData: [{ name: 'Oppenheimer 2023 [4K HDR]', source: 'Cloud', size: '24.8 GB', time: 'Πριν 10λ' }]
      },
      finalCtaTitle: 'Ξεκινήστε την Αναζήτηση',
      finalCtaSubtitle: 'Η σύγχρονη μηχανή αναζήτησης cloud.'
    }
  },

  'reading-pro': {
    zh: {
      id: 'reading-pro',
      tag: 'PREMIUM · 深度视野',
      tagColor: 'from-emerald-500 to-teal-500',
      title: '外刊精读 Pro',
      heroHeadline: '站在全球思想潮头，阅读顶尖洞见。',
      heroSubheadline: '深度解析《经济学人》、《纽约客》、《连线》等世界级旗舰刊物。内置专业级 PDF 渲染引擎与智能研读助手，打破语言壁垒。',
      accentColor: '#10b981',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1550592704-6c76defa9985&w=1200&q=75&output=webp',
      targetUrl: '/reading-pro',
      isExternal: false,
      ctaText: '立即开启沉浸式精读',
      visionStatement: '语言不应成为认知的围墙，而是通向世界顶峰的阶梯。',
      visionDetails: '全球顶尖期刊记录着前沿商业变革、地缘政治博弈与科技演进。外刊精读 Pro 为深度学习者构建了一座纯粹、高清、具备双语思维辅助的专业文献阅览殿堂。',
      features: [
        {
          icon: 'BookOpen',
          title: '世界级旗舰期刊库',
          description: '持续收录 The Economist, The New Yorker, Nature, Financial Times 等刊物原版 PDF。',
          highlight: '每周同步全球最新期刊'
        },
        {
          icon: 'Layers',
          title: '原生 Canvas 高清渲染',
          description: '搭载专为高阶杂志排版优化的阅读内核，支持矢量缩放、平滑翻页与零锯齿文本呈现。',
          highlight: '60 FPS 丝滑翻页体验'
        },
        {
          icon: 'Languages',
          title: '双语语境与高阶词汇沉淀',
          description: '针对原著长难句和行话俚语提供专业语境注解，助力英语母语级思维的建立。',
          highlight: '长难句结构深度剖析'
        },
        {
          icon: 'Sliders',
          title: '专业阅览器与夜间护眼模式',
          description: '支持单双页切换、全屏沉浸、目录大纲快速跳转与液态玻璃护眼调色。',
          highlight: '全功能阅览控制台'
        }
      ],
      specs: [
        { value: '100+', label: '精选期刊合辑', subtext: '涵盖商业/科技/社论' },
        { value: 'Zero', label: '排版失真度', subtext: '矢量级排版渲染' },
        { value: '100%', label: '原刊原貌还原', subtext: '原版版面与插图' },
        { value: 'Pro', label: '阅读辅助工具箱', subtext: '夜间/缩放/目录' }
      ],
      interactiveDemoType: 'reader',
      demoDetails: {
        title: '专业刊物双语研读交互',
        subtitle: '预览原版杂志排版与词汇提炼体验',
        sampleData: [
          { title: 'The Economist - The World Ahead', date: '2026 Special Edition', topic: 'Global Tech & Geopolitics' },
          { title: 'The New Yorker - Culture & Arts', date: 'Latest Issue', topic: 'Modern Literary Review' },
          { title: 'Bloomberg Businessweek', date: 'Weekly Analysis', topic: 'Macroeconomic Strategies' }
        ]
      },
      finalCtaTitle: '拓展全球视野，从今天开始',
      finalCtaSubtitle: '进入外刊精读 Pro，与世界最具前瞻性的头脑同频共振。'
    },
    en: {
      id: 'reading-pro',
      tag: 'PREMIUM · GLOBAL INSIGHT',
      tagColor: 'from-emerald-500 to-teal-500',
      title: 'Foreign Journal Reading Pro',
      heroHeadline: 'Read at the Leading Edge of Global Thought.',
      heroSubheadline: 'In-depth analysis of The Economist, The New Yorker, Nature, and Bloomberg. Built with a high-performance PDF engine to break language barriers.',
      accentColor: '#10b981',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1550592704-6c76defa9985&w=1200&q=75&output=webp',
      targetUrl: '/reading-pro',
      isExternal: false,
      ctaText: 'Start Immersive Reading Now',
      visionStatement: 'Language should not be a barrier, but a ladder to global perspectives.',
      visionDetails: 'World-class journals document technological breakthroughs and geopolitical shifts. Journal Reading Pro offers an immaculate, crisp reading sanctuary for serious scholars and thinkers.',
      features: [
        {
          icon: 'BookOpen',
          title: 'Flagship Publication Library',
          description: 'Regularly updated with official PDF releases from The Economist, Nature, Financial Times, and more.',
          highlight: 'Weekly Global Sync'
        },
        {
          icon: 'Layers',
          title: 'Canvas-Powered PDF Engine',
          description: 'Optimized typography rendering with vector zooming, smooth scrolling, and zero text blur.',
          highlight: '60 FPS Smooth Page Turns'
        },
        {
          icon: 'Languages',
          title: 'Bilingual Context & Vocabulary',
          description: 'Contextual sentence analysis and vocabulary breakdowns to foster native-level reading fluency.',
          highlight: 'Advanced Syntax Deconstruction'
        },
        {
          icon: 'Sliders',
          title: 'Pro Reader Controls & Dark Mode',
          description: 'Single/double page spread, fullscreen mode, outline navigation, and eye-friendly liquid dark themes.',
          highlight: 'Comprehensive Console'
        }
      ],
      specs: [
        { value: '100+', label: 'Journal Volumes', subtext: 'Business, tech, editorials' },
        { value: 'Zero', label: 'Typography Distortion', subtext: 'Vector level precision' },
        { value: '100%', label: 'Authentic Layout', subtext: 'Original artwork & style' },
        { value: 'Pro', label: 'Reading Toolbox', subtext: 'Night mode, zoom, TOC' }
      ],
      interactiveDemoType: 'reader',
      demoDetails: {
        title: 'Bilingual Study Reader Interface',
        subtitle: 'Experience authentic layouts and vocabulary extraction',
        sampleData: [
          { title: 'The Economist - The World Ahead', date: '2026 Special Edition', topic: 'Global Tech & Geopolitics' },
          { title: 'The New Yorker - Culture & Arts', date: 'Latest Issue', topic: 'Modern Literary Review' },
          { title: 'Bloomberg Businessweek', date: 'Weekly Analysis', topic: 'Macroeconomic Strategies' }
        ]
      },
      finalCtaTitle: 'Expand Your Global Perspective',
      finalCtaSubtitle: 'Step into Journal Reading Pro and connect with visionary ideas from around the world.'
    },
    ja: {
      id: 'reading-pro',
      tag: 'PREMIUM · グローバル視点',
      tagColor: 'from-emerald-500 to-teal-500',
      title: '海外一流誌 精読 Pro',
      heroHeadline: '世界の知性の最前線を読む。',
      heroSubheadline: 'The Economist、The New Yorker、Nature などの一流出版物を深く解説。高機能PDFリーダー内蔵。',
      accentColor: '#10b981',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1550592704-6c76defa9985&w=1200&q=75&output=webp',
      targetUrl: '/reading-pro',
      isExternal: false,
      ctaText: '今すぐ読書を開始',
      visionStatement: '言葉の壁を越え、世界の最高峰の知見に触れる。',
      visionDetails: 'グローバルなビジネスや先端テクノロジーの潮流を、美しいインターフェースで快適に学習できます。',
      features: [
        { icon: 'BookOpen', title: '世界最高峰の雑誌群', description: 'The Economist や Nature を定期配信。', highlight: '毎週最新号更新' },
        { icon: 'Layers', title: '高精度PDFエンジン', description: '文字がくっきり見えるベクターレンダリング。', highlight: 'なめらかな操作性' },
        { icon: 'Languages', title: '高度な語彙・文脈解説', description: '難しい構文もわかりやすく分析。', highlight: '学習効率アップ' },
        { icon: 'Sliders', title: 'プロ仕様リーダー', description: 'ダークモードや目次ナビゲーション完備。', highlight: '快適な閲覧環境' }
      ],
      specs: [
        { value: '100+', label: '収録雑誌数', subtext: '経済・科学・文化' },
        { value: 'Zero', label: '歪みのない表示', subtext: '完全ベクター描画' },
        { value: '100%', label: '原本忠実再現', subtext: 'オリジナルレイアウト' },
        { value: 'Pro', label: '多機能ツール', subtext: 'ナイトモード・拡大' }
      ],
      interactiveDemoType: 'reader',
      demoDetails: {
        title: '読書環境のプレビュー',
        subtitle: '原書レイアウトと語彙分析の体験',
        sampleData: [{ title: 'The Economist 2026 Special', date: '2026 Issue', topic: 'Global Trends' }]
      },
      finalCtaTitle: 'グローバルな視野を広げよう',
      finalCtaSubtitle: '一流誌精読 Pro で、世界最先端の思考に触れてみませんか。'
    },
    ko: {
      id: 'reading-pro',
      tag: 'PREMIUM · 글로벌 인사이트',
      tagColor: 'from-emerald-500 to-teal-500',
      title: '해외 저널 정독 Pro',
      heroHeadline: '세계 지성의 최전선을 읽다.',
      heroSubheadline: 'The Economist, The New Yorker 등 명품 저널의 심층 분석. 고성능 PDF 뷰어 탑재.',
      accentColor: '#10b981',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1550592704-6c76defa9985&w=1200&q=75&output=webp',
      targetUrl: '/reading-pro',
      isExternal: false,
      ctaText: '지금 바로 정독 시작하기',
      visionStatement: '언어의 한계를 넘어 글로벌 통찰을 획득하세요.',
      visionDetails: '최고급 저널의 통찰력을 선명하고 눈이 편안한 환경에서 학습할 수 있습니다.',
      features: [
        { icon: 'BookOpen', title: '세계 최고 수준 저널', description: '매주 최신 글로벌 저널 업데이트.', highlight: '주간 업데이트' },
        { icon: 'Layers', title: '고해상도 렌더링', description: '선명한 텍스트와 부드러운 페이지 넘김.', highlight: '부드러운 화면' },
        { icon: 'Languages', title: '고급 어휘 및 구문 해석', description: '원문 맥락을 그대로 살린 설명.', highlight: '원어민 감각' },
        { icon: 'Sliders', title: '프로 리딩 컨트롤', description: '다크모드, 목차 이동, 배율 조절.', highlight: '완벽한 뷰어' }
      ],
      specs: [
        { value: '100+', label: '수록 저널 권수', subtext: '경제/기술/사설' },
        { value: 'Zero', label: '글꼴 왜곡 없음', subtext: '벡터 렌더링' },
        { value: '100%', label: '원문 완벽 재현', subtext: '오리지널 레이아웃' },
        { value: 'Pro', label: '리더 기능', subtext: '야간모드/확대' }
      ],
      interactiveDemoType: 'reader',
      demoDetails: {
        title: '정독 뷰어 인터페이스',
        subtitle: '원문 레이아웃 및 심층 어휘 미리보기',
        sampleData: [{ title: 'The Economist - The World Ahead', date: '2026 Issue', topic: 'Global Tech' }]
      },
      finalCtaTitle: '글로벌 시야를 넓혀보세요',
      finalCtaSubtitle: '해외 저널 정독 Pro와 함께 더 넓은 세상을 만나보세요.'
    },
    es: {
      id: 'reading-pro',
      tag: 'PREMIUM · VISIÓN GLOBAL',
      tagColor: 'from-emerald-500 to-teal-500',
      title: 'Lectura Profunda de Revistas Pro',
      heroHeadline: 'Lee las ideas más avanzadas del mundo.',
      heroSubheadline: 'Análisis detallado de The Economist, The New Yorker y Nature con un motor PDF de alto rendimiento.',
      accentColor: '#10b981',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1550592704-6c76defa9985&w=1200&q=75&output=webp',
      targetUrl: '/reading-pro',
      isExternal: false,
      ctaText: 'Empezar a Leer',
      visionStatement: 'El lenguaje es una puerta hacia el conocimiento global.',
      visionDetails: 'Accede a artículos clave con herramientas de estudio bilingüe y visor avanzado.',
      features: [
        { icon: 'BookOpen', title: 'Biblioteca de Élite', description: 'Actualizaciones periódicas de revistas globales.', highlight: 'Sincronización semanal' },
        { icon: 'Layers', title: 'Motor PDF Vectorial', description: 'Lectura nítida y fluida.', highlight: '60 FPS' },
        { icon: 'Languages', title: 'Análisis de Vocabulario', description: 'Desglose de sintaxis compleja.', highlight: 'Fluidez nativa' },
        { icon: 'Sliders', title: 'Controles Profesionales', description: 'Modo oscuro y navegación por índice.', highlight: 'Consola pro' }
      ],
      specs: [
        { value: '100+', label: 'Ediciones', subtext: 'Negocios y ciencia' },
        { value: 'Zero', label: 'Distorsión', subtext: 'Renderizado vectorial' },
        { value: '100%', label: 'Fidelidad', subtext: 'Diseño original' },
        { value: 'Pro', label: 'Herramientas', subtext: 'Modo lectura' }
      ],
      interactiveDemoType: 'reader',
      demoDetails: {
        title: 'Interfaz del Lector',
        subtitle: 'Diseño original y vocabulario',
        sampleData: [{ title: 'The Economist 2026', date: '2026', topic: 'Global Tech' }]
      },
      finalCtaTitle: 'Expande Tu Perspectiva',
      finalCtaSubtitle: 'Accede al conocimiento de primer nivel hoy mismo.'
    },
    fr: {
      id: 'reading-pro',
      tag: 'PREMIUM · INSIGHT GLOBAL',
      tagColor: 'from-emerald-500 to-teal-500',
      title: 'Lecture Approfondie Pro',
      heroHeadline: 'Au cœur des grandes idées mondiales.',
      heroSubheadline: 'Analyses de The Economist, Nature et Bloomberg avec un moteur PDF fluide et haute fidélité.',
      accentColor: '#10b981',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1550592704-6c76defa9985&w=1200&q=75&output=webp',
      targetUrl: '/reading-pro',
      isExternal: false,
      ctaText: 'Commencer la lecture',
      visionStatement: 'Repousser les frontières linguistiques pour accéder au savoir mondial.',
      visionDetails: 'Un espace de lecture épuré et précis pour comprendre les enjeux contemporains.',
      features: [
        { icon: 'BookOpen', title: 'Revues Prestigieuses', description: 'Accès régulier aux grands titres mondiaux.', highlight: 'Hebdomadaire' },
        { icon: 'Layers', title: 'Moteur PDF Vectoriel', description: 'Rendu impeccable des polices.', highlight: 'Fluidité totale' },
        { icon: 'Languages', title: 'Vocabulaire & Contexte', description: 'Compréhension poussée des structures.', highlight: 'Pédagogie pro' },
        { icon: 'Sliders', title: 'Console de Lecture', description: 'Mode nuit et table des matières.', highlight: 'Confort visuel' }
      ],
      specs: [
        { value: '100+', label: 'Volumes', subtext: 'Économie et science' },
        { value: 'Zero', label: 'Distorsion', subtext: 'Précision vectorielle' },
        { value: '100%', label: 'Fidélité', subtext: 'Mise en page originale' },
        { value: 'Pro', label: 'Outils', subtext: 'Mode nuit et zoom' }
      ],
      interactiveDemoType: 'reader',
      demoDetails: {
        title: 'Aperçu du Lecteur',
        subtitle: 'Mise en page et fiches de vocabulaire',
        sampleData: [{ title: 'The Economist 2026', date: '2026', topic: 'Global Tech' }]
      },
      finalCtaTitle: 'Élargissez vos horizons',
      finalCtaSubtitle: 'Rejoignez la communauté de lecture Foreign Journal Pro.'
    },
    de: {
      id: 'reading-pro',
      tag: 'PREMIUM · GLOBALE PERSPEKTIVE',
      tagColor: 'from-emerald-500 to-teal-500',
      title: 'Zeitschriften-Lektüre Pro',
      heroHeadline: 'Die wichtigsten Ideen der Welt verstehen.',
      heroSubheadline: 'Tiefenanalysen von The Economist, The New Yorker und Nature mit High-End PDF-Reader.',
      accentColor: '#10b981',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1550592704-6c76defa9985&w=1200&q=75&output=webp',
      targetUrl: '/reading-pro',
      isExternal: false,
      ctaText: 'Jetzt lesen',
      visionStatement: 'Sprache als Brücke zu weltweitem Spitzenwissen.',
      visionDetails: 'Exzellente Typografie und Lesewerkzeuge für tiefgehende Analysen.',
      features: [
        { icon: 'BookOpen', title: 'Internationale Magazine', description: 'Regelmäßige Ausgaben weltweit renommierter Verlage.', highlight: 'Wöchentlich' },
        { icon: 'Layers', title: 'Vektor-PDF-Engine', description: 'Kristallklares Schriftbild ohne Verzerrung.', highlight: '60 FPS' },
        { icon: 'Languages', title: 'Wortschatz-Analyse', description: 'Kontextuelle Erklärungen anspruchsvoller Texte.', highlight: 'Tiefenverständnis' },
        { icon: 'Sliders', title: 'Profi-Werkzeuge', description: 'Nachtmodus und Inhaltsverzeichnis.', highlight: 'Volle Kontrolle' }
      ],
      specs: [
        { value: '100+', label: 'Ausgaben', subtext: 'Wirtschaft und Wissenschaft' },
        { value: 'Zero', label: 'Verzerrung', subtext: 'Vektorbasiert' },
        { value: '100%', label: 'Originalgetreu', subtext: 'Authentisches Layout' },
        { value: 'Pro', label: 'Werkzeuge', subtext: 'Nachtmodus & Zoom' }
      ],
      interactiveDemoType: 'reader',
      demoDetails: {
        title: 'Reader-Vorschau',
        subtitle: 'Authentische Typografie und Vokabelübersicht',
        sampleData: [{ title: 'The Economist 2026', date: '2026', topic: 'Global Tech' }]
      },
      finalCtaTitle: 'Erweitern Sie Ihr Wissen',
      finalCtaSubtitle: 'Tauchen Sie ein in erstklassigen Journalismus.'
    },
    el: {
      id: 'reading-pro',
      tag: 'PREMIUM · ΠΑΓΚΟΣΜΙΑ ΠΡΟΟΠΤΙΚΗ',
      tagColor: 'from-emerald-500 to-teal-500',
      title: 'Μελέτη Διεθνών Περιοδικών Pro',
      heroHeadline: 'Διαβάστε στην πρώτη γραμμή της παγκόσμιας σκέψης.',
      heroSubheadline: 'Ανάλυση κορυφαίων εκδόσεων όπως The Economist και Nature με προηγμένο αναγνώστη PDF.',
      accentColor: '#10b981',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1550592704-6c76defa9985&w=1200&q=75&output=webp',
      targetUrl: '/reading-pro',
      isExternal: false,
      ctaText: 'Έναρξη Ανάγνωσης',
      visionStatement: 'Η γλώσσα γίνεται γέφυρα για την παγκόσμια γνώση.',
      visionDetails: 'Άνετη και καθαρή ανάγνωση με εργαλεία ανάλυσης λεξιλογίου.',
      features: [
        { icon: 'BookOpen', title: 'Κορυφαίες Εκδόσεις', description: 'Συνεχής ενημέρωση με διεθνή περιοδικά.', highlight: 'Εβδομαδιαία' },
        { icon: 'Layers', title: 'Διανυσματική Μηχανή PDF', description: 'Απόλυτη ευκρίνεια κειμένου.', highlight: 'Ομαλή κύλιση' },
        { icon: 'Languages', title: 'Ανάλυση Λεξιλογίου', description: 'Επεξήγηση σύνθετων φράσεων.', highlight: 'Εις βάθος' },
        { icon: 'Sliders', title: 'Εργαλεία Ανάγνωσης', description: 'Νυχτερινή λειτουργία και σελιδοδείκτες.', highlight: 'Πλήρης έλεγχος' }
      ],
      specs: [
        { value: '100+', label: 'Τεύχη', subtext: 'Οικονομία & επιστήμη' },
        { value: 'Zero', label: 'Παραμόρφωση', subtext: 'Διανυσματική ακρίβεια' },
        { value: '100%', label: 'Πιστότητα', subtext: 'Αυθεντική διάταξη' },
        { value: 'Pro', label: 'Εργαλεία', subtext: 'Νύχτα και ζουμ' }
      ],
      interactiveDemoType: 'reader',
      demoDetails: {
        title: 'Προεπισκόπηση Αναγνώστη',
        subtitle: 'Αυθεντική διάταξη και λεξιλόγιο',
        sampleData: [{ title: 'The Economist 2026', date: '2026', topic: 'Global Tech' }]
      },
      finalCtaTitle: 'Διευρύνετε τους Ορίζοντές σας',
      finalCtaSubtitle: 'Αποκτήστε πρόσβαση σε κορυφαία παγκόσμια άρθρα.'
    }
  },

  'ai-agent': {
    zh: {
      id: 'ai-agent',
      tag: 'AI PRO · 量化智能',
      tagColor: 'from-blue-600 to-indigo-600',
      title: 'AI 投资智能体',
      heroHeadline: '数据驱动，重塑财富决策的未来。',
      heroSubheadline: '融合宏观经济大模型与高频金融量化算法。全天候洞察美股、A股、加密市场与大宗商品趋势，为智慧投资保驾护航。',
      accentColor: '#3b82f6',
      gradient: 'from-blue-600/20 via-indigo-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611974789855-9c2a0a7236a3&w=1200&q=75&output=webp',
      targetUrl: 'https://cash.gongpan.org',
      isExternal: true,
      ctaText: '进入智能投资控制台',
      visionStatement: '在纷繁复杂的金融噪音中，提炼出确定性的投资逻辑。',
      visionDetails: '传统投资分析面临海量研报信息过载与情绪偏误。AI 投资智能体借助深度神经网络与因子回测矩阵，将机构级投资分析能力赋予每一位决策者。',
      features: [
        {
          icon: 'Cpu',
          title: '多维大模型金融大脑',
          description: '实时消化全球财经快讯、央行政策、企业财报与社交情绪，自动生成深度投资逻辑研报。',
          highlight: '全模态金融理解'
        },
        {
          icon: 'TrendingUp',
          title: '智能量化策略与回测',
          description: '内置经典均线、动量、网格与多因子量化模型，支持自定义参数并在历史长周期中快速验证收益。',
          highlight: '机构级策略回测引擎'
        },
        {
          icon: 'Shield',
          title: '动态风控与头寸管理',
          description: '根据市场波动率实时计算最大回撤风险，提供科学的仓位分配与止盈止损智能警报。',
          highlight: '动态风险价值 (VaR) 建模'
        },
        {
          icon: 'Activity',
          title: '7x24 异动雷达监测',
          description: '大宗交易、期权异动、聪明资金流向（Smart Money）秒级捕获，先人一步发掘市场 alpha。',
          highlight: '毫秒级资金流向追踪'
        }
      ],
      specs: [
        { value: '24/7', label: '全天候智能盯盘', subtext: '全球金融市场无缝轮动' },
        { value: '100+', label: '量化因子与模型', subtext: '多维度技术与基本面' },
        { value: '0.05s', label: '异动事件推断', subtext: '毫秒级风险预警' },
        { value: 'Alpha', label: '超额收益驱动', subtext: '消除情绪偏差' }
      ],
      interactiveDemoType: 'ai',
      demoDetails: {
        title: 'AI 投资研报与因子透视',
        subtitle: '实时模拟金融智能体对标的资产的综合打分与决策',
        sampleData: {
          asset: 'NVDA · 英伟达 (NVIDIA Corp)',
          aiRating: 'Strong Buy (强力买入 9.4/10)',
          factors: [
            { name: '财务健康度', score: 96, desc: '毛利率 75%+, 数据中心算力需求持续井喷' },
            { name: '动量与资金流', score: 92, desc: '机构净流入持续 14 天，突破上升通道' },
            { name: '估值安全边际', score: 85, desc: 'PEG 比率合理，远期现金流折现支撑强劲' }
          ],
          summary: '综合宏观降息预期与 AI 算力基建长期景气度，智能体建议采用分批逢低买入策略，建议仓位 18%-22%。'
        }
      },
      finalCtaTitle: '掌握机构级智能投资利器',
      finalCtaSubtitle: '立即访问 AI 投资智能体，开启你的智能化财富增长之旅。'
    },
    en: {
      id: 'ai-agent',
      tag: 'AI PRO · QUANT INTELLIGENCE',
      tagColor: 'from-blue-600 to-indigo-600',
      title: 'AI Investment Agent',
      heroHeadline: 'Data-Driven. Reshaping the Future of Wealth.',
      heroSubheadline: 'Powered by macroeconomic LLMs and high-frequency quant algorithms. 24/7 monitoring of US stocks, global equities, crypto, and commodities.',
      accentColor: '#3b82f6',
      gradient: 'from-blue-600/20 via-indigo-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611974789855-9c2a0a7236a3&w=1200&q=75&output=webp',
      targetUrl: 'https://cash.gongpan.org',
      isExternal: true,
      ctaText: 'Open Investment Console',
      visionStatement: 'Extracting clear alpha from chaotic market noise.',
      visionDetails: 'Traditional trading suffers from emotional bias and information overload. Our AI Investment Agent brings institutional-grade intelligence and quantitative backtesting to every decision.',
      features: [
        {
          icon: 'Cpu',
          title: 'Financial LLM Core',
          description: 'Processes earnings releases, policy changes, and social sentiment in real time to synthesize structured briefs.',
          highlight: 'Full-Modal Financial AI'
        },
        {
          icon: 'TrendingUp',
          title: 'Quant Strategies & Backtesting',
          description: 'Pre-built multi-factor, momentum, and mean-reversion algorithms with fast historical validation.',
          highlight: 'Institutional Backtester'
        },
        {
          icon: 'Shield',
          title: 'Dynamic Risk Management',
          description: 'Calculates maximum drawdown risks based on live volatility and recommends balanced position sizing.',
          highlight: 'Real-time VaR Modeling'
        },
        {
          icon: 'Activity',
          title: '24/7 Anomaly Radar',
          description: 'Detects unusual options flow, block orders, and smart money movement in sub-second intervals.',
          highlight: 'Smart Money Tracking'
        }
      ],
      specs: [
        { value: '24/7', label: 'Continuous Tracking', subtext: 'Global markets coverage' },
        { value: '100+', label: 'Quantitative Factors', subtext: 'Technical & fundamental' },
        { value: '0.05s', label: 'Inference Latency', subtext: 'Sub-second alerts' },
        { value: 'Alpha', label: 'Discipline Driven', subtext: 'Eliminates emotional bias' }
      ],
      interactiveDemoType: 'ai',
      demoDetails: {
        title: 'Live AI Research & Factor Insights',
        subtitle: 'Simulated intelligent asset valuation & strategy synthesis',
        sampleData: {
          asset: 'NVDA · NVIDIA Corporation',
          aiRating: 'Strong Buy (Rating 9.4/10)',
          factors: [
            { name: 'Financial Health', score: 96, desc: '75%+ gross margin, surging datacenter demand' },
            { name: 'Momentum & Flow', score: 92, desc: 'Net institutional inflow for 14 consecutive days' },
            { name: 'Valuation Margin', score: 85, desc: 'PEG ratio highly attractive given DCF projections' }
          ],
          summary: 'Considering macro rate cycle and structural AI compute buildout, the agent suggests scale-in positioning with target allocation of 18%-22%.'
        }
      },
      finalCtaTitle: 'Empower Your Portfolio with AI',
      finalCtaSubtitle: 'Access the AI Investment Agent now and upgrade your financial decision making.'
    },
    ja: {
      id: 'ai-agent',
      tag: 'AI PRO · クオンツ知能',
      tagColor: 'from-blue-600 to-indigo-600',
      title: 'AI 投資インテリジェンス',
      heroHeadline: 'データ駆動で描く、資産運用の未来。',
      heroSubheadline: '金融特化型AIと高度な定量分析。米国株、暗号資産、コモディティの市場動向を24時間リアルタイムで監視。',
      accentColor: '#3b82f6',
      gradient: 'from-blue-600/20 via-indigo-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611974789855-9c2a0a7236a3&w=1200&q=75&output=webp',
      targetUrl: 'https://cash.gongpan.org',
      isExternal: true,
      ctaText: '投資コンソールを開く',
      visionStatement: '市場のノイズの中から、確かなアルファを抽出する。',
      visionDetails: '感情に左右されない合理的なデータ分析とリスク管理をすべての投資家へ提供します。',
      features: [
        { icon: 'Cpu', title: '金融特化型AIコア', description: '決算書やニュースを即座に分析。', highlight: '高精度分析' },
        { icon: 'TrendingUp', title: 'クオンツ戦略＆バックテスト', description: '過去データを用いた収益性検証。', highlight: '実証済みモデル' },
        { icon: 'Shield', title: '動的リスク管理', description: 'ボラティリティに応じた適正ロットの提案。', highlight: '徹底した保全' },
        { icon: 'Activity', title: '24時間 異常検知レーダー', description: '大口取引や資金の動きを即座に検知。', highlight: 'スマートマネー追跡' }
      ],
      specs: [
        { value: '24/7', label: '常時監視', subtext: '世界市場をリアルタイム監視' },
        { value: '100+', label: 'クオンツ指標', subtext: 'テクニカル＆ファンダメンタル' },
        { value: '0.05s', label: '推論速度', subtext: 'ミリ秒単位のシグナル' },
        { value: 'Alpha', label: '合理的な投資', subtext: '感情の排除' }
      ],
      interactiveDemoType: 'ai',
      demoDetails: {
        title: 'AI投資レポートのデモ',
        subtitle: '銘柄スコアリングと分析サマリー',
        sampleData: {
          asset: 'NVDA · NVIDIA Corp',
          aiRating: 'Strong Buy (9.4/10)',
          factors: [{ name: '財務健全性', score: 96, desc: '高利益率と力強い需要' }],
          summary: 'AIインフラ需要と安定したキャッシュフローに基づき、積極的な分散投資を推奨。'
        }
      },
      finalCtaTitle: 'AIによる次世代の投資体験',
      finalCtaSubtitle: 'AI投資インテリジェンスで、より賢明な資産運用を始めましょう。'
    },
    ko: {
      id: 'ai-agent',
      tag: 'AI PRO · 퀀트 인텔리전스',
      tagColor: 'from-blue-600 to-indigo-600',
      title: 'AI 투자 에이전트',
      heroHeadline: '데이터 기반, 자산 결정의 미래를 바꾸다.',
      heroSubheadline: '거시경제 대형 모델과 금융 퀀트 알고리즘의 결합. 미국 주식, 글로벌 자산 및 크립토 시장의 24/7 모니터링.',
      accentColor: '#3b82f6',
      gradient: 'from-blue-600/20 via-indigo-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611974789855-9c2a0a7236a3&w=1200&q=75&output=webp',
      targetUrl: 'https://cash.gongpan.org',
      isExternal: true,
      ctaText: '투자 콘솔 바로가기',
      visionStatement: '시장의 소음 속에서 명확한 알파를 추출합니다.',
      visionDetails: '감정적 편향을 제거하고 기관급 정량 분석 및 백테스팅을 직관적으로 제공합니다.',
      features: [
        { icon: 'Cpu', title: '금융 특화 AI 브레인', description: '실시간 뉴스 및 공시 분석 리포트 생성.', highlight: '전방위 분석' },
        { icon: 'TrendingUp', title: '퀀트 전략 및 백테스트', description: '다양한 팩터 모델의 즉각적 검증.', highlight: '기관급 백테스터' },
        { icon: 'Shield', title: '동적 리스크 관리', description: '변동성에 따른 최적 포지션 제안.', highlight: '실시간 VaR' },
        { icon: 'Activity', title: '24/7 이상 거래 레이더', description: '기관 자금 흐름 실시간 포착.', highlight: '스마트머니 추적' }
      ],
      specs: [
        { value: '24/7', label: '상시 모니터링', subtext: '글로벌 마켓 커버리지' },
        { value: '100+', label: '퀀트 팩터', subtext: '기술적/기본적 분석' },
        { value: '0.05s', label: '신호 반응', subtext: '초고속 경보' },
        { value: 'Alpha', label: '데이터 기반', subtext: '감정 배제' }
      ],
      interactiveDemoType: 'ai',
      demoDetails: {
        title: 'AI 투자 리서치 미리보기',
        subtitle: '자산 종합 점수 및 전략 요약',
        sampleData: {
          asset: 'NVDA · NVIDIA Corp',
          aiRating: 'Strong Buy (9.4/10)',
          factors: [{ name: '재무 건전성', score: 96, desc: '높은 마진율과 폭발적 수요' }],
          summary: '거시적 환경과 견고한 실적을 바탕으로 분할 매수 전략 추천.'
        }
      },
      finalCtaTitle: 'AI 기반 스마트 투자 시작하기',
      finalCtaSubtitle: '지금 AI 투자 에이전트와 함께 자산 성장의 기회를 잡으세요.'
    },
    es: {
      id: 'ai-agent',
      tag: 'AI PRO · INTELIGENCIA CUÁNTICA',
      tagColor: 'from-blue-600 to-indigo-600',
      title: 'Agente de Inversión IA',
      heroHeadline: 'El futuro de las finanzas impulsado por datos.',
      heroSubheadline: 'Modelos macroeconómicos y algoritmos cuantitativos para acciones globales, cripto y materias primas.',
      accentColor: '#3b82f6',
      gradient: 'from-blue-600/20 via-indigo-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611974789855-9c2a0a7236a3&w=1200&q=75&output=webp',
      targetUrl: 'https://cash.gongpan.org',
      isExternal: true,
      ctaText: 'Abrir Consola',
      visionStatement: 'Extrayendo señales claras en medio de la volatilidad.',
      visionDetails: 'Análisis financiero sin sesgos emocionales con backtesting profesional.',
      features: [
        { icon: 'Cpu', title: 'Cerebro Financiero IA', description: 'Procesamiento en tiempo real de balances y noticias.', highlight: 'Análisis integral' },
        { icon: 'TrendingUp', title: 'Estrategias Cuantitativas', description: 'Validación histórica instantánea.', highlight: 'Modelos probados' },
        { icon: 'Shield', title: 'Gestión de Riesgo', description: 'Cálculo de volatilidad y tamaño de posición.', highlight: 'Control total' },
        { icon: 'Activity', title: 'Radar 24/7', description: 'Detección de movimientos de dinero inteligente.', highlight: 'Seguimiento en vivo' }
      ],
      specs: [
        { value: '24/7', label: 'Monitoreo', subtext: 'Cobertura global' },
        { value: '100+', label: 'Factores Cuánticos', subtext: 'Técnico y fundamental' },
        { value: '0.05s', label: 'Latencia', subtext: 'Alertas rápidas' },
        { value: 'Alpha', label: 'Racionalidad', subtext: 'Cero sesgo' }
      ],
      interactiveDemoType: 'ai',
      demoDetails: {
        title: 'Informe de Inversión IA',
        subtitle: 'Calificación de activos en tiempo real',
        sampleData: {
          asset: 'NVDA · NVIDIA Corp',
          aiRating: 'Strong Buy (9.4/10)',
          factors: [{ name: 'Salud Financiera', score: 96, desc: 'Márgenes sólidos' }],
          summary: 'Perspectivas alcistas impulsadas por demanda estructural de cómputo.'
        }
      },
      finalCtaTitle: 'Eleva Tus Inversiones con IA',
      finalCtaSubtitle: 'Toma el control de tus decisiones financieras hoy.'
    },
    fr: {
      id: 'ai-agent',
      tag: 'AI PRO · INTELLIGENCE QUANTITATIVE',
      tagColor: 'from-blue-600 to-indigo-600',
      title: "Agent d'Investissement IA",
      heroHeadline: "L'avenir des décisions financières par les données.",
      heroSubheadline: 'Intelligence artificielle financière et modèles quantitatifs pour actions, crypto et matières premières.',
      accentColor: '#3b82f6',
      gradient: 'from-blue-600/20 via-indigo-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611974789855-9c2a0a7236a3&w=1200&q=75&output=webp',
      targetUrl: 'https://cash.gongpan.org',
      isExternal: true,
      ctaText: "Accéder à la Console",
      visionStatement: 'Transformer le bruit du marché en opportunités claires.',
      visionDetails: 'Des analyses rigoureuses sans biais émotionnels pour optimiser vos portefeuilles.',
      features: [
        { icon: 'Cpu', title: 'Cœur Financier IA', description: 'Synthèse de données et rapports instantanés.', highlight: 'IA multimodale' },
        { icon: 'TrendingUp', title: 'Modèles Quantitatifs', description: 'Backtesting sur de longues périodes.', highlight: 'Précision institutionnelle' },
        { icon: 'Shield', title: 'Gestion Dynamique du Risque', description: 'Dimensionnement des positions et stop-loss.', highlight: 'Modélisation VaR' },
        { icon: 'Activity', title: 'Radar de Flux 24/7', description: 'Détection des flux de capitaux majeurs.', highlight: 'Smart Money' }
      ],
      specs: [
        { value: '24/7', label: 'Surveillance', subtext: 'Marchés mondiaux' },
        { value: '100+', label: 'Facteurs Quant', subtext: 'Analyses poussées' },
        { value: '0.05s', label: 'Temps de signal', subtext: 'Alertes instantanées' },
        { value: 'Alpha', label: 'Performance', subtext: 'Décisions rationnelles' }
      ],
      interactiveDemoType: 'ai',
      demoDetails: {
        title: 'Rapport IA en Direct',
        subtitle: 'Score de valorisation et recommandations',
        sampleData: {
          asset: 'NVDA · NVIDIA Corp',
          aiRating: 'Strong Buy (9.4/10)',
          factors: [{ name: 'Santé Financière', score: 96, desc: 'Croissance exceptionnelle' }],
          summary: 'Recommandation positive soutenue par la demande en infrastructures IA.'
        }
      },
      finalCtaTitle: "Passez à l'investissement intelligent",
      finalCtaSubtitle: "Prenez des décisions éclairées avec l'Agent d'Investissement IA."
    },
    de: {
      id: 'ai-agent',
      tag: 'AI PRO · QUANT-INTELLIGENZ',
      tagColor: 'from-blue-600 to-indigo-600',
      title: 'KI-Investment-Agent',
      heroHeadline: 'Datengetrieben. Die Zukunft der Vermögensentscheidung.',
      heroSubheadline: 'Makroökonomische LLMs und quantitative Handelsmodelle für Aktien, Krypto und Rohstoffe.',
      accentColor: '#3b82f6',
      gradient: 'from-blue-600/20 via-indigo-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611974789855-9c2a0a7236a3&w=1200&q=75&output=webp',
      targetUrl: 'https://cash.gongpan.org',
      isExternal: true,
      ctaText: 'Konsole öffnen',
      visionStatement: 'Klare Alpha-Signale im Marktrauschen erkennen.',
      visionDetails: 'Institutionelle quantitative Analysen ohne emotionale Fehleinschätzungen.',
      features: [
        { icon: 'Cpu', title: 'Finanz-KI-Gehirn', description: 'Echtzeit-Verarbeitung von Finanznachrichten und Bilanzen.', highlight: 'Umfassend' },
        { icon: 'TrendingUp', title: 'Quant-Strategien & Backtests', description: 'Historische Validierung robuster Modelle.', highlight: 'Geprüfte Modelle' },
        { icon: 'Shield', title: 'Dynamisches Risikomanagement', description: 'Volatilitätsbasierte Positionsgrößen.', highlight: 'Echtzeit-VaR' },
        { icon: 'Activity', title: '24/7 Radar für Marktanomalien', description: 'Erkennt Smart-Money-Bewegungen sofort.', highlight: 'Kapitalfluss-Tracking' }
      ],
      specs: [
        { value: '24/7', label: 'Beobachtung', subtext: 'Weltweite Märkte' },
        { value: '100+', label: 'Quant-Faktoren', subtext: 'Technisch & fundamental' },
        { value: '0.05s', label: 'Signalzeit', subtext: 'Blitzschnell' },
        { value: 'Alpha', label: 'Rationell', subtext: 'Emotionslos' }
      ],
      interactiveDemoType: 'ai',
      demoDetails: {
        title: 'KI-Research-Vorschau',
        subtitle: 'Echtzeit-Scoring und Empfehlungen',
        sampleData: {
          asset: 'NVDA · NVIDIA Corp',
          aiRating: 'Strong Buy (9.4/10)',
          factors: [{ name: 'Finanzielle Gesundheit', score: 96, desc: 'Starke Cashflows' }],
          summary: 'Positive Aussichten gestützt durch hohe Nachfrage nach KI-Infrastruktur.'
        }
      },
      finalCtaTitle: 'Investieren mit KI-Unterstützung',
      finalCtaSubtitle: 'Nutzen Sie professionelle Analysen für Ihr Portfolio.'
    },
    el: {
      id: 'ai-agent',
      tag: 'AI PRO · ΠΟΣΟΤΙΚΗ ΝΟΗΜΟΣΥΝΗ',
      tagColor: 'from-blue-600 to-indigo-600',
      title: 'Agent Επενδύσεων AI',
      heroHeadline: 'Βασισμένο σε δεδομένα. Το μέλλον των επενδύσεων.',
      heroSubheadline: 'Μακροοικονομικά μοντέλα AI και ποσοτικοί αλγόριθμοι για μετοχές, crypto και εμπορεύματα.',
      accentColor: '#3b82f6',
      gradient: 'from-blue-600/20 via-indigo-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611974789855-9c2a0a7236a3&w=1200&q=75&output=webp',
      targetUrl: 'https://cash.gongpan.org',
      isExternal: true,
      ctaText: 'Άνοιγμα Κονσόλας',
      visionStatement: 'Καθαρά επενδυτικά σήματα μέσα στον θόρυβο της αγοράς.',
      visionDetails: 'Θεσμικού επιπέδου αναλύσεις χωρίς συναισθηματικές προκαταλήψεις.',
      features: [
        { icon: 'Cpu', title: 'Οικονομικός Εγκέφαλος AI', description: 'Επεξεργασία οικονομικών ειδήσεων σε πραγματικό χρόνο.', highlight: 'Πλήρης ανάλυση' },
        { icon: 'TrendingUp', title: 'Ποσοτικές Στρατηγικές', description: 'Άμεσος έλεγχος με ιστορικά δεδομένα.', highlight: 'Αξιόπιστα μοντέλα' },
        { icon: 'Shield', title: 'Διαχείριση Κινδύνου', description: 'Υπολογισμός μεγέθους θέσης με βάση τη μεταβλητότητα.', highlight: 'Προστασία κεφαλαίου' },
        { icon: 'Activity', title: '24/7 Ραντάρ Κινήσεων', description: 'Εντοπισμός ροής κεφαλαίων Smart Money.', highlight: 'Συνεχής παρακολούθηση' }
      ],
      specs: [
        { value: '24/7', label: 'Παρακολούθηση', subtext: 'Παγκόσμιες αγορές' },
        { value: '100+', label: 'Ποσοτικοί Παράγοντες', subtext: 'Τεχνικοί και θεμελιώδεις' },
        { value: '0.05s', label: 'Απόκριση', subtext: 'Άμεσες ειδοποιήσεις' },
        { value: 'Alpha', label: 'Ορθολογισμός', subtext: 'Χωρίς συναίσθημα' }
      ],
      interactiveDemoType: 'ai',
      demoDetails: {
        title: 'Προεπισκόπηση Έρευνας AI',
        subtitle: 'Βαθμολόγηση περιουσιακών στοιχείων',
        sampleData: {
          asset: 'NVDA · NVIDIA Corp',
          aiRating: 'Strong Buy (9.4/10)',
          factors: [{ name: 'Οικονομική Υγεία', score: 96, desc: 'Υψηλά περιθώρια κέρδους' }],
          summary: 'Θετικές προοπτικές λόγω της συνεχιζόμενης ζήτησης υποδομών AI.'
        }
      },
      finalCtaTitle: 'Επενδύστε Έξυπνα με AI',
      finalCtaSubtitle: 'Ξεκινήστε τώρα τη χρήση του Agent Επενδύσεων AI.'
    }
  },

  chat: {
    zh: {
      id: 'chat',
      tag: '内测中 · 仅限邀请注册',
      tagColor: 'from-sky-500 to-blue-600',
      title: '即时通讯 · GongPan Chat',
      heroHeadline: '中国人自己的 Telegram。纯粹、私密、高速。',
      heroSubheadline: '端到端军事级加密传输，全平台无缝同步。本功能仍处于测试状态，仅受邀请用户可以注册账号。',
      accentColor: '#0ea5e9',
      gradient: 'from-sky-500/20 via-blue-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611746872915-64382b5c76da&w=1200&q=75&output=webp',
      targetUrl: 'http://gongcheng.yyboxdns.com:21312/',
      isExternal: true,
      ctaText: '立即开启私密畅聊',
      visionStatement: '真正的隐私权，是每个人在数字时代不可剥夺的底线。',
      visionDetails: '当主流聊天应用充满广告、审核与数据追踪时，GongPan Chat 选择了一条完全不同的道路：去中心化架构、端到端强加密通道与毫秒级轻量传输，守护每一句真心话。',
      features: [
        {
          icon: 'Lock',
          title: '端到端军事级强加密',
          description: '基于成熟密码学协议，消息仅在发信端与接收端本地解密，服务器零知情存留。',
          highlight: '零日志与零知情证明'
        },
        {
          icon: 'Zap',
          title: '毫秒级分布式消息中继',
          description: '自研轻量级通信通道，高并发场景下依然保持闪电般的收发速度与超低电量消耗。',
          highlight: '极致流畅收发体验'
        },
        {
          icon: 'MessageSquare',
          title: '无限制万人超大社群',
          description: '支持万人大型群组、精细化管理员权限、防灌水机制与话题分类讨论。',
          highlight: '无上限群组成员架构'
        },
        {
          icon: 'FileText',
          title: '大文件与无损原图极速直传',
          description: '支持单文件高达数 GB 的极速无损传输，不压缩画质，不限制文件类型。',
          highlight: '原画原片无损秒传'
        }
      ],
      specs: [
        { value: 'E2EE', label: '端到端加密协议', subtext: '客户端本地双钥解密' },
        { value: '0.02s', label: '消息端到端投递', subtext: '分布式低延迟集群' },
        { value: '10,000+', label: '单群成员容量', subtext: '高并发群聊架构' },
        { value: '100%', label: '隐私主权归属', subtext: '无广告/无审查/无追踪' }
      ],
      interactiveDemoType: 'chat',
      demoDetails: {
        title: '端到端加密聊天交互体验',
        subtitle: '预览极简纯粹的无痕会话界面',
        sampleData: [
          { sender: 'other', name: 'Developer', text: '全新端到端加密协议已上线，所有会话密钥本地动态协商。🔒', time: '10:42' },
          { sender: 'me', name: 'Me', text: '体验太丝滑了！发送大文件完全不压画质，极速秒达。⚡️', time: '10:43' },
          { sender: 'other', name: 'Developer', text: '支持万人群组与全平台实时同步，欢迎邀请好友体验！🚀', time: '10:44' }
        ]
      },
      finalCtaTitle: '重拾属于你的纯粹沟通',
      finalCtaSubtitle: '立即进入 GongPan Chat，开启属于你的安全私密通讯新纪元。'
    },
    en: {
      id: 'chat',
      tag: 'BETA · INVITE ONLY',
      tagColor: 'from-sky-500 to-blue-600',
      title: 'Instant Messaging · GongPan Chat',
      heroHeadline: 'Your Own Telegram. Pure. Private. Fast.',
      heroSubheadline: 'Military-grade end-to-end encryption with seamless multi-platform sync. This feature is currently in testing; only invited users can register an account.',
      accentColor: '#0ea5e9',
      gradient: 'from-sky-500/20 via-blue-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611746872915-64382b5c76da&w=1200&q=75&output=webp',
      targetUrl: 'http://gongcheng.yyboxdns.com:21312/',
      isExternal: true,
      ctaText: 'Start Private Messaging',
      visionStatement: 'True digital privacy is a fundamental human right.',
      visionDetails: 'While mainstream messaging apps monetize personal data, GongPan Chat delivers end-to-end cryptographic protection and lightweight millisecond message delivery.',
      features: [
        {
          icon: 'Lock',
          title: 'End-to-End Encryption',
          description: 'State-of-the-art cryptographic protocols ensure messages are only decrypted on sender and recipient devices.',
          highlight: 'Zero-Knowledge Proofs'
        },
        {
          icon: 'Zap',
          title: 'Sub-second Distributed Relay',
          description: 'Custom lightweight transport protocols deliver rapid message routing with minimal battery consumption.',
          highlight: 'Lightning-Fast Delivery'
        },
        {
          icon: 'MessageSquare',
          title: 'Unlimited Mega Groups',
          description: 'Host communities with tens of thousands of members with granular role permissions and anti-spam filters.',
          highlight: 'Scalable Community Engine'
        },
        {
          icon: 'FileText',
          title: 'Massive Lossless File Transfers',
          description: 'Send multi-gigabyte files and original uncompressed photos and videos without artificial throttling.',
          highlight: 'Uncompressed Direct Transfer'
        }
      ],
      specs: [
        { value: 'E2EE', label: 'End-to-End Protocol', subtext: 'Client-side key derivation' },
        { value: '0.02s', label: 'Message Delivery', subtext: 'Distributed relay network' },
        { value: '10,000+', label: 'Group Capacity', subtext: 'High-concurrency chat' },
        { value: '100%', label: 'Data Sovereignty', subtext: 'No ads / Zero tracking' }
      ],
      interactiveDemoType: 'chat',
      demoDetails: {
        title: 'Encrypted Chat Simulation',
        subtitle: 'Experience the clean, focused messaging interface',
        sampleData: [
          { sender: 'other', name: 'Developer', text: 'New E2EE protocol deployed. Keys are strictly stored in local secure enclaves. 🔒', time: '10:42' },
          { sender: 'me', name: 'Me', text: 'Super smooth! Lossless file sharing without compression is amazing. ⚡️', time: '10:43' },
          { sender: 'other', name: 'Developer', text: 'Supports unlimited group scaling and instant cross-platform sync. Enjoy! 🚀', time: '10:44' }
        ]
      },
      finalCtaTitle: 'Reclaim Your Private Conversations',
      finalCtaSubtitle: 'Step into GongPan Chat now for high-speed, uncompromising private messaging.'
    },
    ja: {
      id: 'chat',
      tag: 'BETA · 招待制テスト運用中',
      tagColor: 'from-sky-500 to-blue-600',
      title: 'インスタントメッセージ · GongPan Chat',
      heroHeadline: '純粋、安全、そして高速。',
      heroSubheadline: '軍用レベルのエンドツーエンド暗号化とシームレスなマルチデバイス同期。本機能は現在テスト段階であり、招待されたユーザーのみ登録可能です。',
      accentColor: '#0ea5e9',
      gradient: 'from-sky-500/20 via-blue-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611746872915-64382b5c76da&w=1200&q=75&output=webp',
      targetUrl: 'http://gongcheng.yyboxdns.com:21312/',
      isExternal: true,
      ctaText: '今すぐチャットを開始',
      visionStatement: '真のプライバシーは、すべての人にとって不可欠な権利です。',
      visionDetails: '不要な広告や監視から解放された、真に自由で安全なコミュニケーション空間を提供します。',
      features: [
        { icon: 'Lock', title: '完全暗号化通信', description: '端末間でのみ復号される安全なメッセージング。', highlight: '強固なプライバシー' },
        { icon: 'Zap', title: 'ミリ秒単位の高速送信', description: 'バッテリー消費を抑えた軽量設計。', highlight: '快適な操作性' },
        { icon: 'MessageSquare', title: '大規模コミュニティ', description: '1万人以上のグループを快適に管理。', highlight: '柔軟な権限設定' },
        { icon: 'FileText', title: '大容量ファイル無劣化転送', description: '画像や動画を圧縮せずそのまま送信。', highlight: 'オリジナル画質' }
      ],
      specs: [
        { value: 'E2EE', label: '暗号化規格', subtext: 'エンドツーエンド保護' },
        { value: '0.02s', label: '配信速度', subtext: '超低遅延' },
        { value: '10,000+', label: 'グループ定員', subtext: '大規模対応' },
        { value: '100%', label: 'データ主権', subtext: '広告ゼロ・追跡なし' }
      ],
      interactiveDemoType: 'chat',
      demoDetails: {
        title: '暗号化チャットの体験',
        subtitle: 'シンプルで洗練されたUIプレビュー',
        sampleData: [
          { sender: 'other', name: 'Dev', text: '新しい暗号化プロトコルが稼働しました。🔒', time: '10:42' },
          { sender: 'me', name: 'Me', text: '非常に高速で快適です！⚡️', time: '10:43' }
        ]
      },
      finalCtaTitle: '安全なコミュニケーションを取り戻そう',
      finalCtaSubtitle: 'GongPan Chat で、新しいプライベートな対話を体験してください。'
    },
    ko: {
      id: 'chat',
      tag: 'BETA · 초대 전용 테스트',
      tagColor: 'from-sky-500 to-blue-600',
      title: '인스턴트 메신저 · GongPan Chat',
      heroHeadline: '순수하고 안전하며 빠른 메신저.',
      heroSubheadline: '군사 등급 종단간 암호화와 멀티 플랫폼 동기화. 본 기능은 현재 테스트 단계이며, 초대받은 사용자만 계정을 등록할 수 있습니다.',
      accentColor: '#0ea5e9',
      gradient: 'from-sky-500/20 via-blue-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611746872915-64382b5c76da&w=1200&q=75&output=webp',
      targetUrl: 'http://gongcheng.yyboxdns.com:21312/',
      isExternal: true,
      ctaText: '지금 바로 대화 시작하기',
      visionStatement: '진정한 개인정보 보호는 디지털 시대의 기본 권리입니다.',
      visionDetails: '불필요한 광고와 데이터 수집을 배제하고 대화의 본질적인 안전과 자유를 지킵니다.',
      features: [
        { icon: 'Lock', title: '종단간 군사 등급 암호화', description: '발신자와 수신자만 해독 가능한 완벽 보안.', highlight: '제로 로그' },
        { icon: 'Zap', title: '초고속 분산 중계', description: '대용량 동시 접속에서도 번개 같은 전송.', highlight: '초저지연' },
        { icon: 'MessageSquare', title: '만인 대규모 그룹', description: '강력한 관리자 권한과 스팸 방지.', highlight: '대용량 커뮤니티' },
        { icon: 'FileText', title: '무손실 대용량 파일 전송', description: '화질 압축 없이 원본 그대로 초고속 전송.', highlight: '무손실 원본' }
      ],
      specs: [
        { value: 'E2EE', label: '종단간 암호화', subtext: '클라이언트 로컬 암호화' },
        { value: '0.02s', label: '메시지 도달', subtext: '초고속 네트워크' },
        { value: '10,000+', label: '그룹 인원수', subtext: '대규모 커뮤니티' },
        { value: '100%', label: '데이터 보호', subtext: '광고/추적 제로' }
      ],
      interactiveDemoType: 'chat',
      demoDetails: {
        title: '암호화 채팅 시뮬레이션',
        subtitle: '깔끔하고 직관적인 메신저 인터페이스',
        sampleData: [
          { sender: 'other', name: '개발자', text: '새로운 보안 프로토콜이 적용되었습니다. 🔒', time: '10:42' },
          { sender: 'me', name: '나', text: '정말 빠르고 화질 저하가 없네요! ⚡️', time: '10:43' }
        ]
      },
      finalCtaTitle: '진정한 비밀 대화를 시작하세요',
      finalCtaSubtitle: 'GongPan Chat과 함께 안전한 대화의 새로운 장을 경험하세요.'
    },
    es: {
      id: 'chat',
      tag: 'BETA · SOLO INVITACIÓN',
      tagColor: 'from-sky-500 to-blue-600',
      title: 'Mensajería · GongPan Chat',
      heroHeadline: 'Puro. Privado. Ultrarrápido.',
      heroSubheadline: 'Cifrado de extremo a extremo y sincronización multiplataforma. Esta función está en fase de prueba; solo los usuarios invitados pueden registrarse.',
      accentColor: '#0ea5e9',
      gradient: 'from-sky-500/20 via-blue-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611746872915-64382b5c76da&w=1200&q=75&output=webp',
      targetUrl: 'http://gongcheng.yyboxdns.com:21312/',
      isExternal: true,
      ctaText: 'Iniciar Chat Privado',
      visionStatement: 'La privacidad digital es un derecho inquebrantable.',
      visionDetails: 'Mensajería ligera y segura sin recopilación de datos personales.',
      features: [
        { icon: 'Lock', title: 'Cifrado Extremo a Extremo', description: 'Protección absoluta de tus mensajes.', highlight: 'Cero registros' },
        { icon: 'Zap', title: 'Envío Instantáneo', description: 'Transmisión en milisegundos con bajo consumo.', highlight: 'Alta velocidad' },
        { icon: 'MessageSquare', title: 'Supergrupos', description: 'Soporte para miles de participantes.', highlight: 'Comunidad' },
        { icon: 'FileText', title: 'Archivos sin Pérdida', description: 'Envía archivos gigantes en calidad original.', highlight: 'Sin compresión' }
      ],
      specs: [
        { value: 'E2EE', label: 'Protocolo de cifrado', subtext: 'Seguridad máxima' },
        { value: '0.02s', label: 'Velocidad', subtext: 'Tiempo real' },
        { value: '10,000+', label: 'Capacidad de grupo', subtext: 'Grandes canales' },
        { value: '100%', label: 'Privacidad', subtext: 'Sin rastreo' }
      ],
      interactiveDemoType: 'chat',
      demoDetails: {
        title: 'Demostración de Chat',
        subtitle: 'Interfaz fluida y privada',
        sampleData: [{ sender: 'other', name: 'Dev', text: 'Protocolo seguro activado. 🔒', time: '10:42' }]
      },
      finalCtaTitle: 'Comunícate con Total Libertad',
      finalCtaSubtitle: 'Entra a GongPan Chat y recupera tu privacidad.'
    },
    fr: {
      id: 'chat',
      tag: 'BETA · SUR INVITATION UNIQUEMENT',
      tagColor: 'from-sky-500 to-blue-600',
      title: 'Messagerie Instantanée · GongPan Chat',
      heroHeadline: 'Pur. Privé. Instantané.',
      heroSubheadline: 'Chiffrement de bout en bout et synchronisation multiplateforme. Cette fonctionnalité est en phase de test ; seuls les utilisateurs invités peuvent créer un compte.',
      accentColor: '#0ea5e9',
      gradient: 'from-sky-500/20 via-blue-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611746872915-64382b5c76da&w=1200&q=75&output=webp',
      targetUrl: 'http://gongcheng.yyboxdns.com:21312/',
      isExternal: true,
      ctaText: 'Démarrer une conversation',
      visionStatement: 'La confidentialité numérique est un droit fondamental.',
      visionDetails: 'Une messagerie ultra-rapide sans publicité ni traçage de données.',
      features: [
        { icon: 'Lock', title: 'Chiffrement de Bout en Bout', description: 'Vos messages restent strictly confidentiels.', highlight: 'Zéro trace' },
        { icon: 'Zap', title: 'Transmission Éclair', description: 'Routage ultra-rapide et économe en batterie.', highlight: 'Ultra fluide' },
        { icon: 'MessageSquare', title: 'Super-Groupes', description: 'Gérez des communautés massives.', highlight: 'Évolutif' },
        { icon: 'FileText', title: 'Fichiers sans Compression', description: 'Envoi direct en qualité originale.', highlight: 'Haute résolution' }
      ],
      specs: [
        { value: 'E2EE', label: 'Protocole', subtext: 'Sécurité absolue' },
        { value: '0.02s', label: 'Vitesse de livraison', subtext: 'Réseau distribué' },
        { value: '10,000+', label: 'Membres / groupe', subtext: 'Haute capacité' },
        { value: '100%', label: 'Souveraineté', subtext: 'Sans pistage' }
      ],
      interactiveDemoType: 'chat',
      demoDetails: {
        title: 'Aperçu du Chat',
        subtitle: 'Interface fluide et sécurisée',
        sampleData: [{ sender: 'other', name: 'Dev', text: 'Chiffrement activé. 🔒', time: '10:42' }]
      },
      finalCtaTitle: 'Reprenez le contrôle de vos échanges',
      finalCtaSubtitle: 'Rejoignez GongPan Chat pour une expérience sécurisée.'
    },
    de: {
      id: 'chat',
      tag: 'BETA · NUR AUF EINLADUNG',
      tagColor: 'from-sky-500 to-blue-600',
      title: 'Instant Messaging · GongPan Chat',
      heroHeadline: 'Rein. Privat. Rasend schnell.',
      heroSubheadline: 'Militärische Ende-zu-Ende-Verschlüsselung und nahtlose Synchronisation. Diese Funktion befindet sich in der Testphase; nur eingeladene Benutzer können sich registrieren.',
      accentColor: '#0ea5e9',
      gradient: 'from-sky-500/20 via-blue-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611746872915-64382b5c76da&w=1200&q=75&output=webp',
      targetUrl: 'http://gongcheng.yyboxdns.com:21312/',
      isExternal: true,
      ctaText: 'Privaten Chat starten',
      visionStatement: 'Digitale Privatsphäre ist ein unverhandelbares Grundrecht.',
      visionDetails: 'Schützen Sie Ihre Kommunikation vor neugierigen Blicken mit moderner Kryptografie.',
      features: [
        { icon: 'Lock', title: 'Ende-zu-Ende-Verschlüsselung', description: 'Nur Sender und Empfänger können Nachrichten lesen.', highlight: 'Zero-Knowledge' },
        { icon: 'Zap', title: 'Blitzschnelle Zustellung', description: 'Optimiert für minimale Latenzzeiten.', highlight: 'Echtzeit' },
        { icon: 'MessageSquare', title: 'Riesige Gruppen', description: 'Platz für zehntausende Mitglieder.', highlight: 'Skalierbar' },
        { icon: 'FileText', title: 'Verlustfreier Dateiversand', description: 'Bilder und Videos in voller Originalqualität.', highlight: 'Unkomprimiert' }
      ],
      specs: [
        { value: 'E2EE', label: 'Verschlüsselung', subtext: 'Maximaler Schutz' },
        { value: '0.02s', label: 'Übertragung', subtext: 'Sofortige Zustellung' },
        { value: '10,000+', label: 'Gruppenmitglieder', subtext: 'Skalierbar' },
        { value: '100%', label: 'Datensouveränität', subtext: 'Kein Tracking' }
      ],
      interactiveDemoType: 'chat',
      demoDetails: {
        title: 'Chat-Simulation',
        subtitle: 'Kompakte und sichere Oberfläche',
        sampleData: [{ sender: 'other', name: 'Dev', text: 'E2EE Protokoll aktiv. 🔒', time: '10:42' }]
      },
      finalCtaTitle: 'Echte Privatsphäre genießen',
      finalCtaSubtitle: 'Starten Sie jetzt mit GongPan Chat.'
    },
    el: {
      id: 'chat',
      tag: 'BETA · ΜΟΝΟ ΜΕ ΠΡΟΣΚΛΗΣΗ',
      tagColor: 'from-sky-500 to-blue-600',
      title: 'Άμεσα Μηνύματα · GongPan Chat',
      heroHeadline: 'Καθαρό. Ιδιωτικό. Αστραπιαίο.',
      heroSubheadline: 'Κρυπτογράφηση από άκρο σε άκρο στρατιωτικού επιπέδου και συγχρονισμός σε όλες τις συσκευές. Αυτή η λειτουργία είναι σε δοκιμαστική φάση. Μόνο προσκεκλημένοι χρήστες μπορούν να εγγραφούν.',
      accentColor: '#0ea5e9',
      gradient: 'from-sky-500/20 via-blue-600/10 to-transparent',
      heroImage: 'https://wsrv.nl/?url=images.unsplash.com/photo-1611746872915-64382b5c76da&w=1200&q=75&output=webp',
      targetUrl: 'http://gongcheng.yyboxdns.com:21312/',
      isExternal: true,
      ctaText: 'Έναρξη Συνομιλίας',
      visionStatement: 'Η ιδιωτικότητα είναι θεμελιώδες δικαίωμα στην ψηφιακή εποχή.',
      visionDetails: 'Ασφαλείς συνομιλίες χωρίς διαφημίσεις και συλλογή προσωπικών δεδομένων.',
      features: [
        { icon: 'Lock', title: 'Κρυπτογράφηση Άκρο σε Άκρο', description: 'Τα μηνύματά σας παραμένουν απολύτως ασφαλή.', highlight: 'Μηδενικά αρχεία' },
        { icon: 'Zap', title: 'Άμεση Αποστολή', description: 'Εξαιρετικά γρήγορη παράδοση μηνυμάτων.', highlight: 'Ομαλή χρήση' },
        { icon: 'MessageSquare', title: 'Μεγάλες Ομάδες', description: 'Υποστήριξη χιλιάδων μελών σε κάθε κανάλι.', highlight: 'Κοινότητα' },
        { icon: 'FileText', title: 'Αποστολή Αρχείων Χωρίς Απώλεια', description: 'Αποστολή φωτογραφιών σε πλήρη ανάλυση.', highlight: 'Αρχική ποιότητα' }
      ],
      specs: [
        { value: 'E2EE', label: 'Πρωτόκολλο', subtext: 'Απόλυτη ασφάλεια' },
        { value: '0.02s', label: 'Χρόνος παράδοσης', subtext: 'Άμεση απόκριση' },
        { value: '10,000+', label: 'Μέλη ομάδας', subtext: 'Μεγάλη χωρητικότητα' },
        { value: '100%', label: 'Ιδιωτικότητα', subtext: 'Χωρίς παρακολούθηση' }
      ],
      interactiveDemoType: 'chat',
      demoDetails: {
        title: 'Προεπισκόπηση Συνομιλίας',
        subtitle: 'Ασφαλής και καθαρή διεπαφή',
        sampleData: [{ sender: 'other', name: 'Dev', text: 'Κρυπτογράφηση ενεργή. 🔒', time: '10:42' }]
      },
      finalCtaTitle: 'Αποκτήστε τον Έλεγχο των Συνομιλιών σας',
      finalCtaSubtitle: 'Ξεκινήστε τώρα στο GongPan Chat.'
    }
  }
};
