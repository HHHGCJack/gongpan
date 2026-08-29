import { Language } from '../../types';

export interface DeepDiveContent {
  sectionTitle: string;
  sectionSubtitle: string;
  tag: string;
  block1Title: string;
  block1Desc: string;
  block2Title: string;
  block2Desc: string;
  block3Title: string;
  block3Desc: string;
  block4Title?: string;
  block4Desc?: string;
  extraPansou?: {
    mainTitle: string;
    mainDesc: string;
    subtext1: string;
    subtext2: string;
    subtext3: string;
    bottomHint: string;
  };
  extraAi?: {
    chartTitle: string;
    cumulativeReturn: string;
    sharpe: string;
    maxDrawdown: string;
  };
}

export const DEEP_DIVE_TRANSLATIONS: Record<string, Record<string, DeepDiveContent>> = {
  pansou: {
    zh: {
      tag: "CINEMATIC CLOUD ECOSYSTEM",
      sectionTitle: "全网网盘公共生态秒级聚合",
      sectionSubtitle: "打破网盘壁垒，无广告直连 4K HDR 原画电影与全季剧集",
      block1Title: "智能秒级去重引擎",
      block1Desc: "深度哈希特征比对，自动剔除密码套路引流与营销广告包，只呈现最纯净的真实资源。",
      block2Title: "多源分布式爬虫集群",
      block2Desc: "数百个云端节点全天候监听全网公共分享，院线热映与冷门经典一网打尽。",
      block3Title: "4K 原画直存，无需中转压缩",
      block3Desc: "智能识别正版原画资源，秒速转存至夸克、阿里、百度与 PikPak 网盘，享受满带宽极速回放与杜比全景声。",
      extraPansou: {
        mainTitle: "4K 原画直存，无需中转压缩",
        mainDesc: "智能识别正版原画资源，秒速转存至夸克、阿里、百度与 PikPak 网盘，享受满带宽极速回放与杜比全景声。",
        subtext1: "全网嗅探延迟",
        subtext2: "自动过滤死链",
        subtext3: "最高画质支持",
        bottomHint: "支持多端客户端免登录快速直存"
      }
    },
    en: {
      tag: "CINEMATIC CLOUD ECOSYSTEM",
      sectionTitle: "Instant Cloud Resource Aggregation",
      sectionSubtitle: "Break platform barriers. Direct access to 4K HDR films and full series with zero ads.",
      block1Title: "Intelligent Deduplication Engine",
      block1Desc: "Deep SHA-256 hash comparison filters out clickbait and marketing traps, leaving only pristine files.",
      block2Title: "Distributed Cloud Spider Cluster",
      block2Desc: "Hundreds of high-speed nodes monitor verified public shares 24/7 for the latest box-office hits and rare gems.",
      block3Title: "Direct 4K Transfer Without Re-compression",
      block3Desc: "Instantly transfer original bitrates to Quark, Aliyun, Baidu, or PikPak for lossless Dolby Vision playback.",
      extraPansou: {
        mainTitle: "Direct 4K Transfer Without Re-compression",
        mainDesc: "Instantly transfer original bitrates to Quark, Aliyun, Baidu, or PikPak for lossless Dolby Vision playback.",
        subtext1: "Query Latency",
        subtext2: "Dead Links Filtered",
        subtext3: "Max Quality Mode",
        bottomHint: "Cross-platform direct transfer supported without login"
      }
    },
    ja: {
      tag: "CINEMATIC CLOUD ECOSYSTEM",
      sectionTitle: "全クラウド公共リソースの即時集約",
      sectionSubtitle: "クラウドの壁を取り払い、広告なしで4K HDR高画質映画や全シーズン番組に直結。",
      block1Title: "インテリジェント重複排除エンジン",
      block1Desc: "SHA-256ハッシュ照合により、誘導リンクやスパムを自動排除し、純粋なリソースのみを表示。",
      block2Title: "分散型クローラークラスター",
      block2Desc: "数百のクラウドノードが24時間体制で最新映画や名作アーカイブを収集・検証。",
      block3Title: "再圧縮なしの4K原画ダイレクト保存",
      block3Desc: "Quark、Aliyun、Baidu、PikPakなどの主要ストレージへ高速転送し、最高画質で再生。",
      extraPansou: {
        mainTitle: "再圧縮なしの4K原画ダイレクト保存",
        mainDesc: "Quark、Aliyun、Baidu、PikPakなどの主要ストレージへ高速転送し、最高画質で再生。",
        subtext1: "検索応答時間",
        subtext2: "無効リンク自動排除",
        subtext3: "最高画質対応",
        bottomHint: "ログイン不要で各クラウドアカウントへワンクリック転送"
      }
    },
    ko: {
      tag: "CINEMATIC CLOUD ECOSYSTEM",
      sectionTitle: "전체 클라우드 리소스 실시간 통합 검색",
      sectionSubtitle: "클라우드 플랫폼의 장벽을 허물고 광고 없이 4K HDR 영화 및 전편 시리즈에 바로 연결.",
      block1Title: "지능형 중복 제거 엔진",
      block1Desc: "SHA-256 해시 대조를 통해 스팸과 유도 링크를 완벽히 필터링하고 깨끗한 원본 리소스만 제공.",
      block2Title: "분산형 크롤링 클러스터",
      block2Desc: "수백 개의 고속 노드가 실시간으로 공개 공유를 감지하여 최신 영화와 고전 명작을 수집.",
      block3Title: "압축 손실 없는 4K 원본 직행 저장",
      block3Desc: "Quark, 알리클라우드, 바이두, PikPak 등으로 초고속 전송하여 무손실 돌비 비전으로 감상.",
      extraPansou: {
        mainTitle: "압축 손실 없는 4K 원본 직행 저장",
        mainDesc: "Quark, 알리클라우드, 바이두, PikPak 등으로 초고속 전송하여 무손실 돌비 비전으로 감상.",
        subtext1: "탐색 지연 시간",
        subtext2: "유효 링크율",
        subtext3: "최고 화질 지원",
        bottomHint: "로그인 없이 클라우드 원클릭 직행 전송 지원"
      }
    },
    es: {
      tag: "CINEMATIC CLOUD ECOSYSTEM",
      sectionTitle: "Agregación Instantánea de Recursos en la Nube",
      sectionSubtitle: "Rompe las barreras de las nubes. Acceso directo a películas 4K HDR sin anuncios.",
      block1Title: "Motor de Deduplicación Inteligente",
      block1Desc: "La comparación de hashes SHA-256 filtra enlaces trampa y publicidad, dejando solo contenido legítimo.",
      block2Title: "Clúster Distribuido de Rastreo",
      block2Desc: "Cientos de nodos monitorean 24/7 los enlaces públicos verificados para estrenos y clásicos.",
      block3Title: "Transferencia 4K Directa sin Compresión",
      block3Desc: "Guarda al instante en Quark, Aliyun, Baidu o PikPak para reproducción Dolby Vision sin pérdida.",
      extraPansou: {
        mainTitle: "Transferencia 4K Directa sin Compresión",
        mainDesc: "Guarda al instante en Quark, Aliyun, Baidu o PikPak para reproducción Dolby Vision sin pérdida.",
        subtext1: "Latencia de Búsqueda",
        subtext2: "Enlaces Vivos",
        subtext3: "Calidad Máxima",
        bottomHint: "Compatible con transferencia rápida sin necesidad de inicio de sesión"
      }
    },
    fr: {
      tag: "CINEMATIC CLOUD ECOSYSTEM",
      sectionTitle: "Agrégation Instantanée des Ressources Cloud",
      sectionSubtitle: "Supprimez les cloisons entre plateformes. Accès direct aux films 4K HDR sans publicité.",
      block1Title: "Moteur de Déduplication Intelligent",
      block1Desc: "Le filtrage par empreinte SHA-256 élimine les pièges et spams pour ne conserver que les fichiers sains.",
      block2Title: "Cluster de Collecte Distribué",
      block2Desc: "Des centaines de nœuds analysent en continu les partages publics pour offrir les dernières sorties.",
      block3Title: "Transfert 4K Direct sans Compression",
      block3Desc: "Enregistrez en un éclair sur Quark, Aliyun, Baidu ou PikPak pour une restitution Dolby Vision pure.",
      extraPansou: {
        mainTitle: "Transfert 4K Direct sans Compression",
        mainDesc: "Enregistrez en un éclair sur Quark, Aliyun, Baidu ou PikPak pour une restitution Dolby Vision pure.",
        subtext1: "Latence d'indexation",
        subtext2: "Liens actifs garantis",
        subtext3: "Qualité vidéo max",
        bottomHint: "Transfert direct multi-plateformes sans connexion requise"
      }
    },
    de: {
      tag: "CINEMATIC CLOUD ECOSYSTEM",
      sectionTitle: "Echtzeit-Aggregation von Cloud-Ressourcen",
      sectionSubtitle: "Plattformübergreifende Suche nach 4K HDR Filmen und Serien ohne störende Werbung.",
      block1Title: "Intelligente Deduplizierung",
      block1Desc: "SHA-256 Hash-Vergleich filtert Spam und fehlerhafte Links zuverlässig heraus.",
      block2Title: "Verteilter Crawler-Cluster",
      block2Desc: "Hunderte Cloud-Knoten erfassen kontinuierlich verifizierte Freigaben für Neuerscheinungen und Klassiker.",
      block3Title: "Direkter 4K-Transfer ohne Neukomprimierung",
      block3Desc: "Blitzschnelles Speichern auf Quark, Aliyun, Baidu oder PikPak für verlustfreie Dolby Vision Wiedergabe.",
      extraPansou: {
        mainTitle: "Direkter 4K-Transfer ohne Neukomprimierung",
        mainDesc: "Blitzschnelles Speichern auf Quark, Aliyun, Baidu oder PikPak für verlustfreie Dolby Vision Wiedergabe.",
        subtext1: "Suchlatenz",
        subtext2: "Aktive Links garantiert",
        subtext3: "Maximale Videoqualität",
        bottomHint: "Direkter Multi-Plattform-Transfer ohne Login unterstützt"
      }
    },
    el: {
      tag: "CINEMATIC CLOUD ECOSYSTEM",
      sectionTitle: "Άμεση Συγκέντρωση Πηγών Cloud",
      sectionSubtitle: "Άμεση πρόσβαση σε ταινίες 4K HDR και σειρές χωρίς διαφημίσεις.",
      block1Title: "Έξυπνη Μηχανή Εκκαθάρισης",
      block1Desc: "Σύγκριση κατακερματισμού SHA-256 για φιλτράρισμα ανεπιθύμητων συνδέσμων.",
      block2Title: "Κατανεμημένο Σύμπλεγμα Ανίχνευσης",
      block2Desc: "Εκατοντάδες κόμβοι cloud παρακολουθούν επαληθευμένες δημόσιες κοινοποιήσεις 24/7.",
      block3Title: "Άμεση Μεταφορά 4K Χωρίς Επανασυμπίεση",
      block3Desc: "Άμεση αποθήκευση σε Quark, Aliyun, Baidu ή PikPak για αναπαραγωγή Dolby Vision.",
      extraPansou: {
        mainTitle: "Άμεση Μεταφορά 4K Χωρίς Επανασυμπίεση",
        mainDesc: "Άμεση αποθήκευση σε Quark, Aliyun, Baidu ή PikPak για αναπαραγωγή Dolby Vision.",
        subtext1: "Καθυστέρηση Αναζήτησης",
        subtext2: "Ενεργοί Σύνδεσμοι",
        subtext3: "Μέγιστη Ποιότητα",
        bottomHint: "Υποστήριξη άμεσης μεταφοράς χωρίς σύνδεση"
      }
    }
  },

  'reading-pro': {
    zh: {
      tag: "EDITORIAL MAGAZINE WORKBENCH",
      sectionTitle: "母语级外刊双语精读与语法拆解",
      sectionSubtitle: "精选《The Economist》《The New Yorker》深度长文，高清原版阅读与长难句重构",
      block1Title: "原版期刊高清矢量阅览",
      block1Desc: "原版原貌高分辨率呈现，结合 60 FPS 平滑翻页与零锯齿排版，沉浸还原海外顶刊质感。",
      block2Title: "长难句可视化语法树",
      block2Desc: "主谓宾定状补分层着色，清晰看透复合从句与倒装结构，告别死记硬背。",
      block3Title: "考研 / 雅思语料库提炼",
      block3Desc: "自动标注真题同源高频词汇与高级修辞搭配，一键生成专属艾宾浩斯复习卡片。"
    },
    en: {
      tag: "EDITORIAL MAGAZINE WORKBENCH",
      sectionTitle: "Bilingual Journal Reading & Syntax Analysis",
      sectionSubtitle: "In-depth interpretation of The Economist and The New Yorker with interactive layout and grammar trees.",
      block1Title: "Vector-Quality Magazine Reader",
      block1Desc: "Crisp high-resolution authentic journal rendering with 60 FPS smooth page navigation and clear typography.",
      block2Title: "Visual Grammar Parsing Tree",
      block2Desc: "Color-coded syntax structures to demystify complex clauses and inversions without rote memorization.",
      block3Title: "Exam & Academic Corpus Extractor",
      block3Desc: "Automatic highlighting of high-frequency academic vocabulary and sophisticated journalistic idioms."
    },
    ja: {
      tag: "EDITORIAL MAGAZINE WORKBENCH",
      sectionTitle: "ネイティブ級の海外雑誌バイリンガル精読と構文解析",
      sectionSubtitle: "「The Economist」「The New Yorker」の深層記事を厳選。原本高画質閲覧と構文分解を搭載。",
      block1Title: "高精細ベクター誌面ビューア",
      block1Desc: "原版そのままの高解像度レンダリングと60 FPSのスムーズなページ送りで上質な読書体験を提供。",
      block2Title: "難解構文のビジュアル構文木",
      block2Desc: "主語・述語・修飾節をカラーで色分け。複雑な複文や倒置構文も直感的に理解可能。",
      block3Title: "学術・試験対策コーパス抽出",
      block3Desc: "頻出重要語彙やネイティブならではの洗練されたコロケーションを自動抽出・整理。"
    },
    ko: {
      tag: "EDITORIAL MAGAZINE WORKBENCH",
      sectionTitle: "원어민 수준의 명품 저널 정독 및 구문 분석",
      sectionSubtitle: "The Economist, The New Yorker 심층 기사 제공. 원본 고화질 열람 및 문법 트리 시각화.",
      block1Title: "고해상도 벡터 저널 뷰어",
      block1Desc: "원판 레이아웃 그대로 고화질 렌더링 및 60 FPS 부드러운 페이지 전환으로 깊이 있는 독서 지원.",
      block2Title: "시각적 문법 구조 트리",
      block2Desc: "주어, 술어, 절 구조를 색상별로 구분하여 복잡한 도치 구문과 복합절도 직관적으로 파악.",
      block3Title: "학술 및 시험 핵심 어휘 추출",
      block3Desc: "고급 저널에 등장하는 빈출 중요 어휘와 자연스러운 표현을 자동으로 추출하여 정리."
    },
    es: {
      tag: "EDITORIAL MAGAZINE WORKBENCH",
      sectionTitle: "Lectura Bilingüe de Revistas y Análisis Sintáctico",
      sectionSubtitle: "Artículos selectos de The Economist y The New Yorker con diseño de alta fidelidad y árboles sintácticos.",
      block1Title: "Visor Vectorial de Alta Resolución",
      block1Desc: "Renderizado nítido de la revista original con paso de página fluido a 60 FPS y tipografía impecable.",
      block2Title: "Árbol Sintáctico Visual de Frases Complejas",
      block2Desc: "Estructuras codificadas por color para entender oraciones subordinadas complejas sin memorización forzada.",
      block3Title: "Extracción de Corpus Académico y Exámenes",
      block3Desc: "Resaltado automático de vocabulario de alto nivel y modismos periodísticos refinados."
    },
    fr: {
      tag: "EDITORIAL MAGAZINE WORKBENCH",
      sectionTitle: "Lecture Bilingue & Déconstruction Syntaxique",
      sectionSubtitle: "Sélection d'articles approfondis de The Economist et The New Yorker avec mise en page vectorielle.",
      block1Title: "Visionneuse Vectorielle Haute Fidélité",
      block1Desc: "Rendu authentique et précis des magazines originaux avec navigation fluide à 60 FPS.",
      block2Title: "Arbre Syntaxique Visuel",
      block2Desc: "Repérage coloré des propositions complexes et inversions pour une compréhension intuitive.",
      block3Title: "Extraction de Vocabulaire Académique",
      block3Desc: "Identification automatique du lexique essentiel et des tournures idiomatiques de haut niveau."
    },
    de: {
      tag: "EDITORIAL MAGAZINE WORKBENCH",
      sectionTitle: "Bilinguale Zeitschriften-Lektüre & Satzanalyse",
      sectionSubtitle: "Tiefgehende Leitartikel aus The Economist und The New Yorker mit hochauflösendem Vektor-Rendering.",
      block1Title: "Hochpräziser Zeitschriften-Betrachter",
      block1Desc: "Authentisches Magazin-Layout in gestochen scharfer Vektorqualität mit flüssigem 60 FPS Seitenwechsel.",
      block2Title: "Visueller Grammatik-Strukturbaum",
      block2Desc: "Farbkodierte Syntaxanalyse komplexer Schachtelsätze für müheloses Textverständnis.",
      block3Title: "Akademischer Wortschatz-Extraktor",
      block3Desc: "Automatisches Hervorheben anspruchsvoller Vokabeln und stilistischer Redewendungen."
    },
    el: {
      tag: "EDITORIAL MAGAZINE WORKBENCH",
      sectionTitle: "Δίγλωσση Μελέτη Περιοδικών & Συντακτική Ανάλυση",
      sectionSubtitle: "Επιλεγμένα άρθρα από The Economist και The New Yorker με καθαρή διάταξη και συντακτικά δέντρα.",
      block1Title: "Προβολή Περιοδικών Υψηλής Ανάλυσης",
      block1Desc: "Καθαρή διανυσματική απόδοση των πρωτότυπων εντύπων με ομαλή πλοήγηση 60 FPS.",
      block2Title: "Οπτικό Συντακτικό Δέντρο",
      block2Desc: "Χρωματική επισήμανση πολύπλοκων προτάσεων για άμεση κατανόηση χωρίς παπαγαλία.",
      block3Title: "Εξαγωγή Ακαδημαϊκού Λεξιλογίου",
      block3Desc: "Αυτόματη επισήμανση προχωρημένων λέξεων και δημοσιογραφικών εκφράσεων."
    }
  },

  'ai-agent': {
    zh: {
      tag: "QUANTITATIVE NEURAL TERMINAL",
      sectionTitle: "128 因子多模态量化决策矩阵",
      sectionSubtitle: "融合深度研报研读、量化回测与动态风控熔断机制",
      block1Title: "128 个因子运算",
      block1Desc: "涵盖动量、资金流向、估值分位数与波动率",
      block2Title: "秒读万份宏观研报",
      block2Desc: "提炼产业链上下游传导异动与核心超预期点",
      block3Title: "毫秒级自动熔断",
      block3Desc: "严格控制最大动态回撤，确保安全边际",
      block4Title: "10年历史全景回测",
      block4Desc: "高夏普比率策略验证，剔除过拟合陷阱",
      extraAi: {
        chartTitle: "ALPHA-108 神经网络收益回测曲线",
        cumulativeReturn: "累计回报率: +184.6%",
        sharpe: "夏普比率: 3.82",
        maxDrawdown: "最大回撤: 4.2%"
      }
    },
    en: {
      tag: "QUANTITATIVE NEURAL TERMINAL",
      sectionTitle: "128-Factor Multimodal Quant Decision Engine",
      sectionSubtitle: "Seamlessly combining deep research digest, historical backtesting, and circuit breakers.",
      block1Title: "128 Factor Computation",
      block1Desc: "Covers momentum, institutional flows, valuation percentiles, and volatility.",
      block2Title: "Thousands of Filings in Seconds",
      block2Desc: "Extracts supply chain shifts and surprise earnings catalysts instantly.",
      block3Title: "Millisecond Auto-Circuit Breaker",
      block3Desc: "Strict drawdown management to safeguard downside capital preservation.",
      block4Title: "10-Year Full Cycle Backtesting",
      block4Desc: "High Sharpe verification while neutralizing overfitting biases.",
      extraAi: {
        chartTitle: "ALPHA-108 NEURAL YIELD BACKTEST CURVE",
        cumulativeReturn: "CUMULATIVE RETURN: +184.6%",
        sharpe: "SHARPE: 3.82",
        maxDrawdown: "MAX DRAWDOWN: 4.2%"
      }
    },
    ja: {
      tag: "QUANTITATIVE NEURAL TERMINAL",
      sectionTitle: "128ファクター マルチモーダル定量意思決定エンジン",
      sectionSubtitle: "高度なレポート分析、バックテスト、リアルタイムリスク制御を融合。",
      block1Title: "128ファクター並列演算",
      block1Desc: "モメンタム、機関資金動向、バリュエーション、ボラティリティを網羅。",
      block2Title: "膨大な金融レポートを瞬時に読解",
      block2Desc: "サプライチェーンの変動や業績サプライズの要点をAIが即座に抽出。",
      block3Title: "ミリ秒単位のリスク遮断",
      block3Desc: "最大ドローダウンを厳格に抑制し、確実な安全マージンを確保。",
      block4Title: "10年間のヒストリカルバックテスト",
      block4Desc: "過剰適合を排除した高シャープレシオの戦略を検証。",
      extraAi: {
        chartTitle: "ALPHA-108 ニューラル収益バックテスト曲線",
        cumulativeReturn: "累積リターン: +184.6%",
        sharpe: "シャープレシオ: 3.82",
        maxDrawdown: "最大ドローダウン: 4.2%"
      }
    },
    ko: {
      tag: "QUANTITATIVE NEURAL TERMINAL",
      sectionTitle: "128 팩터 멀티모달 퀀트 투자 결정 엔진",
      sectionSubtitle: "심층 리서치 분석, 10년 백테스팅 및 실시간 리스크 차단 시스템 결합.",
      block1Title: "128개 정량 팩터 연산",
      block1Desc: "모멘텀, 기관 자금 흐름, 밸류에이션 백분위수 및 변동성 종합 산출.",
      block2Title: "수만 건의 글로벌 리포트 즉시 분석",
      block2Desc: "산업 체인 공급망 변화 및 어닝 서프라이즈 핵심 포인트를 AI가 요약.",
      block3Title: "밀리초 단위 자동 서킷브레이커",
      block3Desc: "최대 낙폭(MDD)을 엄격히 제한하여 안전 마진 확보.",
      block4Title: "10년 전주기 백테스팅 검증",
      block4Desc: "과적합 위험을 배제한 고 샤프 지수 투자 전략 검증.",
      extraAi: {
        chartTitle: "ALPHA-108 신경망 수익률 백테스팅 곡선",
        cumulativeReturn: "누적 수익률: +184.6%",
        sharpe: "샤프 지수: 3.82",
        maxDrawdown: "최대 낙폭: 4.2%"
      }
    },
    es: {
      tag: "QUANTITATIVE NEURAL TERMINAL",
      sectionTitle: "Motor Cuantitativo Multimodal de 128 Factores",
      sectionSubtitle: "Integración de síntesis de informes, backtesting histórico y control de riesgo dinámico.",
      block1Title: "Cálculo de 128 Factores",
      block1Desc: "Abarca momentum, flujo de capitales, percentiles de valoración y volatilidad.",
      block2Title: "Miles de Informes en Segundos",
      block2Desc: "Extrae cambios en cadenas de valor y catalizadores de ganancias inesperadas.",
      block3Title: "Disyuntor Automático en Milisegundos",
      block3Desc: "Control estricto de drawdown para proteger el capital contra caídas.",
      block4Title: "10 Años de Backtesting Exhaustivo",
      block4Desc: "Validación de alto Sharpe eliminando sesgos de sobreajuste.",
      extraAi: {
        chartTitle: "CURVA DE RENDIMIENTO NEURONAL ALPHA-108",
        cumulativeReturn: "RETORNO ACUMULADO: +184.6%",
        sharpe: "SHARPE: 3.82",
        maxDrawdown: "MAX DRAWDOWN: 4.2%"
      }
    },
    fr: {
      tag: "QUANTITATIVE NEURAL TERMINAL",
      sectionTitle: "Moteur Décisionnel Quantitatif à 128 Facteurs",
      sectionSubtitle: "Combinaison de synthèse d'analyses financières, backtesting et coupe-circuit dynamique.",
      block1Title: "Calcul de 128 Facteurs",
      block1Desc: "Couvre le momentum, les flux institutionnels, la valorisation et la volatilité.",
      block2Title: "Des Milliers de Rapports en Secondes",
      block2Desc: "Extraction instantanée des signaux économiques majeurs et ruptures de tendance.",
      block3Title: "Coupe-Circuit Automatique en Millisecondes",
      block3Desc: "Gestion rigoureuse du drawdown pour préserver le capital.",
      block4Title: "Backtesting Complet sur 10 Ans",
      block4Desc: "Stratégies à ratio de Sharpe élevé sans surapprentissage.",
      extraAi: {
        chartTitle: "COURBE DE RENDEMENT NEURONAL ALPHA-108",
        cumulativeReturn: "RENDEMENT CUMULÉ: +184.6%",
        sharpe: "SHARPE: 3.82",
        maxDrawdown: "DRAWDOWN MAX: 4.2%"
      }
    },
    de: {
      tag: "QUANTITATIVE NEURAL TERMINAL",
      sectionTitle: "128-Faktor Multimodale Quant-Entscheidungsmatrix",
      sectionSubtitle: "Synthese aus Finanzanalysen, historischem Backtesting und Risikobegrenzung.",
      block1Title: "128-Faktor-Berechnung",
      block1Desc: "Berücksichtigt Momentum, Kapitalströme, Bewertungsperzentile und Volatilität.",
      block2Title: "Tausende Berichte in Sekundenschnelle",
      block2Desc: "Ermittelt Lieferkettenverschiebungen und Marktüberraschungen automatisch.",
      block3Title: "Automatischer Millisekunden-Sicherheitsstopp",
      block3Desc: "Strikte Begrenzung des maximalen Drawdowns für optimalen Kapitalschutz.",
      block4Title: "10-Jahres-Backtesting über alle Marktzyklen",
      block4Desc: "Verifizierte Strategien mit hoher Sharpe-Ratio ohne Overfitting.",
      extraAi: {
        chartTitle: "ALPHA-108 NEURONALE RENDITE-BACKTEST-KURVE",
        cumulativeReturn: "KUMULIERTE RENDITE: +184.6%",
        sharpe: "SHARPE: 3.82",
        maxDrawdown: "MAX DRAWDOWN: 4.2%"
      }
    },
    el: {
      tag: "QUANTITATIVE NEURAL TERMINAL",
      sectionTitle: "Ποσοτική Μηχανή Αποφάσεων 128 Παραγόντων",
      sectionSubtitle: "Σύνθεση ανάλυσης εκθέσεων, ιστορικού ελέγχου και δυναμικού ελέγχου κινδύνου.",
      block1Title: "Υπολογισμός 128 Παραγόντων",
      block1Desc: "Καλύπτει δυναμική, ροές κεφαλαίων, αποτιμήσεις και μεταβλητότητα.",
      block2Title: "Χιλιάδες Εκθέσεις σε Δευτερόλεπτα",
      block2Desc: "Εξαγωγή βασικών οικονομικών σημάτων και εξελίξεων της αγοράς.",
      block3Title: "Αυτόματος Διακόπτης Κινδύνου σε Χιλιοστά",
      block3Desc: "Αυστηρός έλεγχος μέγιστης υποχώρησης για προστασία κεφαλαίου.",
      block4Title: "Πλήρης Έλεγχος 10 Ετών",
      block4Desc: "Επαλήθευση στρατηγικών υψηλού δείκτη Sharpe χωρίς υπερπροσαρμογή.",
      extraAi: {
        chartTitle: "ΚΑΜΠΥΛΗ ΑΠΟΔΟΣΗΣ ALPHA-108",
        cumulativeReturn: "ΣΥΝΟΛΙΚΗ ΑΠΟΔΟΣΗ: +184.6%",
        sharpe: "SHARPE: 3.82",
        maxDrawdown: "ΜΕΓΙΣΤΗ ΥΠΟΧΩΡΗΣΗ: 4.2%"
      }
    }
  },

  chat: {
    zh: {
      tag: "ZERO-KNOWLEDGE PRIVACY ARCHITECTURE",
      sectionTitle: "中国人自己的 Telegram，真·端到端加密",
      sectionSubtitle: "密钥生成于用户设备硬件芯片，服务器零知识中继，绝不留存任何聊天记录",
      block1Title: "本地设备私钥隔离",
      block1Desc: "私钥完全封存于本地安全隔离芯片，任何第三方或云端管理员均无权访问。",
      block2Title: "零知识盲传中继",
      block2Desc: "中继节点仅负责高并发路由转发密文包，即收即焚，不设任何数据库沉淀。",
      block3Title: "动态防截屏与双向销毁",
      block3Desc: "支持阅后即焚计时器与双向一键撤回，彻底抹除双方设备的一切对话痕迹。"
    },
    en: {
      tag: "ZERO-KNOWLEDGE PRIVACY ARCHITECTURE",
      sectionTitle: "Autonomous E2EE Messenger with Zero Logs",
      sectionSubtitle: "Keys generated in secure hardware enclaves. Zero-knowledge relays guarantee complete anonymity.",
      block1Title: "Hardware Enclave Key Isolation",
      block1Desc: "Private keys reside exclusively in device security chips, inaccessible to any third party or cloud admin.",
      block2Title: "Zero-Knowledge Blind Relays",
      block2Desc: "Relay nodes solely route encrypted cipher packets without storing any conversation databases.",
      block3Title: "Anti-Screenshot & Dual-Side Erase",
      block3Desc: "Self-destruct timers and bidirectional wipe erase all conversation traces on both devices permanently."
    },
    ja: {
      tag: "ZERO-KNOWLEDGE PRIVACY ARCHITECTURE",
      sectionTitle: "完全ログなしの真のE2EE暗号化メッセンジャー",
      sectionSubtitle: "暗号鍵は端末のセキュア領域で生成。サーバーには一切のチャットログを残しません。",
      block1Title: "端末ハードウェア鍵隔離",
      block1Desc: "秘密鍵はデバイス内の隔離セキュリティチップに保管され、外部からのアクセスを遮断。",
      block2Title: "ゼロ知識ブラインド中継",
      block2Desc: "中継サーバーは暗号化パケットの高速転送のみを行い、データベースへの記録は行いません。",
      block3Title: "スクショ防止と双方完全消去",
      block3Desc: "閲覧後消滅タイマーと双方一括削除により、両端末から会話の痕跡を完全に抹消。"
    },
    ko: {
      tag: "ZERO-KNOWLEDGE PRIVACY ARCHITECTURE",
      sectionTitle: "로그 제로의 진정한 종단간(E2EE) 보안 메신저",
      sectionSubtitle: "암호화 키는 사용자 기기 보안 칩에만 저장되며, 서버는 어떤 대화 기록도 저장하지 않습니다.",
      block1Title: "기기 하드웨어 키 격리",
      block1Desc: "개인 키는 로컬 보안 칩(Secure Enclave)에만 격리되어 제3자나 관리자도 접근 불가.",
      block2Title: "영지식 블라인드 릴레이",
      block2Desc: "중계 서버는 암호화 패킷의 초고속 전송만 담당하며 데이터베이스에 일체 보관하지 않음.",
      block3Title: "화면 캡처 방지 및 양방향 완전 삭제",
      block3Desc: "자동 파기 타이머와 원클릭 양방향 삭제로 양측 기기의 모든 대화 흔적을 영구 제거."
    },
    es: {
      tag: "ZERO-KNOWLEDGE PRIVACY ARCHITECTURE",
      sectionTitle: "Mensajería E2EE con Cero Registro de Datos",
      sectionSubtitle: "Claves generadas en enclaves seguros del dispositivo. Los servidores no guardan ningún registro.",
      block1Title: "Aislamiento de Claves en Hardware",
      block1Desc: "Las claves privadas residen exclusivamente en el chip de seguridad del dispositivo.",
      block2Title: "Retransmisión Ciega de Conocimiento Cero",
      block2Desc: "Los nodos de retransmisión solo enrutan paquetes cifrados sin almacenar bases de datos de chat.",
      block3Title: "Anticaptura y Borrado Bidireccional",
      block3Desc: "Temporizadores de autodestrucción y borrado simultáneo eliminan cualquier rastro en ambos lados."
    },
    fr: {
      tag: "ZERO-KNOWLEDGE PRIVACY ARCHITECTURE",
      sectionTitle: "Messagerie Chiffrée de Bout en Bout Sans Journaux",
      sectionSubtitle: "Clés créées dans l'enclave sécurisée de l'appareil. Les serveurs ne conservent aucun journal.",
      block1Title: "Isolation des Clés Matérielle",
      block1Desc: "Les clés privées restent strictement confinées dans la puce de sécurité de votre appareil.",
      block2Title: "Relais Aveugle à Connaissance Nulle",
      block2Desc: "Les nœuds de relais acheminent uniquement les paquets chiffrés sans aucune base de données de chat.",
      block3Title: "Anti-Capture & Effacement Bilatéral",
      block3Desc: "Minuteurs d'autodestruction et révocation en un clic pour effacer toute trace sur les deux appareils."
    },
    de: {
      tag: "ZERO-KNOWLEDGE PRIVACY ARCHITECTURE",
      sectionTitle: "Echter Ende-zu-Ende-verschlüsselter Messenger ohne Logs",
      sectionSubtitle: "Schlüssel verbleiben in der Geräte-Sicherheits-Enklave. Server speichern keinerlei Chat-Verläufe.",
      block1Title: "Hardware-Schlüssel-Isolation",
      block1Desc: "Private Schlüssel verbleiben ausschließlich im Sicherheitschip Ihres Geräts.",
      block2Title: "Zero-Knowledge Blind-Relais",
      block2Desc: "Relais-Knoten leiten nur verschlüsselte Pakete weiter, ohne Speicherung in Datenbanken.",
      block3Title: "Screenshot-Schutz & Beidseitiges Löschen",
      block3Desc: "Selbstzerstörungs-Timer und sofortiger Widerruf entfernen alle Spuren auf beiden Geräten."
    },
    el: {
      tag: "ZERO-KNOWLEDGE PRIVACY ARCHITECTURE",
      sectionTitle: "Ασφαλής Εφαρμογή Μηνυμάτων E2EE Χωρίς Αρχεία Καταγραφής",
      sectionSubtitle: "Τα κλειδιά δημιουργούνται στο ασφαλές υλικό της συσκευής. Μηδενική καταγραφή συνομιλιών.",
      block1Title: "Απομόνωση Κλειδιών στο Υλικό",
      block1Desc: "Τα ιδιωτικά κλειδιά παραμένουν αποκλειστικά στο τσιπ ασφαλείας της συσκευής.",
      block2Title: "Αναμετάδοση Μηδενικής Γνώσης",
      block2Desc: "Οι κόμβοι δρομολογούν μόνο κρυπτογραφημένα πακέτα χωρίς αποθήκευση βάσης δεδομένων.",
      block3Title: "Προστασία από Στιγμιότυπα & Αμφίδρομη Διαγραφή",
      block3Desc: "Χρονόμετρα αυτοκαταστροφής και άμεση διαγραφή εξαλείφουν κάθε ίχνος συνομιλίας."
    }
  }
};

