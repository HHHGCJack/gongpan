import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Gamepad2, 
  Wrench, 
  BookOpen, 
  MessageSquare, 
  TrendingUp, 
  FileCode2, 
  ShieldCheck, 
  Flame, 
  Binary,
  Zap
} from 'lucide-react';
import { useTheme } from '../App';

export interface SearchItem {
  id: string;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  category: 'product' | 'tool' | 'game' | 'page';
  categoryLabel: string;
  categoryLabelEn: string;
  href: string;
  isExternal?: boolean;
  keywords: string[];
  pinyin?: string[];
  initials?: string[];
  icon: any;
  color: string;
  badge?: string;
  badgeColor?: string;
}

const SEARCH_DATABASE: SearchItem[] = [
  // 1. 核心产品
  {
    id: 'pansou',
    title: '网盘影视资源搜',
    titleEn: 'Cloud Resource Search (PanSou)',
    desc: '聚合全网网盘资源生态，直通 4K 蓝光影视、无损音乐与海量学习资料。',
    descEn: 'Aggregate cloud resources across the web with instant inverted-index search for 4K movies and files.',
    category: 'product',
    categoryLabel: '精选产品',
    categoryLabelEn: 'Product',
    href: '/showcase/pansou',
    keywords: ['网盘', '盘搜', 'pansou', 'ps', '搜索', '电影', '电视剧', '追剧', '影视', '视频', '4k', '蓝光', '夸克', '阿里云盘', '百度网盘', '迅雷', '磁力', '资源', '动漫', '无损音乐', '学习资料', 'movie', 'drive', 'pan', 'search'],
    pinyin: ['wangpan', 'yingshi', 'ziyuan', 'pansou', 'dianying', 'dianshiju', 'kuake', 'aliyunpan', 'baiduwangpan', 'chaxun', 'zhuiju'],
    initials: ['wp', 'ys', 'zy', 'ps', 'dy', 'dsj', 'kk', 'ay', 'bd', 'ss', 'zj'],
    icon: Search,
    color: '#f59e0b',
    badge: 'HOT TOOL',
    badgeColor: 'bg-amber-500/15 text-amber-500 border-amber-500/30'
  },
  {
    id: 'reading-pro',
    title: '外刊精读 · Global Reader',
    titleEn: 'Global Journal Reading Pro',
    desc: '深度解析《经济学人》、《纽约客》等世界顶级刊物，双语对照与生词速记。',
    descEn: 'In-depth translation & lexical breakdown of The Economist, The New Yorker and top periodicals.',
    category: 'product',
    categoryLabel: '精选产品',
    categoryLabelEn: 'Product',
    href: '/showcase/reading-pro',
    keywords: ['外刊', '精读', '英语', '外语', '阅读', '经济学人', 'economist', '纽约客', 'new yorker', '双语', '生词', '翻译', 'journal', 'reader', 'english', 'magazine', 'reading', 'wk'],
    pinyin: ['waikan', 'jingdu', 'yingyu', 'yuedu', 'jingjixueren', 'niuyueke', 'shuangyu', 'fanyi'],
    initials: ['wk', 'jd', 'yy', 'yd', 'jjxr', 'nyk', 'sy', 'fy'],
    icon: BookOpen,
    color: '#3b82f6',
    badge: 'PREMIUM',
    badgeColor: 'bg-blue-500/15 text-blue-500 border-blue-500/30'
  },
  {
    id: 'ai-agent',
    title: 'AI 投资智能体 · Stock Agent',
    titleEn: 'AI Investment Agent',
    desc: '多因子量化模型与 AI 驱动的财务研报提炼、熔断回测与财富决策助手。',
    descEn: 'AI-driven quantitative multi-factor modeling and investment research synthesis assistant.',
    category: 'product',
    categoryLabel: '精选产品',
    categoryLabelEn: 'Product',
    href: '/showcase/ai-agent',
    keywords: ['ai', '投资', '股票', '智能体', 'agent', 'stock', 'invest', 'finance', '研报', '量化', '理财', '炒股', '大盘', 'a股', '美股', '基金', '财务', '回测', 'tz', 'gp'],
    pinyin: ['ai', 'touzi', 'gupiao', 'zhinengti', 'yanbao', 'lianghua', 'licai', 'chaogu', 'jijin', 'caifu'],
    initials: ['ai', 'tz', 'gp', 'znt', 'yb', 'lh', 'lc', 'cg', 'jj', 'cf'],
    icon: TrendingUp,
    color: '#10b981',
    badge: 'AI PRO',
    badgeColor: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
  },
  {
    id: 'chat',
    title: '即时聊天软件 · Instant Chat',
    titleEn: 'Instant Messaging App',
    desc: '中国版 Telegram，端到端高抗并发、隐私加密传输与极简现代聊天体验。',
    descEn: 'Chinese-native private messenger inspired by Telegram with end-to-end encryption.',
    category: 'product',
    categoryLabel: '精选产品',
    categoryLabelEn: 'Product',
    href: '/showcase/chat',
    keywords: ['聊天', 'chat', 'telegram', 'tg', '即时通讯', '社交', '私密', '消息', 'im', 'message', '通信', '端到端', '加密', '纸飞机', '微信', 'lt'],
    pinyin: ['jishi', 'liaotian', 'ruanjian', 'jishitongxun', 'shejiao', 'simi', 'xiaoxi', 'jiami', 'tongxin'],
    initials: ['js', 'lt', 'rj', 'tx', 'sj', 'sm', 'xx', 'jm'],
    icon: MessageSquare,
    color: '#06b6d4',
    badge: 'BETA',
    badgeColor: 'bg-cyan-500/15 text-cyan-500 border-cyan-500/30'
  },

  // 2. 实验室极客工具
  {
    id: 'tool-glass',
    title: 'Liquid Glass 磨砂玻璃预设生成器',
    titleEn: 'Liquid Glassmorphism Generator',
    desc: '交互式调配高斯模糊、饱和度与透明度，一键复制纯 CSS / Tailwind 样式。',
    descEn: 'Interactive Gaussian blur and saturation generator with instant CSS & Tailwind code export.',
    category: 'tool',
    categoryLabel: '实验工具',
    categoryLabelEn: 'Tool',
    href: '/laboratory?category=tools&tab=glass',
    keywords: ['玻璃', '磨砂', '毛玻璃', 'liquid glass', 'glass', 'glassmorphism', 'css', 'tailwind', 'blur', '高斯模糊', '模糊', '透明度', '饱和度', '样式', '设计', 'ui', '实验室', '生成器', 'bl'],
    pinyin: ['mosha', 'boli', 'maoboli', 'gaosimohu', 'mohu', 'yangshi', 'sheji', 'shengchengqi'],
    initials: ['ms', 'bl', 'mbl', 'gsmh', 'mh', 'ys', 'sj', 'scq'],
    icon: Layers,
    color: '#8b5cf6',
    badge: 'CSS/UI',
    badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30'
  },
  {
    id: 'tool-json',
    title: 'JSON 深度格式化与校验',
    titleEn: 'JSON Formatter & Validator',
    desc: '纯本地高防即时 JSON 语法解析、美化缩进、压缩与语法报错定位。',
    descEn: 'Fast, client-side JSON formatting, linting, syntax verification, and minification.',
    category: 'tool',
    categoryLabel: '实验工具',
    categoryLabelEn: 'Tool',
    href: '/laboratory?category=tools&tab=json',
    keywords: ['json', '格式化', '校验', '压缩', '美化', 'format', 'lint', 'prettify', 'minify', 'parser', '解析', '代码', '开发者', '实验室', 'gsh', 'jy'],
    pinyin: ['geshihua', 'jiaoyan', 'yasuo', 'meihua', 'jiexi', 'daima', 'kaifazhe'],
    initials: ['gsh', 'jy', 'ys', 'mh', 'jx', 'dm', 'kfz'],
    icon: FileCode2,
    color: '#0ea5e9',
    badge: 'DEV',
    badgeColor: 'bg-sky-500/15 text-sky-400 border-sky-500/30'
  },
  {
    id: 'tool-codec',
    title: 'Base64 & URL 安全编解码',
    titleEn: 'Base64 & URL Safe Codec',
    desc: '秒级纯前端双向编解码，无网络请求泄露，确保敏感密钥与字符串安全转换。',
    descEn: 'Client-side bidirectional Base64 and URL encoding/decoding without server telemetry.',
    category: 'tool',
    categoryLabel: '实验工具',
    categoryLabelEn: 'Tool',
    href: '/laboratory?category=tools&tab=codec',
    keywords: ['base64', 'url', '编解码', '编码', '解码', 'encode', 'decode', '加密', '解密', '安全', '转码', 'urlencode', 'urldecode', '实验室', 'bjm'],
    pinyin: ['bianjiema', 'bianma', 'jiema', 'jiami', 'jiemi', 'anquan', 'zhuanma'],
    initials: ['bjm', 'bm', 'jm', 'aq', 'zm'],
    icon: Binary,
    color: '#10b981',
    badge: 'CODEC',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'tool-token',
    title: '工业级高熵密钥 / 强密码生成器',
    titleEn: 'High-Entropy Secret Key Generator',
    desc: '基于 WebCrypto 加密原语，生成不可逆、防彩虹表破解的强随机凭据。',
    descEn: 'Cryptographically secure password & token generator using hardware WebCrypto entropy.',
    category: 'tool',
    categoryLabel: '实验工具',
    categoryLabelEn: 'Tool',
    href: '/laboratory?category=tools&tab=token',
    keywords: ['密码', '密钥', 'token', 'password', 'key', 'secret', '随机密码', '强密码', 'webcrypto', 'uuid', '安全', '生成器', '凭据', '实验室', 'mm', 'my'],
    pinyin: ['mima', 'miyao', 'suiji', 'qiangmima', 'anquan', 'shengchengqi', 'pingju'],
    initials: ['mm', 'my', 'sj', 'qmm', 'aq', 'scq', 'pj'],
    icon: ShieldCheck,
    color: '#f43f5e',
    badge: 'SECURITY',
    badgeColor: 'bg-rose-500/15 text-rose-400 border-rose-500/30'
  },

  // 3. 实验室趣味小游戏
  {
    id: 'game-roadster',
    title: 'Roadster · 气动逃逸 (Air Run)',
    titleEn: 'Roadster: Air Run',
    desc: '百万级东方旗舰尊界突袭！五大天籁原声环绕，凡俗跑车紧急启动冷气推进器冲向天空，领略顶级豪威。',
    descEn: 'The million-dollar flagship Zunjie dominates the highway with authentic aphorisms. Take flight to witness unmatched supremacy.',
    category: 'game',
    categoryLabel: '小游戏',
    categoryLabelEn: 'Game',
    href: '/laboratory?category=games&game=roadster',
    isExternal: false,
    keywords: ['roadster', '气动逃逸', 'air run', 'airrun', '跑车', '赛车', '特斯拉', 'tesla', '马斯克', 'elon musk', '尊界', 'zunjie', 's800', '尊界s800', '余承东', 'yuchengdong', '余总', '遥遥领先', 'yaoyaolingxian', 'yydx', 'hw', '华为', 'huawei', '问界', '智界', '享界', '鸿蒙', '冷气推进', '推进器', '太空', '起飞', '躲避', '追逐', '小游戏', 'game', '碰碰车', 'zj', 'tsl', '百万豪车', '劳斯莱斯', '迈巴赫', '信仰', '音效', '天籁', '逃跑'],
    pinyin: ['qiaodongtaoyi', 'paoche', 'saiche', 'tesila', 'masike', 'zunjie', 'yuchengdong', 'yaoyaolingxian', 'huawei', 'wenjie', 'zhijie', 'xiangjie', 'hongmeng', 'lengqituijin', 'duobi', 'xiaoyouxi'],
    initials: ['qdty', 'pc', 'sc', 'tsl', 'msk', 'zj', 'ycd', 'yydx', 'hw', 'wj', 'zj', 'xj', 'hm', 'lqtj', 'db', 'xyx', 'yx'],
    icon: Flame,
    color: '#ef4444',
    badge: '遥遥领先',
    badgeColor: 'bg-rose-500/15 text-rose-400 border-rose-500/30'
  },
  {
    id: 'game-zhuzhiliao',
    title: '竹知了 · 一转就哇哇叫 (huawei.dog)',
    titleEn: 'Bamboo Cicada · Whirling Toy',
    desc: 'huawei.dog 纯血声学奇迹！按住旋转即可召唤“一千万以内最好”、“遥遥领先”天籁圣音，转得越猛叫得越宏亮。',
    descEn: 'Epoch-making acoustics on huawei.dog! Spin to channel "Far, Far Ahead" and "Best under 10M" master recordings.',
    category: 'game',
    categoryLabel: '小游戏',
    categoryLabelEn: 'Game',
    href: '/laboratory?category=games&game=zhuzhiliao',
    isExternal: false,
    keywords: ['竹知了', 'zhuzhiliao', 'zzl', 'huawei.dog', 'huaweidog', '华为狗', '华为', 'huawei', 'hw', '余承东', 'yuchengdong', 'ycd', '大嘴', '余总', '遥遥领先', 'yaoyaolingxian', 'yydx', '一千万以内最好', '1000万以内最好', '纯血', '纯血声学', '声音', '音效', '哇哇叫', '竹蝉', '玩具', '旋转', '小游戏', 'game', 'cicada', '怀旧', '童年', '解压', '恶搞', '鬼畜', '圣音'],
    pinyin: ['zhuzhiliao', 'huawei', 'dog', 'yuchengdong', 'yaoyaolingxian', 'yiqianwanyineizuihao', 'chunxueshengxue', 'shengyin', 'yinxiao', 'wawayj', 'zhuchan', 'wanju', 'xuanzhuan', 'xiaoyouxi', 'huaijiu'],
    initials: ['zzl', 'hw', 'ycd', 'yydx', 'yqwyndh', 'cx', 'cxsc', 'sy', 'yx', 'wwj', 'zc', 'wj', 'xz', 'xyx', 'hj'],
    icon: Sparkles,
    color: '#10b981',
    badge: '纯血声学',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
  },

  // 4. 站点核心页面
  {
    id: 'page-laboratory',
    title: '创新实验室 (Laboratory)',
    titleEn: 'Innovation Laboratory',
    desc: '汇聚前沿实验性在线交互工具箱与免安装即开小游戏的极客探索专区。',
    descEn: 'A curated sandbox of developer tools and instant lightweight browser mini-games.',
    category: 'page',
    categoryLabel: '专区导航',
    categoryLabelEn: 'Portal',
    href: '/laboratory',
    keywords: ['实验室', '创新实验室', 'laboratory', 'lab', '工具箱', '小游戏', '极客', '探索', '工具', '游戏', 'sys', 'cxsys', 'tools', 'games'],
    pinyin: ['chuangxin', 'shiyanshi', 'gongjuxiang', 'xiaoyouxi', 'jike', 'tansuo'],
    initials: ['cx', 'sys', 'gjx', 'xyx', 'jk', 'ts'],
    icon: Wrench,
    color: '#6366f1',
    badge: 'LAB',
    badgeColor: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
  }
];

