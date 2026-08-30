import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  ArrowLeft,
  Search, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Languages, 
  Sliders, 
  Cpu, 
  TrendingUp, 
  Shield, 
  Activity, 
  Lock, 
  MessageSquare, 
  FileText,
  Database,
  Terminal,
  ArrowRight,
  CheckCircle2,
  HardDrive,
  Globe2,
  KeyRound,
  FileCode2,
  Radio,
  Binary,
  GitBranch,
  Volume2,
  Orbit,
  Network,
  Maximize2,
  Film,
  Sparkle,
  Check,
  Award,
  BarChart3,
  Flame,
  Fingerprint,
  RefreshCw,
  PlayCircle,
  Eye,
  Server,
  Share2,
  ChevronRight,
  Compass,
  Laptop,
  CheckCircle,
  Play,
  Pause,
  AlertTriangle,
  Clock,
  ExternalLink,
  Layers2,
  X
} from 'lucide-react';
import { useTheme } from '../App';
import { showcaseData, ShowcaseProduct } from '../src/data/showcases';
import { 
  DEEP_DIVE_TRANSLATIONS, 
  STAGE_TRANSLATIONS, 
  SHOWCASE_PAGE_UI_TRANSLATIONS 
} from '../src/data/showcaseTranslations';
import { 
  PansouWorkstation, 
  ReadingProWorkbench, 
  AIAgentTerminal, 
  GongPanChatMessenger 
} from './ProductWorkstations';
import { BetaApplyModal } from './BetaApplyModal';

// Normalized category matcher
const normalizeCategoryId = (rawId: string | undefined): string => {
  if (!rawId) return 'pansou';
  const clean = rawId.toLowerCase().trim();
  if (['pansou', 'pan', 'search', 'resource', 'wangpan'].includes(clean)) return 'pansou';
  if (['reading-pro', 'readingpro', 'reading', 'journal', 'waikan'].includes(clean)) return 'reading-pro';
  if (['ai-agent', 'ai', 'agent', 'invest', 'quant'].includes(clean)) return 'ai-agent';
  if (['chat', 'gongpan-chat', 'im', 'telegram', 'messenger'].includes(clean)) return 'chat';
  return showcaseData[clean] ? clean : 'pansou';
};

// High-definition lightweight fallback hero assets (WebP/Auto-compressed)
const FALLBACK_HERO_IMAGES: Record<string, string> = {
  pansou: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=960&q=75&auto=format&fit=crop',
  'reading-pro': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=960&q=75&auto=format&fit=crop',
  'ai-agent': 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=960&q=75&auto=format&fit=crop',
  chat: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=960&q=75&auto=format&fit=crop',
};

// Icon Map Resolver
const renderIcon = (iconName: string, className = 'w-5 h-5') => {
  switch (iconName) {
    case 'Search': return <Search className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'Languages': return <Languages className={className} />;
    case 'Sliders': return <Sliders className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Lock': return <Lock className={className} />;
    case 'MessageSquare': return <MessageSquare className={className} />;
    case 'FileText': return <FileText className={className} />;
    default: return <Sparkles className={className} />;
  }
};

