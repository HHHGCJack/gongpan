import { Language } from '../../types';

export const WORKSTATION_STRINGS = {
  pansou: {
    placeholder: {
      zh: '搜索电影、剧集、软件、无损音乐或考研资料...',
      en: 'Search 4K movies, TV series, software, lossless audio or courses...',
      ja: '映画、ドラマ、ソフトウェア、ハイレゾ音源、学習資料を検索...',
      ko: '영화, 드라마, 소프트웨어, 무손실 음원, 학습 자료 검색...',
      es: 'Buscar películas 4K, series, software, música sin pérdida o cursos...',
      fr: 'Rechercher films 4K, séries, logiciels, musique sans perte ou cours...',
      de: 'Suche nach 4K-Filmen, Serien, Software, verlustfreier Musik oder Kursen...',
      el: 'Αναζήτηση ταινιών 4K, σειρών, λογισμικού, μουσικής χωρίς απώλειες ή μαθημάτων...'
    },
    searchBtn: {
      zh: '全网聚合搜',
      en: 'Multi-Cloud Search',
      ja: '全クラウド一括検索',
      ko: '전체 클라우드 통합 검색',
      es: 'Búsqueda Multinube',
      fr: 'Recherche Multi-Cloud',
      de: 'Multi-Cloud Suche',
      el: 'Αναζήτηση Multi-Cloud'
    },
    cloudSource: {
      zh: '网盘源:',
      en: 'Cloud Source:',
      ja: 'クラウド元:',
      ko: '클라우드 출처:',
      es: 'Fuente en la nube:',
      fr: 'Source cloud :',
      de: 'Cloud-Quelle:',
      el: 'Πηγή Cloud:'
    },
    filterAll: {
      zh: '全部网盘',
      en: 'All Clouds',
      ja: 'すべてのクラウド',
      ko: '전체 클라우드',
      es: 'Todas las nubes',
      fr: 'Tous les clouds',
      de: 'Alle Clouds',
      el: 'Όλα τα Clouds'
    },
    filterQuark: {
      zh: '夸克网盘 (极速)',
      en: 'Quark Drive (Fast)',
      ja: 'Quarkドライブ (高速)',
      ko: 'Quark 드라이브 (초고속)',
      es: 'Quark Drive (Rápido)',
      fr: 'Quark Drive (Rapide)',
      de: 'Quark Drive (Schnell)',
      el: 'Quark Drive (Γρήγορο)'
    },
    filterAli: {
      zh: '阿里云盘 (原画)',
      en: 'Aliyun Drive (Raw)',
      ja: 'Aliyunドライブ (原画)',
      ko: '알리 드라이브 (원본)',
      es: 'Aliyun Drive (Original)',
      fr: 'Aliyun Drive (Original)',
      de: 'Aliyun Drive (Original)',
      el: 'Aliyun Drive (Αρχικό)'
    },
    filterBaidu: {
      zh: '百度网盘 (海量)',
      en: 'Baidu Drive (Massive)',
      ja: 'Baiduドライブ (大容量)',
      ko: '바이두 드라이브 (대용량)',
      es: 'Baidu Drive (Masivo)',
      fr: 'Baidu Drive (Massif)',
      de: 'Baidu Drive (Massiv)',
      el: 'Baidu Drive (Μαζικό)'
    },
    filterXunlei: {
      zh: '迅雷云盘 (秒传)',
      en: 'Xunlei Cloud (Instant)',
      ja: 'Xunleiクラウド (即時)',
      ko: 'Xunlei 클라우드 (즉시)',
      es: 'Xunlei Cloud (Instantáneo)',
      fr: 'Xunlei Cloud (Instantané)',
      de: 'Xunlei Cloud (Sofort)',
      el: 'Xunlei Cloud (Άμεσο)'
    },
    directSave: {
      zh: '一键极速转存',
      en: 'Instant Direct Save',
      ja: 'ワンクリック保存',
      ko: '원클릭 즉시 저장',
      es: 'Guardado Directo',
      fr: 'Sauvegarde Directe',
      de: 'Direkt Speichern',
      el: 'Άμεση Αποθήκευση'
    },
    copied: {
      zh: '已复制分享链接',
      en: 'Share Link Copied',
      ja: '共有リンクをコピーしました',
      ko: '공유 링크 복사됨',
      es: 'Enlace Copiado',
      fr: 'Lien Copié',
      de: 'Link Kopiert',
      el: 'Ο Σύνδεσμος Αντιγράφηκε'
    },
    copyLink: {
      zh: '复制直存链接',
      en: 'Copy Direct Link',
      ja: 'リンクをコピー',
      ko: '직행 링크 복사',
      es: 'Copiar Enlace Directo',
      fr: 'Copier le Lien Direct',
      de: 'Direktlink Kopieren',
      el: 'Αντιγραφή Συνδέσμου'
    },
    onlinePlay: {
      zh: '原画在线播放',
      en: 'Raw Online Stream',
      ja: '原画オンライン再生',
      ko: '원본 온라인 스트리밍',
      es: 'Reproducir Online',
      fr: 'Lecture en Ligne',
      de: 'Online Abspielen',
      el: 'Online Αναπαραγωγή'
    },
    liveHealth: {
      zh: '100% 存活',
      en: '100% Active',
      ja: '100% 有効',
      ko: '100% 활성',
      es: '100% Activo',
      fr: '100% Actif',
      de: '100% Aktiv',
      el: '100% Ενεργό'
    }
  },

  reading: {
    magazineTag: {
      zh: 'THE ECONOMIST · 精读社论',
      en: 'THE ECONOMIST · EDITORIAL DEEP DIVE',
      ja: 'THE ECONOMIST · 精読社説',
      ko: 'THE ECONOMIST · 심층 사설 정독',
      es: 'THE ECONOMIST · ANÁLISIS EDITORIAL',
      fr: 'THE ECONOMIST · ESSAI ÉDITORIAL',
      de: 'THE ECONOMIST · LEITARTIKEL-ANALYSE',
      el: 'THE ECONOMIST · ΚΥΡΙΟ ΑΡΘΡΟ'
    },
    originalAudio: {
      zh: '真人母语原声朗读 (60 FPS 同步)',
      en: 'Native Speaker Audio (60 FPS Synced)',
      ja: 'ネイティブ肉声朗読 (60 FPS同期)',
      ko: '원어민 원음 오디오 (60 FPS 동기화)',
      es: 'Audio Nativo Real (Sincronizado a 60 FPS)',
      fr: 'Audio Natif Naturel (Synchronisé 60 FPS)',
      de: 'Muttersprachliche Vertonung (60 FPS synchron)',
      el: 'Φυσική Φωνή Αφήγησης (Συγχρονισμός 60 FPS)'
    },
    speed: {
      zh: '倍速',
      en: 'Speed',
      ja: '速度',
      ko: '배속',
      es: 'Velocidad',
      fr: 'Vitesse',
      de: 'Tempo',
      el: 'Ταχύτητα'
    },
    syntaxTab: {
      zh: '语法拆解树',
      en: 'Grammar Tree',
      ja: '構文解析ツリー',
      ko: '문법 트리 분석',
      es: 'Árbol Sintáctico',
      fr: 'Arbre Syntaxique',
      de: 'Grammatikbaum',
      el: 'Συντακτικό Δέντρο'
    },
    corpusTab: {
      zh: '高频考点语料',
      en: 'Exam Corpus',
      ja: '頻出語彙コーパス',
      ko: '핵심 시험 어휘',
      es: 'Corpus de Exámenes',
      fr: 'Corpus d\'Examen',
      de: 'Prüfungskorpus',
      el: 'Σώμα Εξετάσεων'
    },
    notesTab: {
      zh: '宏观背景注解',
      en: 'Background Notes',
      ja: '背景知識の解説',
      ko: '배경지식 해설',
      es: 'Notas de Contexto',
      fr: 'Notes de Contexte',
      de: 'Hintergrundwissen',
      el: 'Σημειώσεις Πλαισίου'
    },
    clickWordHint: {
      zh: '💡 点击上方任意英文单词，即可查看声标、词根词缀及发音跟读评测',
      en: '💡 Click any word in the text to inspect phonetics, etymology, and pronunciation analysis',
      ja: '💡 上の英単語をクリックすると、発音記号・語源・発音チェックが表示されます',
      ko: '💡 위의 영단어를 클릭하면 발음 기호, 어원 및 발음 평가를 확인할 수 있습니다',
      es: '💡 Haz clic en cualquier palabra para ver fonética, etimología y evaluación de pronunciación',
      fr: '💡 Cliquez sur n\'importe quel mot pour afficher la phonétique, l\'étymologie et l\'analyse vocale',
      de: '💡 Klicken Sie auf ein beliebiges Wort für Lautschrift, Wortherkunft und Aussprachetraining',
      el: '💡 Επιλέξτε οποιαδήποτε λέξη για φωνητική, ετυμολογία και αξιολόγηση προφοράς'
    }
  },

  ai: {
    terminalHeader: {
      zh: 'QUANTITATIVE NEURAL TERMINAL v4.2 [ALPHA-ENGINE RUNNING]',
      en: 'QUANTITATIVE NEURAL TERMINAL v4.2 [ALPHA-ENGINE RUNNING]',
      ja: 'QUANTITATIVE NEURAL TERMINAL v4.2 [アルファエンジン稼働中]',
      ko: 'QUANTITATIVE NEURAL TERMINAL v4.2 [알파 엔진 실행 중]',
      es: 'TERMINAL NEURONAL CUANTITATIVO v4.2 [MOTOR ALPHA ACTIVO]',
      fr: 'TERMINAL NEURONAL QUANTITATIF v4.2 [MOTEUR ALPHA ACTIF]',
      de: 'QUANTITATIVER NEURONALER TERMINAL v4.2 [ALPHA-ENGINE AKTIV]',
      el: 'ΠΟΣΟΤΙΚΟ ΝΕΥΡΩΝΙΚΟ ΤΕΡΜΑΤΙΚΟ v4.2 [ΜΗΧΑΝΗ ALPHA ΣΕ ΛΕΙΤΟΥΡΓΙΑ]'
    },
    runBacktest: {
      zh: '触发即时量化推演',
      en: 'Run Neural Backtest',
      ja: '即時推論シミュレーション実行',
      ko: '실시간 퀀트 백테스팅 실행',
      es: 'Ejecutar Backtest Neuronal',
      fr: 'Lancer le Backtest Neuronal',
      de: 'Neuronalen Backtest Starten',
      el: 'Εκτέλεση Νευρωνικού Ελέγχου'
    },
    computing: {
      zh: '正在并行回测 128 个因子...',
      en: 'Computing 128 Factors in Parallel...',
      ja: '128ファクターを並列演算中...',
      ko: '128개 팩터 병렬 연산 중...',
      es: 'Calculando 128 factores en paralelo...',
      fr: 'Calcul de 128 facteurs en parallèle...',
      de: '128 Faktoren werden parallel berechnet...',
      el: 'Υπολογισμός 128 παραγόντων σε παράλληλη λειτουργία...'
    },
    fullReport: {
      zh: '查看完整策略研究报告与仓位明细',
      en: 'View Full Strategy Report & Asset Allocation',
      ja: '完全な戦略レポートとポートフォリオ詳細を表示',
      ko: '전체 전략 분석 보고서 및 포지션 상세 보기',
      es: 'Ver Informe Completo de Estrategia y Asignación',
      fr: 'Consulter le Rapport de Stratégie Complet',
      de: 'Vollständigen Strategiebericht & Allokation anzeigen',
      el: 'Προβολή Πλήρους Έκθεσης Στρατηγικής & Κατανομής'
    },
    metricReturn: {
      zh: '年化超额收益',
      en: 'Annualized Alpha Return',
      ja: '年率アルファ超過収益',
      ko: '연환산 초과 수익률',
      es: 'Retorno Alfa Anualizado',
      fr: 'Rendement Alpha Annualisé',
      de: 'Annualisierte Alpha-Rendite',
      el: 'Ετησιοποιημένη Απόδοση Alpha'
    },
    metricSharpe: {
      zh: '夏普比率 (Sharpe)',
      en: 'Sharpe Ratio',
      ja: 'シャープレシオ (Sharpe)',
      ko: '샤프 지수 (Sharpe)',
      es: 'Ratio de Sharpe',
      fr: 'Ratio de Sharpe',
      de: 'Sharpe-Ratio',
      el: 'Δείκτης Sharpe'
    },
    metricDrawdown: {
      zh: '最大动态回撤',
      en: 'Max Dynamic Drawdown',
      ja: '最大動的ドローダウン',
      ko: '최대 동적 낙폭 (MDD)',
      es: 'Drawdown Máximo Dinámico',
      fr: 'Drawdown Maximum Dynamique',
      de: 'Maximaler Drawdown',
      el: 'Μέγιστη Δυναμική Υποχώρηση'
    },
    metricWinRate: {
      zh: '胜率 (10年历史)',
      en: 'Win Rate (10-Yr History)',
      ja: '勝率 (10年検証)',
      ko: '승률 (10년 검증)',
      es: 'Tasa de Acierto (10 Años)',
      fr: 'Taux de Réussite (10 Ans)',
      de: 'Gewinnrate (10 Jahre)',
      el: 'Ποσοστό Επιτυχίας (10 Έτη)'
    }
  },

  chat: {
    statusSecured: {
      zh: '端到端加密信道已建立 (256-BIT)',
      en: 'E2EE Channel Established (256-BIT)',
      ja: 'E2EE暗号化通信を確立 (256-BIT)',
      ko: '종단간(E2EE) 암호화 채널 연결됨 (256-BIT)',
      es: 'Canal E2EE Establecido (256-BIT)',
      fr: 'Canal E2EE Établi (256-BIT)',
      de: 'E2EE-Kanal gesichert (256-BIT)',
      el: 'Κανάλι E2EE Εγκαταστάθηκε (256-BIT)'
    },
    burnTimer: {
      zh: '阅后即焚: 10秒',
      en: 'Self-Destruct: 10s',
      ja: '自動消滅: 10秒',
      ko: '자동 파기: 10초',
      es: 'Autodestrucción: 10s',
      fr: 'Autodestruction : 10s',
      de: 'Selbstzerstörung: 10s',
      el: 'Αυτοκαταστροφή: 10s'
    },
    inputPlaceholder: {
      zh: '输入安全消息，按回车通过零知识中继盲传发送...',
      en: 'Type encrypted message, press enter to send via zero-knowledge relay...',
      ja: '暗号化メッセージを入力。Enterでゼロ知識リレー経由で送信...',
      ko: '보안 메시지를 입력하세요. Enter를 눌러 영지식 릴레이로 전송...',
      es: 'Escribe un mensaje seguro, presiona Enter para enviar vía retransmisión ciega...',
      fr: 'Tapez un message sécurisé, appuyez sur Entrée pour l\'envoyer via le relais sécurisé...',
      de: 'Sichere Nachricht eingeben, Eingabetaste zum Senden über Zero-Knowledge-Relais drücken...',
      el: 'Πληκτρολογήστε ασφαλές μήνυμα, πατήστε Enter για αποστολή μέσω αναμετάδοσης μηδενικής γνώσης...'
    },
    sendBtn: {
      zh: '安全发送',
      en: 'Secure Send',
      ja: '安全送信',
      ko: '보안 전송',
      es: 'Enviar Seguro',
      fr: 'Envoi Sécurisé',
      de: 'Sicher Senden',
      el: 'Ασφαλής Αποστολή'
    },
    wipeAll: {
      zh: '双向双端一键销毁全部记录',
      en: 'Bidirectional Instant Wipe on Both Devices',
      ja: '双方向で両端末の履歴を完全消去',
      ko: '양방향 양측 기기 모든 기록 즉시 완전 삭제',
      es: 'Borrado Simultáneo en Ambos Dispositivos',
      fr: 'Effacement Instantané sur les Deux Appareils',
      de: 'Beidseitiges Sofort-Löschen auf beiden Geräten',
      el: 'Άμεση Αμφίδρομη Διαγραφή και στις Δύο Συσκευές'
    },
    openApp: {
      zh: '打开 GongPan Chat 原生客户端',
      en: 'Open GongPan Chat Native App',
      ja: 'GongPan Chatクライアントを起動',
      ko: 'GongPan Chat 전용 앱 열기',
      es: 'Abrir App Nativa de GongPan Chat',
      fr: 'Ouvrir l\'App Native GongPan Chat',
      de: 'GongPan Chat App Öffnen',
      el: 'Άνοιγμα Εφαρμογής GongPan Chat'
    }
  }
};