export interface StageContent {
  pansou: {
    tag1: string;
    tag2: string;
    tag3: string;
    tag4: string;
    cinemaEngineTag: string;
    headline: string;
  };
  readingPro: {
    magazineName: string;
    essayTag: string;
    essayExcerpt: string;
    canvasRendering: string;
    syntaxTitle: string;
    syntaxAnalysis: string;
    syntaxExcerpt: string;
    corpusTag: string;
  };
  aiAgent: {
    neuralTag: string;
    sharpe: string;
    factorScore: string;
    riskCircuit: string;
  };
  chat: {
    vaultTag: string;
    bubbleMessage: string;
    cipherKeyLabel: string;
    verified: string;
  };
}

export const STAGE_TRANSLATIONS: Record<string, StageContent> = {
  zh: {
    pansou: {
      tag1: "夸克 4K HDR 原画",
      tag2: "阿里云盘不限速",
      tag3: "百度网盘",
      tag4: "迅雷 / PikPak",
      cinemaEngineTag: "ALL-CLOUD CINEMA ENGINE",
      headline: "0.08 秒全网秒级聚合嗅探与原画直存"
    },
    readingPro: {
      magazineName: "THE ECONOMIST",
      essayTag: "ORIGINAL ESSAY",
      essayExcerpt: "\"Autonomous neural networks redefine macroeconomic transmission channels and central bank policy limits...\"",
      canvasRendering: "Canvas 60 FPS 矢量高清渲染",
      syntaxTitle: "SYNTAX TREE",
      syntaxAnalysis: "深度语法树精析",
      syntaxExcerpt: "「自主神经网络正在重塑宏观经济传导机制与央行货币政策的有效边界...」",
      corpusTag: "考研/雅思/GRE 核心高频语料库"
    },
    aiAgent: {
      neuralTag: "NEURAL QUANT ENGINE · REALTIME",
      sharpe: "SHARPE 2.84",
      factorScore: "● 128因子综合打分: 98.4 (强力买入)",
      riskCircuit: "毫秒级风控熔断保护"
    },
    chat: {
      vaultTag: "256-BIT ZERO-KNOWLEDGE VAULT",
      bubbleMessage: "「中国人自己的 Telegram，零知识盲传，消息秒发秒达。」",
      cipherKeyLabel: "HARDWARE CIPHER KEY:",
      verified: "7f3a9e...e04d21 (0.01秒 硬件已验证)"
    }
  },
  en: {
    pansou: {
      tag1: "Quark 4K HDR Direct",
      tag2: "Aliyun Max Speed",
      tag3: "Baidu Netdisk",
      tag4: "PikPak / Thunder",
      cinemaEngineTag: "ALL-CLOUD CINEMA ENGINE",
      headline: "0.08s Sub-Second Cloud Indexing & Direct 4K Save"
    },
    readingPro: {
      magazineName: "THE ECONOMIST",
      essayTag: "ORIGINAL ESSAY",
      essayExcerpt: "\"Autonomous neural networks redefine macroeconomic transmission channels and central bank policy limits...\"",
      canvasRendering: "Canvas 60 FPS Vector High-Fidelity Rendering",
      syntaxTitle: "SYNTAX TREE",
      syntaxAnalysis: "Visual Syntax Tree Breakdown",
      syntaxExcerpt: "\"Autonomous neural networks are reshaping macroeconomic transmission mechanisms and central bank policy frontiers...\"",
      corpusTag: "IELTS / GRE Core Academic Corpus"
    },
    aiAgent: {
      neuralTag: "NEURAL QUANT ENGINE · REALTIME",
      sharpe: "SHARPE 2.84",
      factorScore: "● 128-Factor Score: 98.4 (Strong Buy)",
      riskCircuit: "Sub-millisecond Risk Circuit Breaker"
    },
    chat: {
      vaultTag: "256-BIT ZERO-KNOWLEDGE VAULT",
      bubbleMessage: "\"Your sovereign private Telegram. Zero-knowledge blind transit, instant delivery.\"",
      cipherKeyLabel: "HARDWARE CIPHER KEY:",
      verified: "7f3a9e...e04d21 (0.01s Verified)"
    }
  },
  ja: {
    pansou: {
      tag1: "Quark 4K HDR 原画",
      tag2: "Aliyun 高速無制限",
      tag3: "Baidu クラウド",
      tag4: "PikPak / 迅雷",
      cinemaEngineTag: "ALL-CLOUD CINEMA ENGINE",
      headline: "0.08秒 クラウド全域リアルタイム検出 & 4K原画保存"
    },
    readingPro: {
      magazineName: "THE ECONOMIST",
      essayTag: "原本記事",
      essayExcerpt: "\"Autonomous neural networks redefine macroeconomic transmission channels and central bank policy limits...\"",
      canvasRendering: "Canvas 60 FPS ベクター高解像度描画",
      syntaxTitle: "SYNTAX TREE",
      syntaxAnalysis: "構文木・文法詳細解析",
      syntaxExcerpt: "「自律型ニューラルネットワークはマクロ経済の波及経路と金融政策のフロンティアを再定義している...」",
      corpusTag: "IELTS / GRE 学術・試験頻出コーパス"
    },
    aiAgent: {
      neuralTag: "NEURAL QUANT ENGINE · REALTIME",
      sharpe: "SHARPE 2.84",
      factorScore: "● 128ファクター総合スコア: 98.4 (強力買い)",
      riskCircuit: "ミリ秒単位のリスク遮断保護"
    },
    chat: {
      vaultTag: "256-BIT ZERO-KNOWLEDGE VAULT",
      bubbleMessage: "「主権あるプライベートTelegram。ゼロ知識暗号化で即時配信。」",
      cipherKeyLabel: "HARDWARE CIPHER KEY:",
      verified: "7f3a9e...e04d21 (0.01秒 ハードウェア検証済)"
    }
  },
  ko: {
    pansou: {
      tag1: "Quark 4K HDR 원본",
      tag2: "알리클라우드 무제한 속도",
      tag3: "바이두 클라우드",
      tag4: "PikPak / Thunder",
      cinemaEngineTag: "ALL-CLOUD CINEMA ENGINE",
      headline: "0.08초 전 플랫폼 초고속 통합 탐색 및 4K 무손실 저장"
    },
    readingPro: {
      magazineName: "THE ECONOMIST",
      essayTag: "ORIGINAL ESSAY",
      essayExcerpt: "\"Autonomous neural networks redefine macroeconomic transmission channels and central bank policy limits...\"",
      canvasRendering: "Canvas 60 FPS 벡터 고해상도 렌더링",
      syntaxTitle: "SYNTAX TREE",
      syntaxAnalysis: "문법 구조 트리 심층 분석",
      syntaxExcerpt: "「자율 신경망이 거시경제 전달 메커니즘과 중앙은행 통화정책의 한계를 재정의하고 있다...」",
      corpusTag: "IELTS / 대학원 핵심 고빈도 코퍼스"
    },
    aiAgent: {
      neuralTag: "NEURAL QUANT ENGINE · REALTIME",
      sharpe: "SHARPE 2.84",
      factorScore: "● 128-인자 종합 점수: 98.4 (적극 매수)",
      riskCircuit: "밀리초 단위 리스크 서킷브레이커"
    },
    chat: {
      vaultTag: "256-BIT ZERO-KNOWLEDGE VAULT",
      bubbleMessage: "「개인 프라이버시 텔레그램. 영지식 암호화 및 즉각 전달.」",
      cipherKeyLabel: "HARDWARE CIPHER KEY:",
      verified: "7f3a9e...e04d21 (0.01초 하드웨어 검증됨)"
    }
  },
  es: {
    pansou: {
      tag1: "Quark 4K HDR Original",
      tag2: "Aliyun Alta Velocidad",
      tag3: "Baidu Cloud",
      tag4: "PikPak / Thunder",
      cinemaEngineTag: "ALL-CLOUD CINEMA ENGINE",
      headline: "Indexación en la nube en 0,08s y guardado 4K directo"
    },
    readingPro: {
      magazineName: "THE ECONOMIST",
      essayTag: "ENSAYO ORIGINAL",
      essayExcerpt: "\"Autonomous neural networks redefine macroeconomic transmission channels and central bank policy limits...\"",
      canvasRendering: "Renderizado Vectorial Canvas a 60 FPS",
      syntaxTitle: "SYNTAX TREE",
      syntaxAnalysis: "Desglose de Árbol Sintáctico",
      syntaxExcerpt: "\"Las redes neuronales autónomas están redefiniendo los canales de transmisión macroeconómica y los límites de la política...\"",
      corpusTag: "Corpus Académico IELTS / GRE"
    },
    aiAgent: {
      neuralTag: "NEURAL QUANT ENGINE · REALTIME",
      sharpe: "SHARPE 2.84",
      factorScore: "● Puntuación 128 Factores: 98.4 (Compra Fuerte)",
      riskCircuit: "Protección de Circuito de Riesgo en Milisegundos"
    },
    chat: {
      vaultTag: "256-BIT ZERO-KNOWLEDGE VAULT",
      bubbleMessage: "\"Tu Telegram soberano y privado. Tránsito ciego con conocimiento cero y entrega instantánea.\"",
      cipherKeyLabel: "HARDWARE CIPHER KEY:",
      verified: "7f3a9e...e04d21 (0.01s Verificado)"
    }
  },
  fr: {
    pansou: {
      tag1: "Quark 4K HDR Brut",
      tag2: "Aliyun Débit Illimité",
      tag3: "Baidu Cloud",
      tag4: "PikPak / Thunder",
      cinemaEngineTag: "ALL-CLOUD CINEMA ENGINE",
      headline: "Indexation cloud en 0,08s et enregistrement direct 4K"
    },
    readingPro: {
      magazineName: "THE ECONOMIST",
      essayTag: "ARTICLE ORIGINAL",
      essayExcerpt: "\"Autonomous neural networks redefine macroeconomic transmission channels and central bank policy limits...\"",
      canvasRendering: "Rendu Vectoriel Canvas à 60 FPS",
      syntaxTitle: "SYNTAX TREE",
      syntaxAnalysis: "Analyse par Arbre Syntaxique",
      syntaxExcerpt: "\"Les réseaux neuronaux autonomes redéfinissent les canaux de transmission macroéconomique et les limites des politiques...\"",
      corpusTag: "Corpus Académique IELTS / GRE"
    },
    aiAgent: {
      neuralTag: "NEURAL QUANT ENGINE · REALTIME",
      sharpe: "SHARPE 2.84",
      factorScore: "● Score 128 Facteurs: 98.4 (Achat Fort)",
      riskCircuit: "Protection Coupe-Circuit Milliseconde"
    },
    chat: {
      vaultTag: "256-BIT ZERO-KNOWLEDGE VAULT",
      bubbleMessage: "\"Votre Telegram souverain et privé. Routage aveugle à divulgation nulle, livraison instantanée.\"",
      cipherKeyLabel: "HARDWARE CIPHER KEY:",
      verified: "7f3a9e...e04d21 (0.01s Vérifié)"
    }
  },
  de: {
    pansou: {
      tag1: "Quark 4K HDR Original",
      tag2: "Aliyun Max Bandbreite",
      tag3: "Baidu Cloud",
      tag4: "PikPak / Thunder",
      cinemaEngineTag: "ALL-CLOUD CINEMA ENGINE",
      headline: "0,08s Cloud-Indexierung & verlustfreie 4K-Direktspeicherung"
    },
    readingPro: {
      magazineName: "THE ECONOMIST",
      essayTag: "ORIGINAL-ESSAY",
      essayExcerpt: "\"Autonomous neural networks redefine macroeconomic transmission channels and central bank policy limits...\"",
      canvasRendering: "Canvas 60 FPS Vektor-Rendering",
      syntaxTitle: "SYNTAX TREE",
      syntaxAnalysis: "Visuelle Satzstrukturanalyse",
      syntaxExcerpt: "\"Autonome neuronale Netze definieren makroökonomische Transmissionskanäle und Zentralbankpolitiken neu...\"",
      corpusTag: "IELTS / GRE Akademisches Kernkorpus"
    },
    aiAgent: {
      neuralTag: "NEURAL QUANT ENGINE · REALTIME",
      sharpe: "SHARPE 2.84",
      factorScore: "● 128-Faktor-Score: 98.4 (Kaufempfehlung)",
      riskCircuit: "Millisekunden-Risikoabsicherung"
    },
    chat: {
      vaultTag: "256-BIT ZERO-KNOWLEDGE VAULT",
      bubbleMessage: "\"Ihr souveränes privates Telegram. Zero-Knowledge-Blindübertragung, blitzschnelle Zustellung.\"",
      cipherKeyLabel: "HARDWARE CIPHER KEY:",
      verified: "7f3a9e...e04d21 (0,01s Hardware-verifiziert)"
    }
  },
  el: {
    pansou: {
      tag1: "Quark 4K HDR Πρωτότυπο",
      tag2: "Aliyun Χωρίς Περιορισμό",
      tag3: "Baidu Cloud",
      tag4: "PikPak / Thunder",
      cinemaEngineTag: "ALL-CLOUD CINEMA ENGINE",
      headline: "Ευρετηρίαση cloud σε 0,08 δευτ. & άμεση αποθήκευση 4K"
    },
    readingPro: {
      magazineName: "THE ECONOMIST",
      essayTag: "ΠΡΩΤΟΤΥΠΟ ΑΡΘΡΟ",
      essayExcerpt: "\"Autonomous neural networks redefine macroeconomic transmission channels and central bank policy limits...\"",
      canvasRendering: "Διανυσματική Απόδοση Canvas στα 60 FPS",
      syntaxTitle: "SYNTAX TREE",
      syntaxAnalysis: "Ανάλυση Συντακτικού Δέντρου",
      syntaxExcerpt: "\"Τα αυτόνομα νευρωνικά δίκτυα επαναπροσδιορίζουν τους μηχανισμούς μακροοικονομικής μετάδοσης...\"",
      corpusTag: "Ακαδημαϊκό Σώμα Κειμένων IELTS / GRE"
    },
    aiAgent: {
      neuralTag: "NEURAL QUANT ENGINE · REALTIME",
      sharpe: "SHARPE 2.84",
      factorScore: "● Βαθμολογία 128 Παραγόντων: 98.4 (Ισχυρή Αγορά)",
      riskCircuit: "Προστασία Κυκλώματος Κινδύνου σε Χιλιοστά Δευτερολέπτου"
    },
    chat: {
      vaultTag: "256-BIT ZERO-KNOWLEDGE VAULT",
      bubbleMessage: "\"Το κυρίαρχο ιδιωτικό σας Telegram. Μετάδοση μηδενικής γνώσης και άμεση παράδοση.\"",
      cipherKeyLabel: "HARDWARE CIPHER KEY:",
      verified: "7f3a9e...e04d21 (0,01δ Επαληθεύτηκε)"
    }
  }
};