// Benchmark comparison mapping matrix for each product
const COMPARISON_MAP: Record<string, Record<string, Array<{ dimension: string; traditional: string; ours: string }>>> = {
  pansou: {
    zh: [
      { dimension: '多盘聚合覆盖', traditional: '单网盘分散搜索，重复多次跳转', ours: '全网主流网盘一次秒级索引匹配' },
      { dimension: '链接存活健康度', traditional: '大量失效死链、套路引流公众号', ours: '全天候智能健康嗅探，100% 存活率' },
      { dimension: '画质与体验', traditional: '转码模糊劣质、层层广告弹窗', ours: '4K HDR / 原画无损直存，纯净无广告' },
      { dimension: '响应与吞吐', traditional: '页面加载卡顿 3~5 秒', ours: '0.08 秒毫秒级异步调度' },
    ],
    en: [
      { dimension: 'Cloud Coverage', traditional: 'Fragmented searches across single drives', ours: 'Unified multi-cloud aggregation in 1 query' },
      { dimension: 'Link Health', traditional: 'Frequent dead links and spam popups', ours: 'Automated 100% live resource validation' },
      { dimension: 'Video Quality', traditional: 'Compressed low-res re-encodes', ours: '4K HDR & Lossless original bitrates' },
      { dimension: 'Query Latency', traditional: '3 to 5 seconds delayed response', ours: '0.08s ultra-low latency response' },
    ],
    ja: [
      { dimension: 'クラウド網羅性', traditional: '個別ドライブでの手動検索とリダイレクト', ours: '主要クラウドの一括統合検索' },
      { dimension: 'リンクの有効性', traditional: '期限切れリンクや誘導スパム', ours: 'リアルタイム検証による高生存率' },
      { dimension: '画質と体験', traditional: '再エンコードによる劣化と広告ポップアップ', ours: '4K HDR / 原画無劣化ダイレクト保存' },
      { dimension: '応答速度', traditional: '3〜5秒の読み込み待機', ours: '0.08秒の超低遅延レスポンス' },
    ],
    ko: [
      { dimension: '클라우드 통합성', traditional: '개별 드라이브 분산 검색 및 반복 접속', ours: '주요 클라우드 1회 검색 즉시 매칭' },
      { dimension: '링크 유효성', traditional: '만료된 링크 및 스팸 유도', ours: '실시간 상태 감지로 100% 유효 리소스 보장' },
      { dimension: '화질 및 환경', traditional: '압축 손실 저화질 및 광고 팝업', ours: '4K HDR 무손실 원본 직행 저장' },
      { dimension: '응답 속도', traditional: '3~5초 로딩 지연', ours: '0.08초 초저지연 응답' },
    ],
    es: [
      { dimension: 'Cobertura Multinube', traditional: 'Búsquedas dispersas en nubes individuales', ours: 'Agregación unificada en una sola consulta' },
      { dimension: 'Salud de Enlaces', traditional: 'Enlaces caídos frecuentes y publicidad', ours: 'Validación automatizada en tiempo real' },
      { dimension: 'Calidad de Video', traditional: 'Baja resolución y compresión', ours: '4K HDR y tasa de bits original' },
      { dimension: 'Latencia', traditional: 'Respuestas lentas de 3 a 5 segundos', ours: '0.08s de respuesta ultrarrápida' },
    ],
    fr: [
      { dimension: 'Couverture Cloud', traditional: 'Recherches isolées sur chaque service', ours: 'Agrégation multi-cloud en une seule requête' },
      { dimension: 'Validité des Liens', traditional: 'Liens morts et publicités intempestives', ours: 'Validation continue des ressources' },
      { dimension: 'Qualité Vidéo', traditional: 'Fichiers compressés de basse qualité', ours: '4K HDR et débit original sans perte' },
      { dimension: 'Temps de Réponse', traditional: '3 à 5 secondes de délai', ours: '0.08s de réponse ultra-rapide' },
    ],
    de: [
      { dimension: 'Cloud-Abdeckung', traditional: 'Verteilte Suche über einzelne Anbieter', ours: 'Zentralisierte Abfrage aller Cloud-Dienste' },
      { dimension: 'Link-Gültigkeit', traditional: 'Häufig tote Links und Werbung', ours: 'Automatische Echtzeit-Verifikation' },
      { dimension: 'Qualität', traditional: 'Niedrige Auflösung durch Neukomprimierung', ours: '4K HDR & Original-Bitrate ohne Verluste' },
      { dimension: 'Reaktionszeit', traditional: '3 bis 5 Sekunden Ladezeit', ours: '0.08s blitzschnelle Antwort' },
    ],
    el: [
      { dimension: 'Κάλυψη Cloud', traditional: 'Διασκορπισμένη αναζήτηση ανά πλατφόρμα', ours: 'Ενιαία συγκέντρωση πολλαπλών cloud' },
      { dimension: 'Εγκυρότητα Συνδέσμων', traditional: 'Συχνοί ανενεργοί σύνδεσμοι και διαφημίσεις', ours: 'Αυτοματοποιημένος έλεγχος διαθεσιμότητας' },
      { dimension: 'Ποιότητα Βίντεο', traditional: 'Συμπιεσμένα αρχεία χαμηλής ανάλυσης', ours: '4K HDR και αρχική ποιότητα χωρίς απώλειες' },
      { dimension: 'Ταχύτητα Απόκρισης', traditional: '3 έως 5 δευτερόλεπτα καθυστέρηση', ours: '0.08s αστραπιαία απόκριση' },
    ],
  },
  'reading-pro': {
    zh: [
      { dimension: '排版沉浸感', traditional: '生硬机翻，段落排版杂乱撕裂', ours: '杂志社论排版，中英对照与呼吸行间距' },
      { dimension: 'PDF 原版渲染', traditional: '图片模糊重压缩，排版失真错位', ours: 'Canvas 矢量级高清渲染与 60 FPS 翻页' },
      { dimension: '语法深度解析', traditional: '单一词典解释，无长难句解析', ours: '句法树拆解与雅思/考研核心语料归纳' },
      { dimension: '背景知识拓展', traditional: '孤立词汇，缺乏文化背景注释', ours: '专业政治、经济与社论深度背景注解' },
    ],
    en: [
      { dimension: 'Typography & Layout', traditional: 'Clunky machine translation & split layouts', ours: 'Editorial journal typography with dual-pane' },
      { dimension: 'Original PDF Engine', traditional: 'Compressed blur and broken page structures', ours: 'Canvas vector rendering & 60 FPS page turns' },
      { dimension: 'Syntax Analysis', traditional: 'Basic dictionary popups without context', ours: 'Grammar tree breakdown & exam idioms' },
      { dimension: 'Contextual Insight', traditional: 'Isolated words lacking background', ours: 'Deep journalistic & macroeconomic annotations' },
    ],
    ja: [
      { dimension: 'タイポグラフィと組版', traditional: '不自然な機械翻訳とレイアウト崩れ', ours: '一流誌の編集組版と洗练された二言語対照' },
      { dimension: 'PDF 原本レンダリング', traditional: '低解像度な再圧縮と崩れたページ構造', ours: 'Canvas ベクター高解像度描画と高速ページ送り' },
      { dimension: '構文・文法解析', traditional: '単語の意味のみで長文解説なし', ours: '構文木の可視化と重要学術コロケーション整理' },
      { dimension: '背景知識の解説', traditional: '単語単体の意味のみで文脈解説なし', ours: '国際情勢・経済動向に即した詳細な注釈' },
    ],
    ko: [
      { dimension: '타이포그래피 및 레이아웃', traditional: '부자연스러운 기계 번역 및 흐트러진 정렬', ours: '정통 저널 편집 스타일과 완벽한 대조 레이아웃' },
      { dimension: '원판 PDF 렌더링', traditional: '화질 저하 및 왜곡된 서식', ours: 'Canvas 벡터 고화질 렌더링 및 60 FPS 페이지 전환' },
      { dimension: '심층 구문 분석', traditional: '단편적 단어 풀이', ours: '문법 트리 시각화 및 주요 시험 핵심 어휘 정리' },
      { dimension: '배경지식 확장', traditional: '맥락 없는 단순 번역', ours: '정치, 경제, 사회 심층 배경지식 주석 제공' },
    ],
    es: [
      { dimension: 'Tipografía y Diseño', traditional: 'Traducciones mecánicas y diseño roto', ours: 'Diseño editorial con vista bilingüe optimizada' },
      { dimension: 'Motor PDF Vectorial', traditional: 'Compresión borrosa y maquetación rota', ours: 'Renderizado vectorial Canvas a 60 FPS' },
      { dimension: 'Análisis Sintáctico', traditional: 'Definiciones aisladas sin contexto', ours: 'Desglose de árboles gramaticales y modismos' },
      { dimension: 'Anotaciones Culturales', traditional: 'Falta de contexto geopolítico', ours: 'Profundas notas macroeconómicas y culturales' },
    ],
    fr: [
      { dimension: 'Typographie & Mise en page', traditional: 'Traductions rigides et mise en page éclatée', ours: 'Mise en page éditoriale bilingue soignée' },
      { dimension: 'Moteur de Rendu PDF', traditional: 'Compression floue et structure altérée', ours: 'Rendu vectoriel Canvas fluide à 60 FPS' },
      { dimension: 'Analyse Syntaxique', traditional: 'Dictionnaire basique sans mise en contexte', ours: 'Arbre syntaxique et expressions idiomatiques' },
      { dimension: 'Enrichissement Contextuel', traditional: 'Mots isolés sans mise en perspective', ours: 'Notes économiques et politiques approfondies' },
    ],
    de: [
      { dimension: 'Typografie & Layout', traditional: 'Hölzerne Übersetzung und unübersichtliches Layout', ours: 'Professionelles Zeitschriften-Layout mit zweisprachiger Ansicht' },
      { dimension: 'Original PDF-Rendering', traditional: 'Unscharfe Komprimierung und verzerrte Seiten', ours: 'Canvas Vektor-Rendering mit flüssigen 60 FPS' },
      { dimension: 'Satzstruktur-Analyse', traditional: 'Einfache Wörterbuch-Einträge ohne Kontext', ours: 'Grammatik-Strukturbaum und Prüfungswortschatz' },
      { dimension: 'Kontextwissen', traditional: 'Isolierte Begriffe ohne Hintergrund', ours: 'Umfassende wirtschaftliche und politische Anmerkungen' },
    ],
    el: [
      { dimension: 'Τυπογραφία & Διάταξη', traditional: 'Άκαμπτη αυτόματη μετάφραση και κακή διάταξη', ours: 'Εκδοτική διάταξη περιοδικού με δίγλωσση προβολή' },
      { dimension: 'Μηχανή PDF Υψηλής Ανάλυσης', traditional: 'Θολή συμπίεση και παραμορφωμένη σελιδοποίηση', ours: 'Απόδοση διανυσμάτων Canvas με 60 FPS' },
      { dimension: 'Συντακτική Ανάλυση', traditional: 'Βασικό λεξικό χωρίς ανάλυση προτάσεων', ours: 'Οπτικό συντακτικό δέντρο και ακαδημαϊκό λεξιλόγιο' },
      { dimension: 'Επεξηγηματικές Σημειώσεις', traditional: 'Μεμονωμένες λέξεις χωρίς υπόβαθρο', ours: 'Βαθιές σημειώσεις μακροοικονομικού πλαισίου' },
    ],
  },
  'ai-agent': {
    zh: [
      { dimension: '多因子量化分析', traditional: '依赖单一技术指标与主观情绪', ours: '128+ 量化因子并行运算与多维度回测' },
      { dimension: '研报深度提炼', traditional: '人工阅读耗时数小时且容易遗漏', ours: '万份研报秒级知识图谱提炼与核心提纯' },
      { dimension: '风控熔断机制', traditional: '止损滞后，缺乏动态仓位控制', ours: '毫秒级动态风控监控与智能止损建议' },
      { dimension: '历史回测验证', traditional: '样本偏差大，缺乏实盘模拟', ours: '10 年历史数据全景穿透与夏普比率检验' },
    ],
    en: [
      { dimension: 'Multi-factor Quant', traditional: 'Single indicators & emotional trading', ours: '128+ parallel quantitative factors' },
      { dimension: 'Research Digest', traditional: 'Hours of manual report reading', ours: 'Instant synthesis of thousands of filings' },
      { dimension: 'Risk Control', traditional: 'Delayed stop-loss & poor sizing', ours: 'Millisecond dynamic risk circuit breaker' },
      { dimension: 'Backtesting Rigor', traditional: 'Overfitted curves without realism', ours: '10-year deep historical backtest & Sharpe test' },
    ],
    ja: [
      { dimension: 'マルチファクター分析', traditional: '単一指標と主観的感情への依存', ours: '128以上のファクター並列演算と多次元分析' },
      { dimension: 'レポートの要約', traditional: '何時間もの手作業による精読', ours: '大量のレポートから重要事項を瞬時に要約' },
      { dimension: 'リスク遮断機能', traditional: '遅すぎる損切りと不適切なポジション管理', ours: 'ミリ秒単位のリアルタイムリスク監視' },
      { dimension: 'バックテスト検証', traditional: '過剰適合による非現実的なモデル', ours: '10年間の履歴データ検証と高シャープレシオ' },
    ],
    ko: [
      { dimension: '멀티 팩터 퀀트 분석', traditional: '단일 지표 및 감정적 매매 의존', ours: '128개 이상의 정량 팩터 병렬 연산 및 다차원 분석' },
      { dimension: '리포트 핵심 요약', traditional: '수 시간의 수동 분석 및 정보 누락', ours: '수만 건의 보고서 실시간 지식 그래프 요약' },
      { dimension: '리스크 서킷브레이커', traditional: '지연된 손절 및 포지션 조절 부재', ours: '밀리초 단위 실시간 리스크 감지 및 손절 제안' },
      { dimension: '백테스팅 검증력', traditional: '과적합 및 비현실적인 수익률 모델', ours: '10개년 전주기 실증 데이터 및 샤프 지수 검증' },
    ],
    es: [
      { dimension: 'Análisis Multifactorial', traditional: 'Indicadores simples y sesgo emocional', ours: 'Más de 128 factores cuantitativos en paralelo' },
      { dimension: 'Síntesis de Informes', traditional: 'Lectura manual de varias horas', ours: 'Extracción instantánea de miles de informes' },
      { dimension: 'Control de Riesgo', traditional: 'Stop-loss tardío sin gestión de posición', ours: 'Disyuntor de riesgo dinámico en milisegundos' },
      { dimension: 'Backtesting Riguroso', traditional: 'Curvas sobreajustadas poco realistas', ours: 'Prueba histórica profunda de 10 años y Sharpe ratio' },
    ],
    fr: [
      { dimension: 'Analyse Multi-Facteurs', traditional: 'Indicateurs isolés et trading émotionnel', ours: 'Plus de 128 facteurs quantitatifs parallèles' },
      { dimension: 'Synthèse d\'Analyses', traditional: 'Heures de lecture manuelle fastidieuse', ours: 'Synthèse immédiate de milliers de rapports' },
      { dimension: 'Contrôle du Risque', traditional: 'Stop-loss différé et mauvaise gestion', ours: 'Coupe-circuit dynamique en millisecondes' },
      { dimension: 'Rigueur du Backtest', traditional: 'Surapprentissage sans réalisme de marché', ours: 'Backtest historique sur 10 ans et ratio de Sharpe' },
    ],
    de: [
      { dimension: 'Multi-Faktor-Analyse', traditional: 'Einzelne Indikatoren und emotionale Trades', ours: '128+ parallele quantitative Faktoren' },
      { dimension: 'Berichtsauswertung', traditional: 'Stundenlange manuelle Lektüre', ours: 'Echtzeit-Synthese tausender Marktberichte' },
      { dimension: 'Risikokontrolle', traditional: 'Verzögerter Stop-Loss und starre Größen', ours: 'Millisekunden-genaue Risikoüberwachung' },
      { dimension: 'Backtesting-Präzision', traditional: 'Überanpassung ohne praktische Relevanz', ours: '10-Jahres-Backtest und verifizierte Sharpe-Ratio' },
    ],
    el: [
      { dimension: 'Ποσοτική Ανάλυση', traditional: 'Μεμονωμένοι δείκτες και συναισθηματικές συναλλαγές', ours: '128+ παράλληλοι ποσοτικοί παράγοντες' },
      { dimension: 'Σύνοψη Εκθέσεων', traditional: 'Ώρες χειροκίνητης ανάγνωσης αναφορών', ours: 'Άμεση σύνθεση χιλιάδων εκθέσεων αγοράς' },
      { dimension: 'Έλεγχος Κινδύνου', traditional: 'Καθυστερημένο stop-loss και ανεπαρκές μέγεθος', ours: 'Δυναμικός διακόπτης κινδύνου σε χιλιοστά του δευτερολέπτου' },
      { dimension: 'Αξιοπιστία Ελέγχου', traditional: 'Υπερπροσαρμοσμένα μη ρεαλιστικά μοντέλα', ours: 'Ιστορικός έλεγχος 10 ετών και έλεγχος Sharpe' },
    ],
  },
  chat: {
    zh: [
      { dimension: '数据私密性', traditional: '明文存储在中心服务器，易被检索', ours: '256位端到端加密，零知识私钥硬件隔离' },
      { dimension: '消息即焚机制', traditional: '保留历史记录，存在截屏风险', ours: '阅后即焚、防截屏与双向双端擦除' },
      { dimension: '通信延迟与连通', traditional: '跨境延迟高，经常连接中断', ours: '分布式全球中继节点，毫秒级快速握手' },
      { dimension: '匿名性与追踪', traditional: '强制绑定过多实名社交关联', ours: '零知识身份体系，保护用户隐私' },
    ],
    en: [
      { dimension: 'Privacy & Storage', traditional: 'Plaintext logs on centralized servers', ours: '256-bit E2EE with zero-knowledge vault' },
      { dimension: 'Ephemeral Messaging', traditional: 'Permanent logs vulnerable to capture', ours: 'Burn-after-reading & anti-screenshot wipe' },
      { dimension: 'Connection Speed', traditional: 'High latency and frequent disconnects', ours: 'Global distributed relay with sub-second handshake' },
      { dimension: 'Anonymity', traditional: 'Mandatory social graph tracking', ours: 'Zero-knowledge identity and anonymous sessions' },
    ],
    ja: [
      { dimension: 'プライバシーと保存', traditional: '中央サーバーに平文ログを保管', ours: '256ビットE2EEと端末ハードウェア鍵隔離' },
      { dimension: 'メッセージ消滅', traditional: '履歴が残りスクリーンショットのリスクあり', ours: '閲覧後消滅タイマーと双方向の完全消去' },
      { dimension: '通信速度と接続性', traditional: '高遅延で接続が途切れやすい', ours: 'グローバル分散中継ノードによる高速通信' },
      { dimension: '匿名性と追跡防止', traditional: '個人情報やSNS連携の強制紐付け', ours: 'ゼロ知識ID体系による完全なプライバシー保護' },
    ],
    ko: [
      { dimension: '데이터 프라이버시', traditional: '중앙 서버 평문 저장 및 검색 위험', ours: '256비트 E2EE 및 하드웨어 키 격리' },
      { dimension: '메시지 자동 파기', traditional: '영구 보관 및 캡처 위험 노출', ours: '열람 후 즉시 파기 및 양방향 흔적 삭제' },
      { dimension: '통신 지연 및 연결', traditional: '높은 해외 지연 및 잦은 끊김', ours: '글로벌 분산 릴레이를 통한 밀리초 핸드셰이크' },
      { dimension: '익명성 및 추적 방지', traditional: '과도한 실명 및 소셜 연동 강제', ours: '영지식 신원 체계로 개인정보 철저 보호' },
    ],
    es: [
      { dimension: 'Privacidad y Almacenamiento', traditional: 'Registros en texto plano en servidores centrales', ours: 'Cifrado E2EE de 256 bits con aislamiento en hardware' },
      { dimension: 'Mensajes Efímeros', traditional: 'Historial permanente vulnerable a capturas', ours: 'Autodestrucción y borrado seguro bidireccional' },
      { dimension: 'Velocidad de Conexión', traditional: 'Alta latencia y desconexiones frecuentes', ours: 'Nodos de retransmisión global con conexión en milisegundos' },
      { dimension: 'Anonimato', traditional: 'Rastreo obligatorio de datos de identidad', ours: 'Identidad de conocimiento cero y sesiones anónimas' },
    ],
    fr: [
      { dimension: 'Confidentialité & Stockage', traditional: 'Journaux en clair sur serveurs centraux', ours: 'Chiffrement E2EE 256 bits et isolation matérielle' },
      { dimension: 'Messages Éphémères', traditional: 'Historique persistant exposé aux captures', ours: 'Minuteur d\'autodestruction et effacement bilatéral' },
      { dimension: 'Rapidité de Connexion', traditional: 'Forte latence et coupures fréquentes', ours: 'Relais mondiaux distribués avec négociation instantanée' },
      { dimension: 'Anonymat', traditional: 'Traçage imposé de l\'identité de l\'utilisateur', ours: 'Architecture à connaissance nulle sans pistage' },
    ],
    de: [
      { dimension: 'Datenschutz & Speicherung', traditional: 'Klartext-Logs auf zentralen Servern', ours: '256-Bit E2EE mit Hardware-Schlüssel-Isolation' },
      { dimension: 'Vergängliche Nachrichten', traditional: 'Permanente Speicherung mit Screenshot-Risiko', ours: 'Selbstzerstörung und beidseitiges Rückstandsloses Löschen' },
      { dimension: 'Verbindungsgeschwindigkeit', traditional: 'Hohe Latenzen und Verbindungsabbrüche', ours: 'Weltweite Relais-Knoten mit Millisekunden-Handshake' },
      { dimension: 'Anonymität', traditional: 'Erzwungene Verknüpfung von Identitätsdaten', ours: 'Zero-Knowledge-Identitätssystem für vollständige Privatsphäre' },
    ],
    el: [
      { dimension: 'Απόρρητο Δεδομένων', traditional: 'Αρχεία απλού κειμένου σε κεντρικούς διακομιστές', ours: 'Κρυπτογράφηση 256-bit E2EE με απομόνωση υλικού' },
      { dimension: 'Εφήμερα Μηνύματα', traditional: 'Μόνιμο ιστορικό με κίνδυνο στιγμιότυπων', ours: 'Αυτοκαταστροφή μηνυμάτων και αμφίδρομη διαγραφή' },
      { dimension: 'Ταχύτητα Σύνδεσης', traditional: 'Υψηλή καθυστέρηση και συχνές διακοπές', ours: 'Παγκόσμιοι κόμβοι αναμετάδοσης με άμεση σύνδεση' },
      { dimension: 'Ανωνυμία', traditional: 'Υποχρεωτική καταγραφή στοιχείων χρήστη', ours: 'Ταυτότητα μηδενικής γνώσης και ανώνυμες συνεδρίες' },
    ],
  },
};