// Helper: Normalize strings for ultra-tolerant matching
const cleanStr = (s: string) => (s || '').toLowerCase().replace(/[\s\.\-_··/\\(\)\[\]【】、，,。:：!！?？"']/g, '');

// Helper: Check if subsequence exists
const isSubsequence = (sub: string, source: string): boolean => {
  if (!sub || !source) return false;
  let i = 0, j = 0;
  while (i < sub.length && j < source.length) {
    if (sub[i] === source[j]) i++;
    j++;
  }
  return i === sub.length;
};

// Calculate search relevance score (the higher the score, the more relevant)
const calculateScore = (item: SearchItem, rawQuery: string): number => {
  const trimmed = rawQuery.trim().toLowerCase();
  if (!trimmed) return 1;

  const cleanQuery = cleanStr(trimmed);
  const tokens = trimmed.split(/[\s,，、]+/).filter(Boolean);
  if (tokens.length === 0) return 1;

  let totalScore = 0;
  let tokensMatched = 0;

  // Normalized item properties
  const normTitle = cleanStr(item.title);
  const normTitleEn = cleanStr(item.titleEn);
  const normDesc = cleanStr(item.desc);
  const normDescEn = cleanStr(item.descEn);
  const normBadge = item.badge ? cleanStr(item.badge) : '';
  const allKeywords = (item.keywords || []).map(k => cleanStr(k));
  const allPinyin = (item.pinyin || []).map(p => cleanStr(p));
  const allInitials = (item.initials || []).map(i => cleanStr(i));

  // 1. Direct whole-query match bonus (super sensitive)
  if (cleanQuery.length >= 1) {
    if (normTitle === cleanQuery || normTitleEn === cleanQuery) {
      totalScore += 500;
    } else if (normTitle.startsWith(cleanQuery) || normTitleEn.startsWith(cleanQuery)) {
      totalScore += 300;
    } else if (normTitle.includes(cleanQuery) || normTitleEn.includes(cleanQuery)) {
      totalScore += 220;
    } else if (allKeywords.some(k => k === cleanQuery)) {
      totalScore += 200;
    } else if (allKeywords.some(k => k.includes(cleanQuery))) {
      totalScore += 160;
    } else if (allInitials.some(ini => ini.includes(cleanQuery) || cleanQuery.includes(ini))) {
      totalScore += 170;
    } else if (allPinyin.some(py => py.includes(cleanQuery))) {
      totalScore += 150;
    } else if (normBadge.includes(cleanQuery)) {
      totalScore += 130;
    } else if (normDesc.includes(cleanQuery) || normDescEn.includes(cleanQuery)) {
      totalScore += 90;
    } else if (isSubsequence(cleanQuery, normTitle) || isSubsequence(cleanQuery, normTitleEn)) {
      totalScore += 80;
    }
  }

  // 2. Token-by-token evaluation
  for (const token of tokens) {
    const cleanToken = cleanStr(token);
    if (!cleanToken) continue;

    let tokenScore = 0;

    // Title match
    if (normTitle.includes(cleanToken) || normTitleEn.includes(cleanToken)) {
      tokenScore += (normTitle.startsWith(cleanToken) || normTitleEn.startsWith(cleanToken)) ? 110 : 80;
    }

    // Keyword match
    for (const kw of allKeywords) {
      if (kw === cleanToken) {
        tokenScore = Math.max(tokenScore, 90);
      } else if (kw.includes(cleanToken)) {
        tokenScore = Math.max(tokenScore, 60);
      }
    }

    // Initials & Pinyin match (e.g. hw -> huawei, zj -> zunjie, yydx -> yaoyaolingxian, ps -> pansou)
    for (const ini of allInitials) {
      if (ini === cleanToken || ini.includes(cleanToken) || cleanToken.includes(ini)) {
        tokenScore = Math.max(tokenScore, 75);
      }
    }
    for (const py of allPinyin) {
      if (py === cleanToken || py.includes(cleanToken)) {
        tokenScore = Math.max(tokenScore, 65);
      }
    }

    // Badge match
    if (normBadge && normBadge.includes(cleanToken)) {
      tokenScore = Math.max(tokenScore, 50);
    }

    // Description match
    if (normDesc.includes(cleanToken) || normDescEn.includes(cleanToken)) {
      tokenScore = Math.max(tokenScore, 35);
    }

    // Category label match (e.g. typing "小游戏", "游戏", "工具", "产品", "game", "tool")
    const catZh = item.categoryLabel.toLowerCase();
    const catEn = item.categoryLabelEn.toLowerCase();
    if (catZh.includes(cleanToken) || catEn.includes(cleanToken) || item.category === cleanToken) {
      tokenScore = Math.max(tokenScore, 40);
    }

    // Fuzzy subsequence match (e.g. "尊车" matches "尊界...跑车")
    if (cleanToken.length >= 2 && (isSubsequence(cleanToken, normTitle) || isSubsequence(cleanToken, normDesc))) {
      tokenScore = Math.max(tokenScore, 30);
    }

    if (tokenScore > 0) {
      tokensMatched++;
      totalScore += tokenScore;
    }
  }

  // Multi-token match synergy
  if (tokens.length > 1 && tokensMatched === tokens.length) {
    totalScore += 160;
  }

  return totalScore;
};

// Text highlight component with high visual fidelity
const HighlightedText: React.FC<{ text: string; query: string; isDark: boolean; className?: string }> = ({
  text,
  query,
  isDark,
  className = ''
}) => {
  if (!query.trim() || !text) {
    return <span className={className}>{text}</span>;
  }
  const cleanTokens = query
    .trim()
    .toLowerCase()
    .split(/[\s,，、]+/)
    .filter(t => t.length > 0);
  
  if (cleanTokens.length === 0) {
    return <span className={className}>{text}</span>;
  }

  // Safe regex escaping
  const escaped = cleanTokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const isMatch = cleanTokens.some(t => t.toLowerCase() === part.toLowerCase());
        if (isMatch) {
          return (
            <mark
              key={i}
              className={`bg-transparent font-extrabold ${
                isDark ? 'text-amber-400 bg-amber-400/20 px-0.5 rounded' : 'text-blue-600 bg-blue-500/15 px-0.5 rounded'
              }`}
            >
              {part}
            </mark>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { themeMode, language, openProductNotice, isProductEnabled } = useTheme();
  const isDark = themeMode === 'dark';
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'product' | 'tool' | 'game'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setActiveFilter('all');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Ultra-sensitive ranking and filtering
  const filteredResults = useMemo(() => {
    const q = query.trim();

    // 1. Filter by category
    const pool = SEARCH_DATABASE.filter((item) => {
      if (activeFilter !== 'all' && item.category !== activeFilter) {
        return false;
      }
      return true;
    });

    if (!q) {
      return pool;
    }

    // 2. Score items and filter out zero-scores
    const scored = pool
      .map((item) => ({ item, score: calculateScore(item, q) }))
      .filter((entry) => entry.score > 0);

    // 3. Sort strictly by descending relevance score
    scored.sort((a, b) => b.score - a.score);

    return scored.map((entry) => entry.item);
  }, [query, activeFilter]);

  // Keep selected index within bounds
  useEffect(() => {
    if (selectedIndex >= filteredResults.length) {
      setSelectedIndex(Math.max(0, filteredResults.length - 1));
    }
  }, [filteredResults, selectedIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleSelect = (item: SearchItem) => {
    onClose();

    // Check if product is disabled
    if (item.category === 'product' && isProductEnabled && !isProductEnabled(item.id)) {
      openProductNotice?.(item.title, undefined, item.id);
      return;
    }

    if (item.isExternal) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(item.href);
    }
  };

  // Keyboard navigation (Arrow keys, Enter, Esc)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredResults.length ? (prev + 1) % filteredResults.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredResults.length ? (prev - 1 + filteredResults.length) % filteredResults.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const isZh = language === 'zh';

  // Popular quick discovery tags
  const hotTags = isZh 
    ? ['尊界', '竹知了', '遥遥领先', '网盘影视', 'AI投资', '磨砂玻璃', 'JSON', '密码生成']
    : ['Zunjie', 'huawei.dog', 'Roadster', 'PanSou', 'AI Agent', 'Glass', 'JSON', 'Token'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-hidden pointer-events-auto overscroll-none">
          {/* Transparent Backdrop (No black darkening or blur behind modal, matching other modals) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-transparent cursor-pointer"
          />

          {/* Modal Command Palette Surface */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            className={`relative z-10 w-full max-w-2xl rounded-[2.2rem] border overflow-hidden shadow-2xl liquid-glass flex flex-col max-h-[85vh] my-auto ${
              isDark 
                ? 'liquid-glass-dark text-white border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.85)]' 
                : 'liquid-glass-light text-gray-900 border-white/80 shadow-[0_25px_70px_rgba(0,0,0,0.12)]'
            }`}
          >
            {/* Top Specular Liquid Rim */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

            {/* Search Input Bar */}
            <div className={`p-4 sm:p-5 flex items-center space-x-3 border-b ${isDark ? 'border-white/10' : 'border-gray-200/40'}`}>
              <Search className={`shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder={isZh ? '输入产品、工具、小游戏、热词或拼音 (如: 尊界, hw, yydx)...' : 'Search products, tools, games, keywords or pinyin (e.g. zunjie, hw)...'}
                className="w-full bg-transparent border-none outline-none text-base sm:text-lg font-medium placeholder-gray-400 dark:placeholder-gray-500"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    setSelectedIndex(0);
                    inputRef.current?.focus();
                  }}
                  className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                  title={isZh ? '清空' : 'Clear'}
                >
                  <X size={16} />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                title={isZh ? '关闭' : 'Close'}
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Category Filters & Discovery Bar */}
            <div className={`px-4 sm:px-5 py-2.5 flex items-center justify-between border-b text-xs font-semibold ${
              isDark ? 'border-white/5 bg-white/[0.02]' : 'border-gray-100 bg-black/[0.01]'
            }`}>
              <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => { setActiveFilter('all'); setSelectedIndex(0); }}
                  className={`px-3 py-1 rounded-full transition-all shrink-0 ${
                    activeFilter === 'all'
                      ? (isDark ? 'bg-white/20 text-white font-bold' : 'bg-black/10 text-black font-bold')
                      : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black')
                  }`}
                >
                  {isZh ? '全部' : 'All'}
                </button>
                <button
                  onClick={() => { setActiveFilter('product'); setSelectedIndex(0); }}
                  className={`px-3 py-1 rounded-full transition-all shrink-0 flex items-center space-x-1 ${
                    activeFilter === 'product'
                      ? (isDark ? 'bg-blue-500/25 text-blue-300 font-bold border border-blue-500/40' : 'bg-blue-500/15 text-blue-600 font-bold border border-blue-500/30')
                      : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black')
                  }`}
                >
                  <span>{isZh ? '产品' : 'Products'}</span>
                </button>
                <button
                  onClick={() => { setActiveFilter('tool'); setSelectedIndex(0); }}
                  className={`px-3 py-1 rounded-full transition-all shrink-0 flex items-center space-x-1 ${
                    activeFilter === 'tool'
                      ? (isDark ? 'bg-purple-500/25 text-purple-300 font-bold border border-purple-500/40' : 'bg-purple-500/15 text-purple-600 font-bold border border-purple-500/30')
                      : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black')
                  }`}
                >
                  <span>{isZh ? '工具' : 'Tools'}</span>
                </button>
                <button
                  onClick={() => { setActiveFilter('game'); setSelectedIndex(0); }}
                  className={`px-3 py-1 rounded-full transition-all shrink-0 flex items-center space-x-1 ${
                    activeFilter === 'game'
                      ? (isDark ? 'bg-rose-500/25 text-rose-300 font-bold border border-rose-500/40' : 'bg-rose-500/15 text-rose-600 font-bold border border-rose-500/30')
                      : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black')
                  }`}
                >
                  <span>{isZh ? '小游戏' : 'Mini Games'}</span>
                </button>
              </div>

              {query && (
                <span className="text-[11px] text-gray-400 dark:text-gray-500 shrink-0 hidden sm:inline-block">
                  {isZh ? `匹配到 ${filteredResults.length} 项` : `${filteredResults.length} hits`}
                </span>
              )}
            </div>

            {/* Quick Hot Suggestions */}
            {!query && (
              <div className={`px-4 sm:px-5 py-2 flex items-center space-x-1.5 overflow-x-auto no-scrollbar border-b ${
                isDark ? 'border-white/5 bg-white/[0.01]' : 'border-gray-50 bg-black/[0.005]'
              }`}>
                <span className="text-[11px] text-gray-400 shrink-0 flex items-center space-x-1 mr-1">
                  <Zap size={12} className="text-amber-500" />
                  <span>{isZh ? '热搜:' : 'Hot:'}</span>
                </span>
                {hotTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setQuery(tag);
                      setSelectedIndex(0);
                    }}
                    className={`text-[11px] px-2.5 py-0.5 rounded-full transition-all shrink-0 ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10'
                        : 'bg-black/5 hover:bg-black/10 text-gray-700 hover:text-black border border-black/5'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Results List */}
            <div 
              ref={listRef} 
              className="p-2 sm:p-3 overflow-y-auto max-h-[50vh] sm:max-h-[55vh] space-y-1.5 scroll-smooth focus:outline-none"
            >
              {filteredResults.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-black/5 dark:bg-white/5 text-gray-400">
                    <Search size={22} />
                  </div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    {isZh ? `未找到与 “${query}” 相关的内容` : `No results found for "${query}"`}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {isZh ? '支持中文、拼音首字母(如 yydx, hw, zj)、英文缩写与模糊匹配' : 'Supports keywords, pinyin initials (e.g. yydx, hw, zj), and fuzzy search'}
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                    {hotTags.slice(0, 4).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setQuery(tag);
                          setSelectedIndex(0);
                        }}
                        className={`text-xs px-3 py-1 rounded-full transition-all ${
                          isDark ? 'bg-white/10 text-gray-200 hover:bg-white/20' : 'bg-black/5 text-gray-800 hover:bg-black/10'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                filteredResults.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      data-index={idx}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`group relative p-3 sm:p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-150 border ${
                        isSelected
                          ? (isDark 
                              ? 'bg-white/[0.12] border-white/20 shadow-lg text-white' 
                              : 'bg-black/[0.05] border-black/[0.1] shadow-md text-gray-950')
                          : 'border-transparent hover:bg-black/[0.02] dark:hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 pr-2">
                        {/* Left Icon Pill */}
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105"
                          style={{
                            backgroundColor: `${item.color}15`,
                            borderColor: `${item.color}35`,
                            color: item.color
                          }}
                        >
                          <Icon size={20} />
                        </div>

                        {/* Title & Desc */}
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2 mb-0.5">
                            <span className="text-sm sm:text-base font-bold tracking-tight truncate">
                              <HighlightedText 
                                text={isZh ? item.title : item.titleEn} 
                                query={query} 
                                isDark={isDark} 
                              />
                            </span>
                            {item.badge && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${item.badgeColor || 'border-gray-500/20 text-gray-400'}`}>
                                <HighlightedText 
                                  text={item.badge} 
                                  query={query} 
                                  isDark={isDark} 
                                />
                              </span>
                            )}
                          </div>
                          <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'} ${isSelected ? (isDark ? 'text-gray-300' : 'text-gray-700') : ''}`}>
                            <HighlightedText 
                              text={isZh ? item.desc : item.descEn} 
                              query={query} 
                              isDark={isDark} 
                            />
                          </p>
                        </div>
                      </div>

                      {/* Right Indicator */}
                      <div className="flex items-center space-x-2 shrink-0 pl-2">
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${
                          isDark ? 'border-white/10 text-gray-400 bg-white/5' : 'border-gray-200 text-gray-500 bg-gray-50'
                        }`}>
                          {isZh ? item.categoryLabel : item.categoryLabelEn}
                        </span>
                        {item.isExternal ? (
                          <ExternalLink size={14} className={isSelected ? 'text-blue-500' : 'text-gray-400 opacity-60'} />
                        ) : (
                          <ArrowRight size={14} className={`transition-transform duration-200 ${isSelected ? 'translate-x-0.5 text-blue-500' : 'text-gray-400 opacity-60'}`} />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer keyboard hints */}
            <div className={`px-4 sm:px-5 py-3 border-t flex items-center justify-between text-[11px] font-medium ${
              isDark ? 'border-white/10 text-gray-400 bg-white/[0.02]' : 'border-gray-200/40 text-gray-500 bg-black/[0.02]'
            }`}>
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono">↓</kbd>
                  <span>{isZh ? '切换' : 'Navigate'}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono">↵</kbd>
                  <span>{isZh ? '打开' : 'Select'}</span>
                </span>
              </div>
              <span className="text-gray-400 dark:text-gray-500">
                {isZh ? `找到 ${filteredResults.length} 个结果` : `${filteredResults.length} results`}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