export interface ShowcasePageUI {
  interactiveBtn: string;
  workshopTitle: string;
  workshopSubtitle: string;
  specsTitle: string;
  specsSubtitle: string;
  comparisonTitle: string;
  readyTitle: string;
  launchNow: string;
  exploreSuite: string;
  archTitle: string;
  viewing: string;
  explore: string;
  quark: string;
  aliyun: string;
  baidu: string;
  clickToExpand: string;
  close: string;
  moduleAnatomy: string;
  liveTelemetry: string;
  simulationOnline: string;
}

export const SHOWCASE_PAGE_UI_TRANSLATIONS: Record<string, ShowcasePageUI> = {
  zh: {
    interactiveBtn: "互动工坊实机体验",
    workshopTitle: "交互工坊 · 实机即刻上手",
    workshopSubtitle: "无需安装配置，在此体验核心引擎的完整交互流程",
    specsTitle: "硬核性能与架构参数",
    specsSubtitle: "工业级标准构建，追求极致吞吐与最低延迟",
    comparisonTitle: "性能优势深度对比",
    readyTitle: "准备好开启全新体验了吗？",
    launchNow: "即刻启动体验",
    exploreSuite: "探索更多专业套件",
    archTitle: "解构核心微架构",
    viewing: "当前浏览",
    explore: "查看详情",
    quark: "夸克网盘",
    aliyun: "阿里云盘",
    baidu: "百度网盘",
    clickToExpand: "点击全景解构",
    close: "关闭",
    moduleAnatomy: "模块深度微架构全景",
    liveTelemetry: "实时遥测与数据流监测",
    simulationOnline: "仿真引擎链路就绪"
  },
  en: {
    interactiveBtn: "Interactive Workbench",
    workshopTitle: "Interactive Workbench",
    workshopSubtitle: "Zero setup required. Test the core engine's full interactive flow right here.",
    specsTitle: "Engine Performance & Technical Specs",
    specsSubtitle: "Engineered to industrial standards for maximum throughput and ultra-low latency.",
    comparisonTitle: "Architectural Advantage Comparison",
    readyTitle: "Ready for the Next Generation?",
    launchNow: "Launch Now",
    exploreSuite: "Explore Entire Suite",
    archTitle: "Core Micro-Architectures",
    viewing: "Viewing",
    explore: "Explore",
    quark: "Quark Netdisk",
    aliyun: "Aliyun Drive",
    baidu: "Baidu Netdisk",
    clickToExpand: "Click to Expand Architecture",
    close: "Close",
    moduleAnatomy: "Deep Micro-Architecture Anatomy",
    liveTelemetry: "Live Telemetry & Data Stream",
    simulationOnline: "Simulation Engine Online"
  },
  ja: {
    interactiveBtn: "インタラクティブ体験",
    workshopTitle: "インタラクティブ・ワークベンチ",
    workshopSubtitle: "設定不要、ブラウザ上でコアエンジンのフル操作を即座に体験。",
    specsTitle: "パフォーマンス & 技術仕様",
    specsSubtitle: "業界最高水准で構築され、最大の処理能力と極小のレイテンシを追求。",
    comparisonTitle: "アーキテクチャ詳細比較",
    readyTitle: "次世代の体験を始める準備はできましたか？",
    launchNow: "今すぐ体験する",
    exploreSuite: "他のスイートを見る",
    archTitle: "コア・マイクロアーキテクチャ",
    viewing: "閲覧中",
    explore: "詳細を見る",
    quark: "Quark",
    aliyun: "Aliyun",
    baidu: "Baidu",
    clickToExpand: "クリックで詳細を展開",
    close: "閉じる",
    moduleAnatomy: "マイクロアーキテクチャ詳細解析",
    liveTelemetry: "リアルタイムテレメトリ監視",
    simulationOnline: "シミュレーション準備完了"
  },
  ko: {
    interactiveBtn: "인터랙티브 워크벤치",
    workshopTitle: "인터랙티브 워크벤치 · 실시간 체험",
    workshopSubtitle: "설치 불필요, 브라우저에서 핵심 엔진의 모든 상호작용을 바로 체험하세요.",
    specsTitle: "엔진 성능 및 기술 아키텍처 사양",
    specsSubtitle: "산업 표준으로 구축되어 극대화된 처리량과 초저지연을 실현합니다.",
    comparisonTitle: "아키텍처 심층 비교",
    readyTitle: "차세대 경험을 시작할 준비가 되셨습니까?",
    launchNow: "지금 시작하기",
    exploreSuite: "전체 제품군 탐색",
    archTitle: "핵심 마이크로 아키텍처",
    viewing: "현재 보기",
    explore: "자세히 보기",
    quark: "Quark",
    aliyun: "Aliyun",
    baidu: "Baidu",
    clickToExpand: "클릭하여 전체 구조 확장",
    close: "닫기",
    moduleAnatomy: "마이크로 아키텍처 심층 해부",
    liveTelemetry: "실시간 원격 측정 및 데이터 흐름",
    simulationOnline: "시뮬레이션 엔진 준비 완료"
  },
  es: {
    interactiveBtn: "Taller Interactivo",
    workshopTitle: "Taller Interactivo · En Vivo",
    workshopSubtitle: "Sin instalación previa. Experimente los flujos interactivos directamente en el navegador.",
    specsTitle: "Rendimiento del Motor y Especificaciones",
    specsSubtitle: "Construido según estándares industriales para máximo rendimiento y latencia mínima.",
    comparisonTitle: "Comparación Detallada de Arquitectura",
    readyTitle: "¿Listo para la próxima generación?",
    launchNow: "Iniciar Ahora",
    exploreSuite: "Explorar la Suite Completa",
    archTitle: "Microarquitecturas Centrales",
    viewing: "Viendo",
    explore: "Ver detalles",
    quark: "Quark",
    aliyun: "Aliyun",
    baidu: "Baidu",
    clickToExpand: "Clic para expandir arquitectura",
    close: "Cerrar",
    moduleAnatomy: "Anatomía de Microarquitectura",
    liveTelemetry: "Telemetría y Flujo de Datos en Vivo",
    simulationOnline: "Motor de Simulación En Línea"
  },
  fr: {
    interactiveBtn: "Atelier Interactif",
    workshopTitle: "Atelier Interactif · Prise en Main",
    workshopSubtitle: "Sans installation. Testez les flux interactifs complets directement dans votre navigateur.",
    specsTitle: "Performances du Moteur et Spécifications",
    specsSubtitle: "Conçu selon les normes industrielles pour un débit maximal et une latence ultra-faible.",
    comparisonTitle: "Comparaison Approfondie de l'Architecture",
    readyTitle: "Prêt pour la nouvelle génération ?",
    launchNow: "Lancer Maintenant",
    exploreSuite: "Explorer Toute la Suite",
    archTitle: "Micro-Architectures Clés",
    viewing: "Affichage",
    explore: "Explorer",
    quark: "Quark",
    aliyun: "Aliyun",
    baidu: "Baidu",
    clickToExpand: "Cliquer pour agrandir l'architecture",
    close: "Fermer",
    moduleAnatomy: "Anatomie de la Micro-Architecture",
    liveTelemetry: "Télémétrie & Flux de Données en Direct",
    simulationOnline: "Moteur de Simulation Prêt"
  },
  de: {
    interactiveBtn: "Interaktive Werkbank",
    workshopTitle: "Interaktive Werkbank",
    workshopSubtitle: "Keine Installation erforderlich. Testen Sie den interaktiven Workflow direkt im Browser.",
    specsTitle: "Engine-Performance & Spezifikationen",
    specsSubtitle: "Nach Industriestandards entwickelt für maximalen Durchsatz und minimale Latenz.",
    comparisonTitle: "Detaillierter Architektur-Vergleich",
    readyTitle: "Bereit für die nächste Generation?",
    launchNow: "Jetzt Starten",
    exploreSuite: "Gesamte Suite entdecken",
    archTitle: "Kern-Mikroarchitekturen",
    viewing: "Aktuell",
    explore: "Details ansehen",
    quark: "Quark",
    aliyun: "Aliyun",
    baidu: "Baidu",
    clickToExpand: "Klicken zum Vergrößern der Architektur",
    close: "Schließen",
    moduleAnatomy: "Detaillierte Mikroarchitektur-Analyse",
    liveTelemetry: "Echtzeit-Telemetrie & Datenstrom",
    simulationOnline: "Simulations-Engine bereit"
  },
  el: {
    interactiveBtn: "Διαδραστικό Εργαστήριο",
    workshopTitle: "Διαδραστικό Εργαστήριο · Άμεση Εμπειρία",
    workshopSubtitle: "Χωρίς εγκατάσταση. Δοκιμάστε τις πλήρεις ροές εργασίας στο πρόγραμμα περιήγησης.",
    specsTitle: "Απόδοση & Τεχνικές Προδιαγραφές",
    specsSubtitle: "Κατασκευασμένο με βιομηχανικά πρότυπα για μέγιστη απόδοση και ελάχιστη καθυστέρηση.",
    comparisonTitle: "Σύγκριση Αρχιτεκτονικής",
    readyTitle: "Έτοιμοι για την επόμενη γενιά;",
    launchNow: "Εκκίνηση Τώρα",
    exploreSuite: "Εξερευνήστε Όλη τη Σουίτα",
    archTitle: "Βασικές Μικροαρχιτεκτονικές",
    viewing: "Προβολή",
    explore: "Εξερεύνηση",
    quark: "Quark",
    aliyun: "Aliyun",
    baidu: "Baidu",
    clickToExpand: "Κάντε κλικ για ανάπτυξη αρχιτεκτονικής",
    close: "Κλείσιμο",
    moduleAnatomy: "Ανατομία Μικροαρχιτεκτονικής",
    liveTelemetry: "Ζωντανή Τηλεμετρία & Ροή Δεδομένων",
    simulationOnline: "Μηχανή Προσομοίωσης Έτοιμη"
  }
};