const CHAT_TESTING_NOTICE: Record<string, { badge: string; text: string }> = {
  zh: {
    badge: '内测状态说明',
    text: '本功能仍处于测试状态，仅受邀请用户可以注册账号'
  },
  en: {
    badge: 'BETA TESTING NOTICE',
    text: 'This feature is currently in testing; only invited users can register an account.'
  },
  ja: {
    badge: 'ベータテストのご案内',
    text: '本機能は現在テスト段階です。招待されたユーザーのみアカウントを登録できます。'
  },
  ko: {
    badge: '테스트 단계 안내',
    text: '본 기능은 현재 테스트 중이며, 초대받은 사용자만 계정을 등록할 수 있습니다.'
  },
  es: {
    badge: 'AVISO DE PRUEBA',
    text: 'Esta función está en fase de prueba; solo los usuarios invitados pueden registrarse.'
  },
  fr: {
    badge: 'AVIS DE PHASE BÊTA',
    text: 'Cette fonctionnalité est en phase de test ; seuls les utilisateurs invités peuvent créer un compte.'
  },
  de: {
    badge: 'BETA-HINWEIS',
    text: 'Diese Funktion befindet sich in der Testphase; nur eingeladene Benutzer können ein Konto registrieren.'
  },
  el: {
    badge: 'ΕΙΔΟΠΟΙΗΣΗ ΔΟΚΙΜΗΣ',
    text: 'Αυτή η λειτουργία είναι σε δοκιμαστική φάση. Μόνο προσκεκλημένοι χρήστες μπορούν να εγγραφούν.'
  }
};

export const ProductShowcase: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { themeMode, language, showToast, pansouEnabled } = useTheme();
  const isDark = themeMode === 'dark';

  const categoryId = normalizeCategoryId(id);

  // Safe product data lookup
  const rawProduct = showcaseData[categoryId];
  const product: ShowcaseProduct = (rawProduct && rawProduct[language])
    ? rawProduct[language]
    : (rawProduct?.zh || rawProduct?.en || showcaseData.pansou.zh);

  const stageT = STAGE_TRANSLATIONS[language] || STAGE_TRANSLATIONS.zh;
  const pageUiT = SHOWCASE_PAGE_UI_TRANSLATIONS[language] || SHOWCASE_PAGE_UI_TRANSLATIONS.zh;

  const targetHeroImg = product.heroImage || FALLBACK_HERO_IMAGES[categoryId] || FALLBACK_HERO_IMAGES.pansou;
  const [imgLoaded, setImgLoaded] = useState(true);
  const [heroImgSrc, setHeroImgSrc] = useState(targetHeroImg);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [betaApplyModalOpen, setBetaApplyModalOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const nextSrc = product.heroImage || FALLBACK_HERO_IMAGES[categoryId] || FALLBACK_HERO_IMAGES.pansou;
    if (nextSrc !== heroImgSrc) {
      setHeroImgSrc(nextSrc);
      setImgLoaded(false);
    } else {
      setImgLoaded(true);
    }
  }, [categoryId, language, product.heroImage, heroImgSrc]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setImgLoaded(true);
    }
  }, [heroImgSrc]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Section tracking refs
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const philRef = useRef<HTMLDivElement>(null);
  const deepDiveRef = useRef<HTMLDivElement>(null);
  const anatomyRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<HTMLDivElement>(null);
  const specRef = useRef<HTMLDivElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
  const suiteRef = useRef<HTMLDivElement>(null);

  const handleBackToHome = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigate('/');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [categoryId]);

  // Handle ESC key to smooth return
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleBackToHome();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Handle CTA Action
  const handleVisit = () => {
    if (product.requiresPansouCheck && !pansouEnabled) {
      showToast(language === 'zh' ? '因政策原因暂停服务' : 'Service suspended due to policy');
      return;
    }

    if (product.isExternal) {
      window.location.href = product.targetUrl;
    } else {
      navigate(product.targetUrl);
    }
  };

  // ---------------------------------------------------------------------------
  // 1. GLOBAL SCROLL PROGRESS BAR (FLOWING IRIDESCENT STREAM & SMOOTH PHYSICS)
  // ---------------------------------------------------------------------------
  const { scrollYProgress: globalScrollYProgress } = useScroll();
  const globalProgress = useSpring(globalScrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  // ---------------------------------------------------------------------------
  // 2. HERO CONTINUOUS FLUID SCROLL PARALLAX (Prompt Responsive & High Amplitude)
  // ---------------------------------------------------------------------------
  const { scrollY } = useScroll();
  const heroTiltSmooth = useSpring(scrollY, { stiffness: 110, damping: 20, mass: 0.2 });
  const heroRotateX = useTransform(heroTiltSmooth, [0, 320], [32, 0]);
  const heroScale = useTransform(heroTiltSmooth, [0, 320], [0.76, 1.0]);
  const heroTranslateY = useTransform(heroTiltSmooth, [0, 320], [75, -25]);

  // ---------------------------------------------------------------------------
  // 3. PHILOSOPHY RIBBON DYNAMIC EXPANSION
  // ---------------------------------------------------------------------------
  const { scrollYProgress: philProgress } = useScroll({
    target: philRef,
    offset: ["start 95%", "start 35%"]
  });
  const philSmooth = useSpring(philProgress, { stiffness: 85, damping: 18, mass: 0.3 });
  const philScale = useTransform(philSmooth, [0, 1], [0.82, 1.0]);
  const philOpacity = useTransform(philSmooth, [0, 0.4, 1], [0.15, 0.85, 1]);
  const philY = useTransform(philSmooth, [0, 1], [50, 0]);

  // ---------------------------------------------------------------------------
  // 4. BESPOKE DEEP DIVE SECTION (1:1 DIRECT SCROLL PARALLAX)
  // ---------------------------------------------------------------------------
  const { scrollYProgress: deepProgress } = useScroll({
    target: deepDiveRef,
    offset: ["start 90%", "center 48%"]
  });
  const deepOpacity = useTransform(deepProgress, [0, 0.35], [0.2, 1]);

  // Pansou dynamic continuous scroll transforms (High Amplitude)
  const pansouCinemaX = useTransform(deepProgress, [0, 1], [-65, 0]);
  const pansouCinemaScale = useTransform(deepProgress, [0, 1], [0.85, 1.0]);
  const pansouCinemaRotate = useTransform(deepProgress, [0, 1], [-8, 0]);
  const pansouFilmReelX = useTransform(deepProgress, [0, 1], [130, 0]);
  const pansouApertureRotate = useTransform(deepProgress, [0, 1], [-360, 0]);
  const pansouRightStackX = useTransform(deepProgress, [0, 1], [65, 0]);
  const pansouRightStackScale = useTransform(deepProgress, [0, 1], [0.85, 1.0]);

  // Reading Pro continuous 3-column magazine book fold & golden highlight scrubber
  const readCol1X = useTransform(deepProgress, [0, 1], [-65, 0]);
  const readCol1Rotate = useTransform(deepProgress, [0, 1], [12, 0]);
  const readCol2Y = useTransform(deepProgress, [0, 1], [55, 0]);
  const readCol2Scale = useTransform(deepProgress, [0, 1], [0.85, 1.0]);
  const readCol3X = useTransform(deepProgress, [0, 1], [65, 0]);
  const readCol3Rotate = useTransform(deepProgress, [0, 1], [-12, 0]);
  const readHighlightWidth = useTransform(deepProgress, [0, 0.85], ["0%", "100%"]);

  // AI Agent continuous quant terminal expansion & K-line chart drawing
  const aiBlock1X = useTransform(deepProgress, [0, 1], [-55, 0]);
  const aiBlock2Y = useTransform(deepProgress, [0, 1], [50, 0]);
  const aiBlock3Y = useTransform(deepProgress, [0, 1], [50, 0]);
  const aiBlock4X = useTransform(deepProgress, [0, 1], [55, 0]);
  const aiChartPathLength = useTransform(deepProgress, [0, 0.85], [0, 1]);

  // Chat continuous hardware defense shield & cyber vault counter-rotation
  const chatVaultRing1 = useTransform(deepProgress, [0, 1], [-360, 0]);
  const chatVaultRing2 = useTransform(deepProgress, [0, 1], [360, 0]);
  const chatBlock1X = useTransform(deepProgress, [0, 1], [-60, 0]);
  const chatBlock2Y = useTransform(deepProgress, [0, 1], [55, 0]);
  const chatBlock3X = useTransform(deepProgress, [0, 1], [60, 0]);
  const chatLaserBeam = useTransform(deepProgress, [0, 1], ["0%", "100%"]);

  // ---------------------------------------------------------------------------
  // 5. FOUR CORE MICRO-ARCHITECTURE MODULES (SYNCHRONIZED EYE-LEVEL CONVERGENCE)
  // ---------------------------------------------------------------------------
  const { scrollYProgress: anatomyProgressRaw } = useScroll({
    target: anatomyRef,
    offset: ["start 90%", "center 48%"]
  });
  const anatomyProgress = useSpring(anatomyProgressRaw, { stiffness: 90, damping: 20, mass: 0.25 });

  // Direct 1:1 hardware scroll binding with high magnetic convergence
  const card0X = useTransform(anatomyProgress, [0, 1], [-65, 0]);
  const card0Y = useTransform(anatomyProgress, [0, 1], [-55, 0]);
  const card0Scale = useTransform(anatomyProgress, [0, 1], [0.82, 1.0]);
  const card0Rotate = useTransform(anatomyProgress, [0, 1], [-8, 0]);

  const card1X = useTransform(anatomyProgress, [0, 1], [65, 0]);
  const card1Y = useTransform(anatomyProgress, [0, 1], [-55, 0]);
  const card1Scale = useTransform(anatomyProgress, [0, 1], [0.82, 1.0]);
  const card1Rotate = useTransform(anatomyProgress, [0, 1], [8, 0]);

  const card2X = useTransform(anatomyProgress, [0, 1], [-65, 0]);
  const card2Y = useTransform(anatomyProgress, [0, 1], [55, 0]);
  const card2Scale = useTransform(anatomyProgress, [0, 1], [0.82, 1.0]);
  const card2Rotate = useTransform(anatomyProgress, [0, 1], [8, 0]);

  const card3X = useTransform(anatomyProgress, [0, 1], [65, 0]);
  const card3Y = useTransform(anatomyProgress, [0, 1], [55, 0]);
  const card3Scale = useTransform(anatomyProgress, [0, 1], [0.82, 1.0]);
  const card3Rotate = useTransform(anatomyProgress, [0, 1], [-8, 0]);
  const anatomyOpacity = useTransform(anatomyProgress, [0, 0.25], [0.25, 1]);
  
  // Holographic circuit traces and central reactor gyro rotation
  const coreOrbitRotate = useTransform(anatomyProgress, [0, 1], [0, 720]);
  const laserScannerY = useTransform(anatomyProgress, [0, 1], ["0%", "100%"]);
  const laserScannerOpacity = useTransform(anatomyProgress, [0, 0.1, 0.9, 1], [0, 0.8, 0.8, 0]);

  // ---------------------------------------------------------------------------
  // 6. INTERACTIVE WORKSHOP (3D STAGE ELEVATION & INCLINE LOCK)
  // ---------------------------------------------------------------------------
  const { scrollYProgress: simProgress } = useScroll({
    target: simRef,
    offset: ["start 90%", "center 50%"]
  });
  const simRotateX = useTransform(simProgress, [0, 1], [18, 0]);
  const simScale = useTransform(simProgress, [0, 1], [0.86, 1.0]);
  const simY = useTransform(simProgress, [0, 1], [65, 0]);
  const simOpacity = useTransform(simProgress, [0, 0.35], [0.25, 1]);

  // ---------------------------------------------------------------------------
  // 7. SPECIFICATIONS & BENCHMARK MATRIX
  // ---------------------------------------------------------------------------
  const { scrollYProgress: specProgress } = useScroll({
    target: specRef,
    offset: ["start 85%", "center 50%"]
  });
  const specCard0X = useTransform(specProgress, [0, 1], [-60, 0]);
  const specCard1Y = useTransform(specProgress, [0, 1], [50, 0]);
  const specCard2Y = useTransform(specProgress, [0, 1], [50, 0]);
  const specCard3X = useTransform(specProgress, [0, 1], [60, 0]);
  const specTableScale = useTransform(specProgress, [0.1, 1], [0.86, 1.0]);
  const specTableY = useTransform(specProgress, [0.1, 1], [50, 0]);
  const specTableOpacity = useTransform(specProgress, [0.05, 0.4], [0.25, 1]);

  // ---------------------------------------------------------------------------
  // 8. FINALE PORTAL & SUITE EXPLORATION
  // ---------------------------------------------------------------------------
  const { scrollYProgress: finaleProgress } = useScroll({
    target: finaleRef,
    offset: ["start 96%", "start 35%"]
  });
  const finaleSmooth = useSpring(finaleProgress, { stiffness: 85, damping: 18, mass: 0.3 });
  const finaleBannerScale = useTransform(finaleSmooth, [0, 1], [0.86, 1.0]);
  const finaleBannerY = useTransform(finaleSmooth, [0, 1], [60, 0]);

  // Ecosystem navigation cards
  const allProducts = [
    {
      id: 'pansou',
      name: showcaseData.pansou?.[language]?.title || showcaseData.pansou?.zh?.title || '网盘影视资源搜',
      desc: showcaseData.pansou?.[language]?.heroSubheadline || showcaseData.pansou?.zh?.heroSubheadline || '毫秒级全生态网盘聚合搜索，原画直存',
      tag: 'HOT TOOL',
      themeColor: '#f59e0b',
      icon: Search,
    },
    {
      id: 'reading-pro',
      name: showcaseData['reading-pro']?.[language]?.title || showcaseData['reading-pro']?.zh?.title || '外刊精读',
      desc: showcaseData['reading-pro']?.[language]?.heroSubheadline || showcaseData['reading-pro']?.zh?.heroSubheadline || '深度解析经济学人与纽约客，双语排版',
      tag: 'LEARNING',
      themeColor: '#10b981',
      icon: BookOpen,
    },
    {
      id: 'ai-agent',
      name: showcaseData['ai-agent']?.[language]?.title || showcaseData['ai-agent']?.zh?.title || 'AI 投资智能体',
      desc: showcaseData['ai-agent']?.[language]?.heroSubheadline || showcaseData['ai-agent']?.zh?.heroSubheadline || '多因子量化分析与智能化决策建议',
      tag: 'AI FINTECH',
      themeColor: '#3b82f6',
      icon: Cpu,
    },
    {
      id: 'chat',
      name: showcaseData.chat?.[language]?.title || showcaseData.chat?.zh?.title || 'GongPan 即时聊天',
      desc: showcaseData.chat?.[language]?.heroSubheadline || showcaseData.chat?.zh?.heroSubheadline || '中国人自己的 Telegram，256位端到端加密',
      tag: 'SECURITY',
      themeColor: '#06b6d4',
      icon: MessageSquare,
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.24, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="relative min-h-screen selection:bg-blue-500/30 overflow-x-hidden font-sans pt-14 pb-32"
    >
      
      {/* Top Global Scroll Progress Bar - Flowing Iridescent Stream (流光溢彩) */}
      <motion.div 
        style={{ scaleX: globalProgress, transformOrigin: 'left' }}
        className="fixed top-14 left-0 right-0 h-[3px] z-50 pointer-events-none iridescent-stream shadow-[0_0_12px_rgba(192,132,252,0.45),_0_0_6px_rgba(56,189,248,0.4)] overflow-hidden"
      >
        {/* Soft specular light gleam overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse pointer-events-none" />
      </motion.div>

      {/* Dynamic Ambient Background Aura */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 transition-colors duration-1000"
        style={{
          background: isDark
            ? `radial-gradient(circle at 50% 8%, ${product.accentColor}22 0%, transparent 60%), radial-gradient(circle at 80% 60%, #3b82f608 0%, transparent 50%)`
            : `radial-gradient(circle at 50% 8%, ${product.accentColor}12 0%, transparent 60%), radial-gradient(circle at 80% 60%, #3b82f605 0%, transparent 50%)`
        }}
      />

      {/* High-definition Geometric Grid Blueprint */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 opacity-30"
        style={{
          backgroundImage: isDark
            ? `radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)`
            : `radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* ========================================================================= */}
      {/* 1. HERO DISPLAY HEADER: DYNAMIC VIEWPORT ADAPTIVE CENTERING               */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 min-h-[calc(100svh-3.5rem)] md:min-h-[calc(100svh-4rem)] flex flex-col items-center justify-center text-center pt-6 sm:pt-8 pb-4 sm:pb-6 select-none">
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto my-auto flex flex-col items-center justify-center text-center space-y-5 sm:space-y-7"
        >
          <div 
            className="inline-flex items-center justify-center text-center text-[11px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full border backdrop-blur-md shadow-sm mx-auto"
            style={{
              borderColor: `${product.accentColor}40`,
              backgroundColor: `${product.accentColor}15`,
              color: product.accentColor
            }}
          >
            <span>{product.tag}</span>
          </div>

          {/* If Chat Showcase: Render clear invitation & testing status banner right at the beginning */}
          {categoryId === 'chat' && (
            <div className={`w-full max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl sm:rounded-full border flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg transition-all ${
              isDark 
                ? 'bg-sky-950/50 border-sky-400/40 text-sky-200 shadow-[0_4px_24px_rgba(14,165,233,0.18)]' 
                : 'bg-sky-50/95 border-sky-300 text-sky-950 shadow-[0_4px_24px_rgba(14,165,233,0.12)]'
            }`}>
              <div className="flex items-center space-x-2.5">
                <div className="flex h-2.5 w-2.5 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-400 border border-sky-400/30 shrink-0">
                    {(CHAT_TESTING_NOTICE[language] || CHAT_TESTING_NOTICE.zh).badge}
                  </span>
                  <p className="text-xs sm:text-sm font-bold tracking-tight">
                    {(CHAT_TESTING_NOTICE[language] || CHAT_TESTING_NOTICE.zh).text}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setBetaApplyModalOpen(true)}
                className="px-3.5 py-1.5 rounded-full bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-bold text-xs shrink-0 flex items-center space-x-1.5 shadow-md shadow-sky-500/25 transition-all cursor-pointer"
              >
                <Sparkles size={13} className="text-amber-300" />
                <span>{language === 'zh' ? '申请内测资格' : 'Apply for Beta'}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}

          <h1 className="w-full text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12] max-w-4xl mx-auto px-2">
            {product.heroHeadline}
          </h1>

          <p className={`w-full text-center text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed px-2 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {product.heroSubheadline}
          </p>

          <div className="flex flex-col items-center justify-center pt-2 sm:pt-3 w-full mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <button
                onClick={() => handleVisit()}
                className={`group relative px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center space-x-2.5 transition-all duration-300 active:scale-95 shadow-2xl cursor-pointer overflow-hidden border liquid-glass ${
                  isDark 
                    ? 'liquid-glass-pill-dark text-white hover:text-white border-white/30 shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1.5px_2px_rgba(255,255,255,0.4)] hover:border-white/60 hover:shadow-[0_16px_50px_rgba(255,255,255,0.15)]' 
                    : 'liquid-glass-pill-light text-gray-900 hover:text-black border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,1)] hover:border-white hover:shadow-[0_16px_50px_rgba(0,0,0,0.14)]'
                }`}
              >
                {/* Specular fluid light reflection on top half of the glass button */}
                <div className="absolute inset-x-0 top-0 h-1/2 pointer-events-none bg-gradient-to-b from-white/40 dark:from-white/20 to-transparent" />
                
                {/* Subtle ambient accent color glow on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
                  style={{
                    background: `radial-gradient(circle at center, ${product.accentColor}25 0%, transparent 70%)`
                  }}
                />

                <span className="relative z-10 font-bold tracking-wide">{product.ctaText || pageUiT.explore}</span>
                <ArrowUpRight size={17} className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {categoryId === 'chat' && (
                <button
                  onClick={() => setBetaApplyModalOpen(true)}
                  className={`group relative px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center space-x-2.5 transition-all duration-300 active:scale-95 shadow-xl cursor-pointer overflow-hidden border ${
                    isDark
                      ? 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border-sky-400/40 hover:border-sky-300 shadow-[0_4px_24px_rgba(14,165,233,0.2)]'
                      : 'bg-sky-500 hover:bg-sky-600 text-white border-transparent shadow-lg shadow-sky-500/25'
                  }`}
                >
                  <Sparkles size={16} className="text-amber-300 animate-pulse" />
                  <span className="relative z-10 tracking-wide">{language === 'zh' ? '联系申请内测资格' : 'Apply for Beta Access'}</span>
                  <ArrowRight size={15} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              )}
            </div>

            {categoryId === 'chat' && (
              <p className={`text-[11px] sm:text-xs font-medium mt-3.5 flex items-center justify-center space-x-1.5 ${
                isDark ? 'text-sky-300/80' : 'text-sky-800/80'
              }`}>
                <span>* {(CHAT_TESTING_NOTICE[language] || CHAT_TESTING_NOTICE.zh).text}</span>
              </p>
            )}
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CONTINUOUS FLUID 3D STAGE (MINIMALIST, CLEAN & INSTANT RESPONSIVE)     */}
      {/* ========================================================================= */}
      <section ref={heroContainerRef} className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-20 [perspective:1400px] flex flex-col items-center justify-center">
        
        {/* The 3D Responsive Display Stage */}
        <motion.div
          style={{
            rotateX: heroRotateX,
            scale: heroScale,
            y: heroTranslateY,
            transformStyle: 'preserve-3d',
          }}
          className={`relative w-full aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9] min-h-[420px] sm:min-h-[460px] md:max-h-[580px] rounded-[2rem] sm:rounded-[2.8rem] p-2.5 sm:p-5 border transition-shadow duration-500 shadow-2xl ${
            isDark
              ? 'bg-black/75 border-white/20 backdrop-blur-[36px] shadow-[0_30px_100px_rgba(0,0,0,0.9),inset_0_1.5px_2px_rgba(255,255,255,0.25)]'
              : 'bg-white/70 border-white/90 backdrop-blur-[36px] shadow-[0_30px_100px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,0.95)]'
          }`}
        >
          {/* Top Liquid Glass Specular Edge */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none rounded-t-[2rem] z-20" />

          {/* Dynamic Stage Canvas */}
          <div className="relative w-full h-full rounded-[1.6rem] sm:rounded-[2.2rem] overflow-hidden bg-black/95 flex items-center justify-center">
            
            <img
              ref={imgRef}
              key={heroImgSrc}
              src={heroImgSrc}
              alt={product.title}
              decoding="async"
              loading="eager"
              onLoad={() => setImgLoaded(true)}
              onError={() => {
                const fallback = FALLBACK_HERO_IMAGES[categoryId] || FALLBACK_HERO_IMAGES.pansou;
                if (heroImgSrc !== fallback) {
                  setHeroImgSrc(fallback);
                }
                setImgLoaded(true);
              }}
              className={`w-full h-full object-cover object-center transition-all duration-700 ${
                imgLoaded ? 'opacity-35 scale-100' : 'opacity-0 scale-105'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* ------------------------------------------------------------- */}
            {/* HERO INTERACTIVE OVERLAY 1: PANSOU 3D RADAR + CLOUD HUBS      */}
            {/* ------------------------------------------------------------- */}
            {categoryId === 'pansou' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-6 z-10 text-white">
                <div className="relative w-24 h-24 sm:w-36 sm:h-36 rounded-full border-2 border-amber-400/80 bg-gradient-to-br from-amber-500/30 via-orange-600/30 to-black/90 backdrop-blur-xl flex items-center justify-center shadow-[0_0_70px_rgba(245,158,11,0.5)] scale-90 sm:scale-100">
                  <Search size={32} className="text-amber-300 animate-pulse sm:w-9 sm:h-9" />
                  
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-2.5 sm:px-3 py-1 rounded-full bg-orange-500 text-[9px] sm:text-[10px] font-mono font-bold text-white shadow-xl flex items-center space-x-1 whitespace-nowrap">
                    <Film size={11} className="shrink-0" />
                    <span>{stageT.pansou.tag1}</span>
                  </div>
                  <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 px-2.5 sm:px-3 py-1 rounded-full bg-blue-600 text-[9px] sm:text-[10px] font-mono font-bold text-white shadow-xl whitespace-nowrap">
                    {stageT.pansou.tag2}
                  </div>
                  <div className="absolute top-1/2 -left-4 sm:-left-6 -translate-y-1/2 px-2 sm:px-2.5 py-0.5 rounded-full bg-indigo-600 text-[8px] sm:text-[9px] font-mono font-bold text-white shadow-xl whitespace-nowrap">
                    {stageT.pansou.tag3}
                  </div>
                  <div className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-600 text-[8px] sm:text-[9px] font-mono font-bold text-white shadow-xl whitespace-nowrap">
                    {stageT.pansou.tag4}
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 text-center px-2">
                  <div className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-400 tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                    {stageT.pansou.cinemaEngineTag}
                  </div>
                  <div className="text-sm sm:text-2xl font-black mt-1 leading-snug">
                    {stageT.pansou.headline}
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* HERO INTERACTIVE OVERLAY 2: READING PRO DUAL MAGAZINE         */}
            {/* ------------------------------------------------------------- */}
            {categoryId === 'reading-pro' && (
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 z-10 text-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl w-full">
                  <div className="p-4 sm:p-6 rounded-2xl border border-emerald-500/30 bg-black/80 backdrop-blur-xl shadow-2xl space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 font-bold border-b border-white/10 pb-2">
                      <span className="flex items-center space-x-1.5">
                        <BookOpen size={14} />
                        <span>{stageT.readingPro.magazineName}</span>
                      </span>
                      <span>{stageT.readingPro.essayTag}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-serif leading-relaxed text-gray-100 line-clamp-3">
                      "{stageT.readingPro.essayExcerpt}"
                    </p>
                    <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-mono pt-1">
                      <Volume2 size={14} className="animate-pulse" />
                      <span>{stageT.readingPro.canvasRendering}</span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 rounded-2xl border border-teal-500/30 bg-black/80 backdrop-blur-xl shadow-2xl space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-teal-400 font-bold border-b border-white/10 pb-2">
                      <span className="flex items-center space-x-1.5">
                        <GitBranch size={14} />
                        <span>{stageT.readingPro.syntaxTitle}</span>
                      </span>
                      <span>{stageT.readingPro.syntaxAnalysis}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-sans leading-relaxed text-teal-100 line-clamp-3">
                      「{stageT.readingPro.syntaxExcerpt}」
                    </p>
                    <div className="flex items-center space-x-1.5 text-xs text-teal-400 font-mono pt-1">
                      <Sparkles size={14} />
                      <span>{stageT.readingPro.corpusTag}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* HERO INTERACTIVE OVERLAY 3: AI AGENT QUANT MATRIX            */}
            {/* ------------------------------------------------------------- */}
            {categoryId === 'ai-agent' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 text-white">
                <div className="w-full max-w-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-white/15 pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-mono font-bold tracking-widest text-blue-400">
                        {stageT.aiAgent.neuralTag}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      {stageT.aiAgent.sharpe}
                    </span>
                  </div>

                  <div className="flex items-end justify-between h-20 sm:h-28 px-4 py-2 rounded-2xl bg-black/85 border border-blue-500/30 gap-1.5">
                    {[35, 60, 48, 85, 72, 98, 82, 110, 78, 92, 118, 135, 122, 148, 138, 175].map((val, idx) => (
                      <div
                        key={idx}
                        style={{ height: `${(val / 175) * 100}%` }}
                        className={`w-full rounded-sm ${idx % 3 === 0 ? 'bg-indigo-400' : 'bg-emerald-400'} shadow-[0_0_10px_rgba(52,211,153,0.5)]`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-gray-300">
                    <span className="text-emerald-400 font-bold">● {stageT.aiAgent.factorScore}</span>
                    <span className="text-blue-400">{stageT.aiAgent.riskCircuit}</span>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* HERO INTERACTIVE OVERLAY 4: CHAT HARDWARE ENCLAVE VAULT       */}
            {/* ------------------------------------------------------------- */}
            {categoryId === 'chat' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 text-white">
                <div className="w-full max-w-md space-y-3">
                  <div className="flex items-center justify-center space-x-2 bg-blue-500/20 border border-blue-500/40 px-3.5 py-1 rounded-full backdrop-blur-md mx-auto w-fit">
                    <ShieldCheck size={15} className="text-cyan-400" />
                    <span className="text-xs font-mono font-bold tracking-widest text-cyan-300">
                      {stageT.chat.vaultTag}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-cyan-600/25 border border-cyan-400/30 backdrop-blur-xl text-xs sm:text-sm font-medium w-4/5 self-start shadow-xl">
                    「{stageT.chat.bubbleMessage}」
                  </div>

                  <div className="p-3.5 rounded-2xl bg-blue-600/35 border border-blue-400/30 backdrop-blur-xl text-xs sm:text-sm font-mono text-cyan-200 w-4/5 ml-auto text-right shadow-xl">
                    <span className="text-[10px] text-gray-400 block mb-0.5">{stageT.chat.cipherKeyLabel}</span>
                    7f3a9e...e04d21 ({stageT.chat.verified})
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Status Bar */}
            <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 flex items-center justify-between z-20 text-white">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
                  3D HARDWARE VIEWPORT
                </span>
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-gray-400">
                {product.title}
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Vision Statement Ribbon with Scroll-driven tracking and scale */}
      <section ref={philRef} className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center border-t border-b border-black/5 dark:border-white/10 my-8">
        <motion.div style={{ scale: philScale, opacity: philOpacity, y: philY }}>
          <p className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-blue-500 mb-2">
            DESIGN PHILOSOPHY
          </p>
          <p className="text-lg sm:text-2xl font-black italic tracking-tight max-w-2xl mx-auto leading-relaxed">
            "{product.visionStatement}"
          </p>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FOUR DISTINCT STRUCTURAL LAYOUTS (CONTINUOUS SCROLL PARALLAX & DOCK)  */}
      {/* ========================================================================= */}
      <section ref={deepDiveRef} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        
        {/* ===================================================================== */}
        {/* 🎬 1. PANSOU: WIDE CINEMA STRIP + RADAR AGGREGATION                   */}
        {/* ===================================================================== */}
        {categoryId === 'pansou' && (() => {
          const t = DEEP_DIVE_TRANSLATIONS.pansou[language] || DEEP_DIVE_TRANSLATIONS.pansou.zh;
          return (
            <motion.div 
              style={{ opacity: deepOpacity }}
              className="space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-[11px] font-mono font-black tracking-widest uppercase text-amber-500 mb-2 inline-block">
                  {t.tag}
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  {t.sectionTitle}
                </h2>
                <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.sectionSubtitle}
                </p>
              </div>

              {/* Diversity Form A: Wide Cinema Strip with live latency benchmark & Filmstrip Motion */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto items-stretch [perspective:1200px]">
                
                {/* Left Cinema Screen (7 cols) - Continuous scroll slide & 3D tilt & Filmstrip */}
                <motion.div 
                  style={{ 
                    x: pansouCinemaX, 
                    scale: pansouCinemaScale,
                    rotateY: pansouCinemaRotate,
                  }}
                  className={`lg:col-span-7 p-6 sm:p-10 rounded-[2.5rem] border relative overflow-hidden flex flex-col justify-between ${
                    isDark ? 'bg-black/70 border-white/15' : 'bg-white/85 border-white/90 shadow-xl'
                  }`}
                >
                  {/* Scroll-driven Filmstrip perforation track */}
                  <motion.div 
                    style={{ x: pansouFilmReelX }}
                    className="absolute top-0 left-0 right-0 h-4 bg-black/40 dark:bg-white/5 flex items-center justify-around overflow-hidden pointer-events-none opacity-60"
                  >
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="w-2.5 h-2 rounded-sm bg-white/20 dark:bg-white/30 shrink-0 mx-1" />
                    ))}
                  </motion.div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-500">
                        <Film size={16} />
                        <span>HDR 10+ / DOLBY VISION STREAMING</span>
                      </div>
                      {/* Rotating optical aperture iris */}
                      <motion.div style={{ rotate: pansouApertureRotate }} className="text-amber-400 opacity-80">
                        <Orbit size={20} />
                      </motion.div>
                    </div>
                    <h3 className="text-xl sm:text-3xl font-black">{t.extraPansou?.mainTitle || t.block3Title}</h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.extraPansou?.mainDesc || t.block3Desc}
                    </p>
                  </div>

                  {/* Dynamic Cloud Mesh Constellation */}
                  <div className="my-6 p-4 rounded-2xl bg-black/30 dark:bg-black/50 border border-white/10 relative overflow-hidden">
                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-3">
                      <span className="flex items-center space-x-1.5 text-amber-400 font-bold">
                        <Zap size={13} />
                        <span>MULTI-CLOUD DIRECT BUS</span>
                      </span>
                      <span className="text-emerald-400 font-bold animate-pulse">● 5 CLOUD CHANNELS ONLINE</span>
                    </div>

                    <div className="grid grid-cols-5 gap-2 text-center">
                      {[
                        { name: pageUiT.quark, code: 'Q' },
                        { name: pageUiT.aliyun, code: 'A' },
                        { name: pageUiT.baidu, code: 'B' },
                        { name: 'PikPak', code: 'P' },
                        { name: '115 Cloud', code: '115' }
                      ].map((cloud, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-white/5 border border-white/10 text-center transition-all duration-300 hover:border-amber-500/50">
                          <div className="w-6 h-6 mx-auto rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] mb-1">
                            {cloud.code}
                          </div>
                          <div className="text-[10px] font-bold truncate">{cloud.name}</div>
                          <div className="text-[8px] font-mono text-emerald-400 mt-0.5">0.08s</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <div className="text-xl sm:text-2xl font-black text-amber-400">0.08s</div>
                      <div className="text-[10px] text-gray-400 font-mono mt-0.5">{t.extraPansou?.subtext1 || "全网嗅探延迟"}</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-center">
                      <div className="text-xl sm:text-2xl font-black text-orange-400">100%</div>
                      <div className="text-[10px] text-gray-400 font-mono mt-0.5">{t.extraPansou?.subtext2 || "自动过滤死链"}</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
                      <div className="text-xl sm:text-2xl font-black text-blue-400">4K 60FPS</div>
                      <div className="text-[10px] text-gray-400 font-mono mt-0.5">{t.extraPansou?.subtext3 || "最高画质支持"}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-amber-500 pt-3 mt-4 border-t border-black/10 dark:border-white/10">
                    <span>{t.extraPansou?.bottomHint || "支持多端客户端免登录快速直存"}</span>
                    <ArrowRight size={15} />
                  </div>
                </motion.div>

                {/* Right Stack (5 cols) - Continuous scroll dock from right */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                  <motion.div 
                    style={{ x: pansouRightStackX, scale: pansouRightStackScale }}
                    className={`p-6 sm:p-7 rounded-[2.2rem] border flex-1 relative overflow-hidden ${
                      isDark ? 'bg-black/50 border-white/15' : 'bg-white/85 border-white/90 shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 text-emerald-400 font-bold text-base">
                        <CheckCircle2 size={18} />
                        <span>{t.block1Title}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">HASH SHA-256</span>
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.block1Desc}
                    </p>
                    
                    {/* Live Equalizer Soundwave Indicator */}
                    <div className="flex items-end space-x-1.5 h-6 pt-1">
                      {[40, 70, 90, 60, 100, 80, 50, 90, 75, 40, 85, 60, 95, 70].map((h, i) => (
                        <motion.div 
                          key={i}
                          animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.06 }}
                          className="flex-1 bg-emerald-400/70 rounded-full"
                        />
                      ))}
                    </div>
                  </motion.div>

                  <motion.div 
                    style={{ x: pansouRightStackX, scale: pansouRightStackScale }}
                    className={`p-6 sm:p-7 rounded-[2.2rem] border flex-1 relative overflow-hidden ${
                      isDark ? 'bg-black/50 border-white/15' : 'bg-white/85 border-white/90 shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 text-blue-400 font-bold text-base">
                        <Zap size={18} />
                        <span>{t.block2Title}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">CLUSTER 256 NODES</span>
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.block2Desc}
                    </p>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          );
        })()}

        {/* ===================================================================== */}
        {/* 📖 2. READING PRO: MAGAZINE DUAL-PAGE SPREAD & TYPOGRAPHY             */}
        {/* ===================================================================== */}
        {categoryId === 'reading-pro' && (() => {
          const t = DEEP_DIVE_TRANSLATIONS['reading-pro'][language] || DEEP_DIVE_TRANSLATIONS['reading-pro'].zh;
          return (
            <motion.div 
              style={{ opacity: deepOpacity }}
              className="space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-[11px] font-mono font-black tracking-widest uppercase text-emerald-500 mb-2 inline-block">
                  {t.tag}
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  {t.sectionTitle}
                </h2>
                <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.sectionSubtitle}
                </p>
              </div>

              {/* Diversity Form B: 3-column Editorial Progression Canvas with 3D Book Unfold & Highlight Scrubber */}
              <div className={`max-w-6xl mx-auto p-6 sm:p-10 rounded-[2.8rem] border [perspective:1400px] ${
                isDark ? 'bg-black/60 border-white/15 backdrop-blur-2xl' : 'bg-white/80 border-white/90 shadow-xl'
              }`}>
                
                {/* Dynamic Scroll-driven Gold-Leaf Highlight Scrubber */}
                <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-400 mb-2">
                    <span className="flex items-center space-x-1.5">
                      <BookOpen size={14} />
                      <span>THE ECONOMIST · EDITORIAL EXCERPT SCROLL SCRUBBER</span>
                    </span>
                    <span className="text-[10px] text-gray-400">SCROLL TO HIGHLIGHT</span>
                  </div>
                  
                  <p className="text-base sm:text-lg font-serif italic leading-relaxed relative text-gray-800 dark:text-gray-200">
                    <span>"The unprecedented confluence of artificial intelligence and high-frequency quantitative modeling is redefining the fundamental contours of </span>
                    <span className="relative inline-block font-bold text-emerald-500 dark:text-emerald-400 px-1">
                      global macroeconomic strategy
                      <motion.span 
                        style={{ width: readHighlightWidth }}
                        className="absolute inset-0 bg-emerald-400/25 dark:bg-emerald-500/30 rounded -z-10"
                      />
                    </span>
                    <span> in the twenty-first century."</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div 
                    style={{ x: readCol1X, rotateY: readCol1Rotate }}
                    className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-3 relative overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                      01
                    </div>
                    <h4 className="font-bold text-lg">{t.block1Title}</h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.block1Desc}
                    </p>
                  </motion.div>

                  <motion.div 
                    style={{ y: readCol2Y, scale: readCol2Scale }}
                    className="p-6 rounded-2xl bg-teal-500/10 border border-teal-500/20 space-y-3 relative overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold text-sm">
                      02
                    </div>
                    <h4 className="font-bold text-lg">{t.block2Title}</h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.block2Desc}
                    </p>
                  </motion.div>

                  <motion.div 
                    style={{ x: readCol3X, rotateY: readCol3Rotate }}
                    className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-3 relative overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-500 text-white flex items-center justify-center font-bold text-sm">
                      03
                    </div>
                    <h4 className="font-bold text-lg">{t.block3Title}</h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.block3Desc}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* ===================================================================== */}
        {/* 🧠 3. AI AGENT: QUANT NEURAL COMMAND TERMINAL STRIP                   */}
        {/* ===================================================================== */}
        {categoryId === 'ai-agent' && (() => {
          const t = DEEP_DIVE_TRANSLATIONS['ai-agent'][language] || DEEP_DIVE_TRANSLATIONS['ai-agent'].zh;
          return (
            <motion.div 
              style={{ opacity: deepOpacity }}
              className="space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-[11px] font-mono font-black tracking-widest uppercase text-blue-500 mb-2 inline-block">
                  {t.tag}
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  {t.sectionTitle}
                </h2>
                <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.sectionSubtitle}
                </p>
              </div>

              {/* Dynamic K-Line / Candlestick Path Drawing on Scroll */}
              <div className={`max-w-6xl mx-auto p-6 sm:p-8 rounded-[2.8rem] border overflow-hidden relative mb-6 ${
                isDark ? 'bg-black/70 border-white/15' : 'bg-white/85 border-white/90 shadow-xl'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center space-x-2 font-mono font-bold text-xs text-blue-400">
                    <BarChart3 size={16} />
                    <span>{t.extraAi?.chartTitle || "ALPHA-108 NEURAL YIELD BACKTEST CURVE"}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs font-mono">
                    <span className="text-emerald-400 font-bold">● {t.extraAi?.cumulativeReturn || "CUMULATIVE RETURN: +184.6%"}</span>
                    <span className="text-blue-400 font-bold">{t.extraAi?.sharpe || "SHARPE: 3.82"}</span>
                    <span className="text-purple-400 font-bold">{t.extraAi?.maxDrawdown || "MAX DRAWDOWN: 4.2%"}</span>
                  </div>
                </div>

                {/* Dynamic SVG Animated Chart */}
                <div className="h-44 sm:h-52 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200" preserveAspectRatio="none">
                    {/* Grid Lines */}
                    <line x1="0" y1="50" x2="800" y2="50" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 4" />
                    <line x1="0" y1="100" x2="800" y2="100" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 4" />
                    <line x1="0" y1="150" x2="800" y2="150" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 4" />

                    {/* Benchmark line */}
                    <path
                      d="M 0,160 Q 200,150 400,130 T 800,110"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      opacity="0.6"
                    />

                    {/* Strategy Alpha Curve with Scroll pathLength */}
                    <motion.path
                      d="M 0,180 Q 150,160 300,110 T 550,60 T 800,20"
                      fill="none"
                      stroke="url(#alphaGradient)"
                      strokeWidth="3.5"
                      style={{ pathLength: aiChartPathLength }}
                    />

                    <defs>
                      <linearGradient id="alphaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Diversity Form C: 4-Metric Terminal Strip with dynamic scroll docking */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                <motion.div 
                  style={{ x: aiBlock1X }}
                  className={`p-6 sm:p-7 rounded-[2rem] border ${
                    isDark ? 'bg-black/50 border-white/15' : 'bg-white/80 border-white/90 shadow-md'
                  }`}
                >
                  <div className="text-blue-400 font-mono text-xs font-bold mb-2">01 / MULTI-FACTOR</div>
                  <div className="text-xl sm:text-2xl font-black mb-1.5">{t.block1Title}</div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.block1Desc}</p>
                </motion.div>

                <motion.div 
                  style={{ y: aiBlock2Y }}
                  className={`p-6 sm:p-7 rounded-[2rem] border ${
                    isDark ? 'bg-black/50 border-white/15' : 'bg-white/80 border-white/90 shadow-md'
                  }`}
                >
                  <div className="text-emerald-400 font-mono text-xs font-bold mb-2">02 / LLM RESEARCH</div>
                  <div className="text-xl sm:text-2xl font-black mb-1.5">{t.block2Title}</div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.block2Desc}</p>
                </motion.div>

                <motion.div 
                  style={{ y: aiBlock3Y }}
                  className={`p-6 sm:p-7 rounded-[2rem] border ${
                    isDark ? 'bg-black/50 border-white/15' : 'bg-white/80 border-white/90 shadow-md'
                  }`}
                >
                  <div className="text-indigo-400 font-mono text-xs font-bold mb-2">03 / RISK CONTROL</div>
                  <div className="text-xl sm:text-2xl font-black mb-1.5">{t.block3Title}</div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.block3Desc}</p>
                </motion.div>

                <motion.div 
                  style={{ x: aiBlock4X }}
                  className={`p-6 sm:p-7 rounded-[2rem] border ${
                    isDark ? 'bg-black/50 border-white/15' : 'bg-white/80 border-white/90 shadow-md'
                  }`}
                >
                  <div className="text-cyan-400 font-mono text-xs font-bold mb-2">04 / BACKTESTING</div>
                  <div className="text-xl sm:text-2xl font-black mb-1.5">{t.block4Title || "10年历史全景回测"}</div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.block4Desc || "高夏普比率策略验证，剔除过拟合陷阱"}</p>
                </motion.div>
              </div>
            </motion.div>
          );
        })()}

        {/* ===================================================================== */}
        {/* 🛡️ 4. CHAT: ZERO-KNOWLEDGE DEFENSE PIPELINE                           */}
        {/* ===================================================================== */}
        {categoryId === 'chat' && (() => {
          const t = DEEP_DIVE_TRANSLATIONS.chat[language] || DEEP_DIVE_TRANSLATIONS.chat.zh;
          return (
            <motion.div 
              style={{ opacity: deepOpacity }}
              className="space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-[11px] font-mono font-black tracking-widest uppercase text-cyan-500 mb-2 inline-block">
                  {t.tag}
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  {t.sectionTitle}
                </h2>
                <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.sectionSubtitle}
                </p>
              </div>

              {/* Concentric Cyber Vault Dial & Laser Beam */}
              <div className={`max-w-6xl mx-auto p-6 sm:p-10 rounded-[2.8rem] border relative overflow-hidden [perspective:1400px] ${
                isDark ? 'bg-black/60 border-white/15 backdrop-blur-2xl' : 'bg-white/80 border-white/90 shadow-xl'
              }`}>
                
                {/* Laser Optical Beam */}
                <motion.div 
                  style={{ width: chatLaserBeam }}
                  className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] pointer-events-none -translate-y-1/2 z-0 opacity-40"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  <motion.div 
                    style={{ x: chatBlock1X }}
                    className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-3 backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                        <KeyRound size={20} />
                      </div>
                      <motion.div style={{ rotate: chatVaultRing1 }} className="text-blue-400">
                        <Orbit size={20} />
                      </motion.div>
                    </div>
                    <h4 className="font-bold text-lg">{t.block1Title}</h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.block1Desc}
                    </p>
                  </motion.div>

                  <motion.div 
                    style={{ y: chatBlock2Y }}
                    className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-3 backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold">
                        <Radio size={20} />
                      </div>
                      <motion.div style={{ rotate: chatVaultRing2 }} className="text-cyan-400">
                        <Lock size={20} />
                      </motion.div>
                    </div>
                    <h4 className="font-bold text-lg">{t.block2Title}</h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.block2Desc}
                    </p>
                  </motion.div>

                  <motion.div 
                    style={{ x: chatBlock3X }}
                    className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-3 backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                        <Fingerprint size={20} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded-full">AUTO ERASE</span>
                    </div>
                    <h4 className="font-bold text-lg">{t.block3Title}</h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.block3Desc}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })()}

      </section>

      {/* ========================================================================= */}
      {/* 4. FOUR CORE MICRO-ARCHITECTURE MODULES (HOLOGRAPHIC QUANTUM ASSEMBLY)    */}
      {/* ========================================================================= */}
      <section ref={anatomyRef} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-black/5 dark:border-white/10 [perspective:1400px] overflow-hidden">
        
        {/* Holographic Laser Scanner Bar (Sweeps on Scroll) */}
        <motion.div 
          style={{ top: laserScannerY, opacity: laserScannerOpacity }}
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.9)] pointer-events-none z-10"
        />

        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 relative z-10">
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-blue-500 mb-1.5 inline-block">
            DECONSTRUCTED MICRO-ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight">
            {pageUiT.archTitle}
          </h2>
          <p className={`text-xs sm:text-sm mt-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {product.visionDetails}
          </p>
        </div>

        {/* Central Quantum Reactor & Circuit Bus Backdrop */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Center Holographic Gyro Core */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 items-center justify-center pointer-events-none z-20">
            <motion.div 
              style={{ rotate: coreOrbitRotate }}
              className="absolute inset-0 rounded-full border border-dashed border-blue-500/40"
            />
            <motion.div 
              style={{ rotate: coreOrbitRotate }}
              className="absolute inset-2 rounded-full border border-cyan-400/30"
            />
            <div className="w-12 h-12 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-400/50 flex items-center justify-center text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.6)]">
              <Cpu size={22} className="animate-pulse" />
            </div>
          </div>

          {/* 4 Module Cards with 4-Quadrant Magnetic Assembly & Android Container Transform Entry */}
          <motion.div 
            style={{ opacity: anatomyOpacity }}
            className="relative grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 z-10"
          >
            {product.features.map((feat, idx) => {
              const cardTransforms = [
                { x: card0X, y: card0Y, scale: card0Scale, rotateZ: card0Rotate },
                { x: card1X, y: card1Y, scale: card1Scale, rotateZ: card1Rotate },
                { x: card2X, y: card2Y, scale: card2Scale, rotateZ: card2Rotate },
                { x: card3X, y: card3Y, scale: card3Scale, rotateZ: card3Rotate },
              ];
              const currentTransform = cardTransforms[idx] || cardTransforms[0];

              return (
                <motion.div
                  key={idx}
                  style={currentTransform}
                  className="h-full"
                >
                  <div
                    className={`p-6 sm:p-8 rounded-[2.2rem] border relative overflow-hidden group transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-1.5 ${
                      isDark
                        ? 'bg-black/50 border-white/15 hover:border-blue-500/60 backdrop-blur-xl shadow-xl hover:shadow-[0_15px_40px_rgba(59,130,246,0.16)]'
                        : 'bg-white/80 border-white/90 hover:border-blue-500/60 backdrop-blur-xl shadow-lg hover:shadow-[0_15px_40px_rgba(59,130,246,0.1)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-inner"
                          style={{
                            backgroundColor: `${product.accentColor}15`,
                            borderColor: `${product.accentColor}30`,
                            color: product.accentColor
                          }}
                        >
                          {renderIcon(feat.icon, 'w-6 h-6')}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-300">
                            {feat.highlight || `MODULE 0${idx + 1}`}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-black tracking-tight mb-2 group-hover:text-blue-500 transition-colors">
                        {feat.title}
                      </h3>
                      <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feat.description}
                      </p>
                    </div>

                    {/* Bespoke Interactive Live Micro Visualizer for each card */}
                    <div>
                      {idx === 0 && (
                        <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span className="text-[11px] font-mono text-emerald-400 font-bold">100% ENGINE THROUGHPUT</span>
                          </div>
                          <div className="flex items-end space-x-1 h-4">
                            {[30, 70, 100, 60, 90, 45, 80].map((h, i) => (
                              <div key={i} style={{ height: `${h}%` }} className="w-1 bg-blue-500/70 rounded-full" />
                            ))}
                          </div>
                        </div>
                      )}

                      {idx === 1 && (
                        <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-blue-400 font-bold">● RADIAL PRECISION: 99.8%</span>
                          <span className="text-gray-400">LATENCY &lt; 15ms</span>
                        </div>
                      )}

                      {idx === 2 && (
                        <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-purple-400 truncate max-w-[180px]">CIPHER: 0x8F9A...B3C2 [VERIFIED]</span>
                          <span className="text-emerald-400 font-bold">SECURE</span>
                        </div>
                      )}

                      {idx === 3 && (
                        <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] font-mono">
                          <div className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-75" />
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-150" />
                            <span className="text-cyan-400 font-bold">CLUSTER MESH ONLINE</span>
                          </div>
                          <span className="text-gray-400">256 NODES</span>
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE WORKSHOP (DIRECT LIVE TRIAL BENCH - 3D ELEVATION LOCK)     */}
      {/* ========================================================================= */}
      <section ref={simRef} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-black/5 dark:border-white/10 [perspective:1400px]">
        
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-blue-500 mb-1.5 inline-block">
            LIVE INTERACTIVE BENCH
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight">
            {pageUiT.workshopTitle}
          </h2>
          <p className={`text-xs sm:text-sm mt-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {pageUiT.workshopSubtitle}
          </p>
        </div>

        <motion.div
          style={{
            rotateX: simRotateX,
            scale: simScale,
            y: simY,
            opacity: simOpacity,
            transformStyle: 'preserve-3d',
          }}
          className="w-full max-w-6xl mx-auto"
        >
          {categoryId === 'pansou' && (
            <PansouWorkstation product={product} isDark={isDark} language={language} onVisit={handleVisit} />
          )}
          {categoryId === 'reading-pro' && (
            <ReadingProWorkbench product={product} isDark={isDark} language={language} onVisit={handleVisit} />
          )}
          {categoryId === 'ai-agent' && (
            <AIAgentTerminal product={product} isDark={isDark} language={language} onVisit={handleVisit} />
          )}
          {categoryId === 'chat' && (
            <GongPanChatMessenger 
              product={product} 
              isDark={isDark} 
              language={language} 
              onVisit={handleVisit}
              onApplyBeta={() => setBetaApplyModalOpen(true)}
            />
          )}
        </motion.div>

      </section>

      {/* ========================================================================= */}
      {/* 6. TECHNICAL BENCHMARK & COMPARISON SPECIFICATIONS (CONTINUOUS DOCKING)  */}
      {/* ========================================================================= */}
      <section ref={specRef} className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-black/5 dark:border-white/10">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] font-mono font-black tracking-widest uppercase text-blue-500 mb-1.5 inline-block">
            BENCHMARK & SPECIFICATIONS
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight">
            {pageUiT.specsTitle}
          </h2>
          <p className={`text-xs sm:text-sm mt-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {pageUiT.specsSubtitle}
          </p>
        </div>

        {/* 4 Specs Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {(product.specs || []).map((st, idx) => {
            const specTransforms = [
              { x: specCard0X },
              { y: specCard1Y },
              { y: specCard2Y },
              { x: specCard3X }
            ];
            const currentTransform = specTransforms[idx] || specTransforms[0];

            return (
              <motion.div
                key={idx}
                style={currentTransform}
                className="h-full"
              >
                <div
                  className={`p-6 rounded-[2.2rem] border text-center relative overflow-hidden group transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-1.5 ${
                    isDark 
                      ? 'bg-black/50 border-white/15 hover:border-blue-500/60 backdrop-blur-xl shadow-lg hover:shadow-[0_15px_35px_rgba(59,130,246,0.15)]' 
                      : 'bg-white/80 border-white/90 hover:border-blue-500/60 backdrop-blur-xl shadow-md hover:shadow-[0_15px_35px_rgba(59,130,246,0.1)]'
                  }`}
                >
                  {/* Background Subtle Radial Glow */}
                  <div 
                    className="absolute inset-0 opacity-10 blur-xl pointer-events-none group-hover:opacity-20 transition-opacity"
                    style={{ backgroundColor: product.accentColor }}
                  />

                  <div>
                    <div 
                      className="text-3xl sm:text-4xl font-black tracking-tight mb-2 relative z-10"
                      style={{ color: product.accentColor }}
                    >
                      {st.value}
                    </div>
                    <div className="font-bold text-sm sm:text-base mb-1 relative z-10">
                      {st.label}
                    </div>
                  </div>
                  
                  <div className={`text-xs relative z-10 pt-2 border-t border-black/5 dark:border-white/10 mt-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {st.subtext}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pro Comparison Table with Continuous Expansion */}
        <motion.div
          style={{
            scale: specTableScale,
            y: specTableY,
            opacity: specTableOpacity
          }}
          className={`rounded-[2.2rem] border overflow-hidden ${
            isDark ? 'bg-black/60 border-white/15' : 'bg-white/80 border-white/90 shadow-xl'
          }`}
        >
          <div className="p-6 sm:p-8 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-black">
              {pageUiT.comparisonTitle}
            </h3>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
              PRO BENCHMARK
            </span>
          </div>

          <div className="divide-y divide-black/5 dark:divide-white/10">
            {((COMPARISON_MAP[categoryId]?.[language] || COMPARISON_MAP[categoryId]?.['zh'] || COMPARISON_MAP.pansou.zh) || []).map((row, idx) => (
              <div key={idx} className="p-4 sm:p-6 flex flex-col md:grid md:grid-cols-3 gap-2.5 sm:gap-3 items-start md:items-center">
                <div className="font-bold text-xs sm:text-sm text-gray-400 font-mono">
                  {row.dimension}
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 line-through opacity-70">
                  <span className="text-[10px] font-mono uppercase bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-gray-400">TRADITIONAL</span>
                  <span>{row.traditional}</span>
                </div>
                <div 
                  className="flex items-center space-x-2 text-xs sm:text-sm font-bold"
                  style={{ color: product.accentColor }}
                >
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>{row.ours}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </section>

      {/* ========================================================================= */}
      {/* 7. FINALE PORTAL: DIRECT ENTER & ECOSYSTEM MATRIX                        */}
      {/* ========================================================================= */}
      <section ref={finaleRef} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-black/5 dark:border-white/10">
        
        {/* Main CTA Card */}
        <motion.div
          style={{
            scale: finaleBannerScale,
            y: finaleBannerY
          }}
          className={`relative max-w-5xl mx-auto rounded-[3rem] p-8 sm:p-14 border text-center overflow-hidden mb-16 sm:mb-24 shadow-2xl ${
            isDark
              ? 'bg-gradient-to-b from-black/80 to-blue-950/40 border-white/20'
              : 'bg-gradient-to-b from-white/90 to-blue-50/80 border-white/90 shadow-xl'
          }`}
        >
          <div className="max-w-2xl mx-auto space-y-5">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              {pageUiT.readyTitle}
            </h2>
            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {product.heroSubheadline}
            </p>
            <div className="pt-3 flex flex-col items-center justify-center">
              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <button
                  onClick={() => handleVisit()}
                  className={`group relative px-8 sm:px-12 py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center space-x-2.5 mx-auto transition-all duration-300 active:scale-95 shadow-2xl cursor-pointer overflow-hidden border liquid-glass ${
                    isDark 
                      ? 'liquid-glass-pill-dark text-white hover:text-white border-white/30 shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1.5px_2px_rgba(255,255,255,0.4)] hover:border-white/60 hover:shadow-[0_16px_50px_rgba(255,255,255,0.15)]' 
                      : 'liquid-glass-pill-light text-gray-900 hover:text-black border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,1)] hover:border-white hover:shadow-[0_16px_50px_rgba(0,0,0,0.14)]'
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-1/2 pointer-events-none bg-gradient-to-b from-white/40 dark:from-white/20 to-transparent" />
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
                    style={{
                      background: `radial-gradient(circle at center, ${product.accentColor}25 0%, transparent 70%)`
                    }}
                  />
                  <span className="relative z-10 font-bold tracking-wide">{product.ctaText || pageUiT.launchNow}</span>
                  <ArrowUpRight size={17} className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                {categoryId === 'chat' && (
                  <button
                    onClick={() => setBetaApplyModalOpen(true)}
                    className={`group relative px-6 sm:px-8 py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center space-x-2.5 transition-all duration-300 active:scale-95 shadow-xl cursor-pointer overflow-hidden border ${
                      isDark
                        ? 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border-sky-400/40 hover:border-sky-300 shadow-[0_4px_24px_rgba(14,165,233,0.2)]'
                        : 'bg-sky-500 hover:bg-sky-600 text-white border-transparent shadow-lg shadow-sky-500/25'
                    }`}
                  >
                    <Sparkles size={16} className="text-amber-300 animate-pulse" />
                    <span className="relative z-10 tracking-wide">{language === 'zh' ? '联系申请内测资格' : 'Apply for Beta Access'}</span>
                    <ArrowRight size={15} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                )}
              </div>

              {categoryId === 'chat' && (
                <p className={`text-[11px] sm:text-xs font-medium mt-3.5 flex items-center justify-center space-x-1.5 ${
                  isDark ? 'text-sky-300/80' : 'text-sky-800/80'
                }`}>
                  <span>* {(CHAT_TESTING_NOTICE[language] || CHAT_TESTING_NOTICE.zh).text}</span>
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Complete Ecosystem Navigation Grid (Synchronized on-scroll entrance) */}
        <div ref={suiteRef} className="max-w-6xl mx-auto mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-black/5 dark:border-white/10">
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-blue-500">
                ECOSYSTEM EXPLORATION
              </span>
              <h3 className="text-xl sm:text-2xl font-black mt-1">
                {pageUiT.exploreSuite}
              </h3>
            </div>
            <button 
              onClick={handleBackToHome}
              className={`group relative px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all duration-300 active:scale-95 border overflow-hidden cursor-pointer ${
                isDark
                  ? 'liquid-glass liquid-glass-pill-dark text-blue-400 hover:text-white border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:border-blue-500/50'
                  : 'liquid-glass liquid-glass-pill-light text-blue-600 hover:text-blue-700 border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.06),inset_0_1.5px_1.5px_rgba(255,255,255,1)] hover:border-blue-300'
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-1/2 pointer-events-none bg-gradient-to-b from-white/30 dark:from-white/15 to-transparent" />
              <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5 relative z-10" />
              <span className="relative z-10">{pageUiT.backToHub}</span>
            </button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allProducts.map((item, idx) => {
              const isCurrent = item.id === categoryId;
              const IconComp = item.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 55, scale: 0.88 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4, margin: "0px 0px -120px 0px" }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 24,
                    mass: 0.8,
                    delay: idx * 0.12
                  }}
                  whileHover={{ y: -8, scale: 1.025, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={`/showcase/${item.id}`}
                    className={`p-6 rounded-[2rem] border transition-all duration-300 block relative overflow-hidden group h-full ${
                      isCurrent
                        ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-500/10'
                        : isDark
                          ? 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/5 shadow-lg'
                          : 'bg-white/70 border-white/90 hover:border-black/20 hover:bg-white shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center border"
                        style={{
                          backgroundColor: `${item.themeColor}15`,
                          borderColor: `${item.themeColor}30`,
                          color: item.themeColor
                        }}
                      >
                        <IconComp size={18} />
                      </div>
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-gray-400">
                        {item.tag}
                      </span>
                    </div>

                    <h4 className="font-bold text-base mb-1">{item.name}</h4>
                    <p className={`text-xs line-clamp-2 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.desc}
                    </p>

                    <div className="mt-4 flex items-center text-xs font-bold space-x-1 text-blue-500 group-hover:translate-x-1 transition-transform">
                      <span>{isCurrent ? pageUiT.viewing : pageUiT.explore}</span>
                      <ArrowRight size={13} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

      </section>

      {/* Beta Application Modal */}
      <BetaApplyModal 
        isOpen={betaApplyModalOpen} 
        onClose={() => setBetaApplyModalOpen(false)} 
      />

    </motion.div>
  );
};
