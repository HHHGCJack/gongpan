import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  BookOpen, 
  Cpu, 
  MessageSquare, 
  ArrowUpRight, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Volume2, 
  Layers, 
  Lock, 
  Send, 
  Activity, 
  Zap, 
  Database,
  Bookmark,
  FileCheck
} from 'lucide-react';
import { ShowcaseProduct } from '../src/data/showcases';
import { WORKSTATION_STRINGS } from '../src/data/workstationStrings';

interface Props {
  product: ShowcaseProduct;
  isDark: boolean;
  language: string;
  onVisit: () => void;
}

// -------------------------------------------------------------
// 1. PANSOU: INTERACTIVE REAL-TIME CLOUD SEARCH ENGINE WORKSTATION
// -------------------------------------------------------------
export const PansouWorkstation: React.FC<Props> = ({ product, isDark, language, onVisit }) => {
  const [selectedCloud, setSelectedCloud] = useState<'all' | 'quark' | 'ali' | 'baidu' | 'xunlei'>('all');
  const [searchQuery, setSearchQuery] = useState(
    language === 'zh' ? '奥本海默 4K IMAX' : 'Oppenheimer 2023 4K IMAX'
  );
  const [activeFilter, setActiveFilter] = useState<'all' | 'movie' | 'study' | 'soft'>('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const t = WORKSTATION_STRINGS.pansou;
  const langKey = (language in t.placeholder ? language : 'zh') as keyof typeof t.placeholder;

  const sampleResults = [
    {
      id: 1,
      title: language === 'zh' 
        ? '奥本海默 Oppenheimer 2023 [4K HDR 蓝光原盘 杜比视界 DDP5.1 国英双语]' 
        : 'Oppenheimer (2023) [4K HDR Remux Dolby Vision TrueHD 7.1 Atmos Dual Audio]',
      cloud: language === 'zh' ? '夸克网盘' : 'Quark Drive',
      cloudType: 'quark',
      size: '28.4 GB',
      res: '4K IMAX',
      speed: '58 MB/s',
      status: t.liveHealth[langKey] || '100% 存活',
      time: language === 'zh' ? '5分钟前更新' : '5m ago',
      category: 'movie'
    },
    {
      id: 2,
      title: language === 'zh'
        ? '沙丘2 Dune: Part Two [IMAX 增强版 60FPS 杜比全景声 无损精校字幕]'
        : 'Dune: Part Two (2024) [IMAX Enhanced 60FPS Dolby Atmos Lossless Subtitles]',
      cloud: language === 'zh' ? '阿里云盘' : 'Aliyun Drive',
      cloudType: 'ali',
      size: '19.2 GB',
      res: '4K UHD',
      speed: '62 MB/s',
      status: t.liveHealth[langKey] || '100% 存活',
      time: language === 'zh' ? '20分钟前更新' : '20m ago',
      category: 'movie'
    },
    {
      id: 3,
      title: language === 'zh'
        ? '全栈 AI 大模型架构与量化交易全套视频源码 [2026 最新完整合辑]'
        : 'Full-Stack Generative AI & Quant Backtesting Masterclass [2026 Edition]',
      cloud: language === 'zh' ? '百度网盘' : 'Baidu Drive',
      cloudType: 'baidu',
      size: '45.0 GB',
      res: '1080P HD',
      speed: '35 MB/s',
      status: t.liveHealth[langKey] || '100% 存活',
      time: language === 'zh' ? '1小时前更新' : '1h ago',
      category: 'study'
    },
    {
      id: 4,
      title: language === 'zh'
        ? 'Adobe Master Collection 2026 全套免激活旗舰版 [Win & Mac 苹果全芯片]'
        : 'Adobe Master Collection 2026 Pro Activated Suite [macOS & Windows M-Series]',
      cloud: language === 'zh' ? '迅雷云盘' : 'Xunlei Cloud',
      cloudType: 'xunlei',
      size: '14.8 GB',
      res: 'v2026.4',
      speed: '80 MB/s',
      status: t.liveHealth[langKey] || '100% 存活',
      time: language === 'zh' ? '3小时前更新' : '3h ago',
      category: 'soft'
    }
  ];

  const filtered = sampleResults.filter(item => {
    const matchCloud = selectedCloud === 'all' || item.cloudType === selectedCloud;
    const matchCat = activeFilter === 'all' || item.category === activeFilter;
    return matchCloud && matchCat;
  });

  const handleCopy = (idx: number) => {
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Search Input Bar & Cloud Filter */}
      <div className={`p-3.5 sm:p-5 rounded-[1.8rem] sm:rounded-3xl border transition-all ${
        isDark ? 'bg-black/60 border-white/15 shadow-2xl backdrop-blur-xl' : 'bg-white/80 border-white/90 shadow-xl backdrop-blur-xl'
      }`}>
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <div className={`flex-1 flex items-center px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl border ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
          }`}>
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0 mr-2.5 sm:mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.placeholder[langKey] || t.placeholder.zh}
              className="w-full bg-transparent text-xs sm:text-base font-medium outline-none min-w-0"
            />
            <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-bold ml-1.5 sm:ml-2">
              0.08s
            </span>
          </div>

          <button
            onClick={onVisit}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-transform shrink-0"
          >
            <Zap size={15} />
            <span>{t.searchBtn[langKey] || t.searchBtn.zh}</span>
          </button>
        </div>

        {/* Cloud Filter & Category Switcher */}
        <div className="mt-3.5 pt-3 border-t border-black/5 dark:border-white/10 flex flex-col gap-2.5">
          {/* Cloud Hub Filters */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            <span className="text-[11px] font-bold text-gray-400 shrink-0 mr-0.5 flex items-center">
              <Database size={12} className="mr-1" />
              {t.cloudSource[langKey] || t.cloudSource.zh}:
            </span>
            {[
              { id: 'all', label: t.filterAll[langKey] || t.filterAll.zh },
              { id: 'quark', label: t.filterQuark[langKey] || t.filterQuark.zh },
              { id: 'ali', label: t.filterAli[langKey] || t.filterAli.zh },
              { id: 'baidu', label: t.filterBaidu[langKey] || t.filterBaidu.zh },
              { id: 'xunlei', label: t.filterXunlei[langKey] || t.filterXunlei.zh }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCloud(tab.id as any)}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  selectedCloud === tab.id
                    ? 'bg-amber-500 text-white shadow-md'
                    : (isDark ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Type Category Filter */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-0.5 scrollbar-none no-scrollbar">
            <span className="text-[11px] font-bold text-gray-400 shrink-0 mr-0.5 flex items-center">
              <Layers size={12} className="mr-1" />
              {language === 'zh' ? '分类' : 'Category'}:
            </span>
            {[
              { id: 'all', label: language === 'zh' ? '全部类型' : 'All Types' },
              { id: 'movie', label: language === 'zh' ? '影视大片' : 'Cinema / 4K' },
              { id: 'study', label: language === 'zh' ? '学习教程' : 'Education' },
              { id: 'soft', label: language === 'zh' ? '软件工具' : 'Software' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id as any)}
                className={`px-2.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium whitespace-nowrap transition-all shrink-0 ${
                  activeFilter === cat.id
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : (isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800')
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Live Stream */}
      <div className="space-y-2.5 sm:space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-gray-400 px-1.5 gap-1">
          <span className="truncate">
            {language === 'zh'
              ? '找到约 10,480 条相关有效资源 (已实时过滤死链)'
              : 'Approx. 10,480 verified live resources indexed'}
          </span>
          <span className="text-emerald-500 font-bold flex items-center shrink-0">
            <ShieldCheck size={13} className="mr-1" />
            {language === 'zh' ? '健康度检测通过' : '100% Verified'}
          </span>
        </div>

        <div className="grid gap-2.5 sm:gap-3">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-3.5 sm:p-5 rounded-[1.4rem] sm:rounded-2xl border transition-all ${
                isDark 
                  ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-amber-500/30 backdrop-blur-md' 
                  : 'bg-white/80 border-white/90 hover:bg-white hover:border-amber-500/40 shadow-sm backdrop-blur-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      {item.cloud}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                      {item.res}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-emerald-500 font-bold flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1" />
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-base font-bold tracking-tight text-balance leading-snug">{item.title}</h4>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-gray-500 font-mono">
                    <span>{language === 'zh' ? '大小: ' : 'Size: '}{item.size}</span>
                    <span>•</span>
                    <span>{language === 'zh' ? '速度: ' : 'Speed: '}{item.speed}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 shrink-0 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-black/5 dark:border-white/5">
                  <button
                    onClick={() => handleCopy(idx)}
                    className={`min-h-[38px] sm:min-h-[40px] px-3 sm:px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center space-x-1.5 ${
                      copiedIndex === idx
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : (isDark ? 'bg-white/5 hover:bg-white/10 border-white/15 text-white' : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700')
                    }`}
                  >
                    {copiedIndex === idx ? <Check size={13} /> : <FileCheck size={13} />}
                    <span className="truncate">{copiedIndex === idx ? (t.copied[langKey] || t.copied.zh) : (t.copyLink[langKey] || t.copyLink.zh)}</span>
                  </button>

                  <button
                    onClick={onVisit}
                    className="min-h-[38px] sm:min-h-[40px] px-3 sm:px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md active:scale-95 transition-transform"
                  >
                    <span className="truncate">{t.directSave[langKey] || t.directSave.zh}</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. READING PRO: INTERACTIVE DUAL-PANE JOURNAL WORKBENCH
// -------------------------------------------------------------
export const ReadingProWorkbench: React.FC<Props> = ({ product, isDark, language, onVisit }) => {
  const [selectedArticle, setSelectedArticle] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(true);

  const t = WORKSTATION_STRINGS.reading;
  const langKey = (language in t.magazineTag ? language : 'zh') as keyof typeof t.magazineTag;

  const articles = [
    {
      source: 'The Economist · 2026',
      issue: '2026 Special Global Issue',
      title: 'The Quantum Leap in Macroeconomic Forecasting',
      original: 'The rapid integration of autonomous neural networks into central bank econometric models is fundamentally redefining the policy transmission boundary between monetary tightening and labor elasticity.',
      translation: language === 'zh'
        ? '自主神经网络融入央行计量经济学模型，正在从根本上重新定义货币紧缩与劳动力弹性之间的政策传导边界。'
        : 'The integration of autonomous AI neural networks into central bank econometrics is redefining policy transmission boundaries between rate cycles and labor dynamics.',
      analysis: {
        keywords: [
          { 
            word: 'Econometric Models', 
            exp: language === 'zh' ? '计量经济学模型，用于分析经济指标因果' : 'Econometric models analyzing macroeconomic causality' 
          },
          { 
            word: 'Policy Transmission Boundary', 
            exp: language === 'zh' ? '政策传导边界，指央行货币工具影响实体的有效范围' : 'Effective transmission reach of central bank rate instruments' 
          },
          { 
            word: 'Labor Elasticity', 
            exp: language === 'zh' ? '劳动力弹性，衡量就业市场对利率变化的敏感度' : 'Sensitivity of employment markets to rate fluctuations' 
          }
        ],
        grammar: language === 'zh'
          ? '主干结构为 [The rapid integration (主语) ... is fundamentally redefining (进行时谓语) ... the boundary (宾语)]。嵌套分词短语充当定语。'
          : 'Core syntactic backbone: [The rapid integration (Subject) ... is fundamentally redefining (Predicate) ... the boundary (Object)].'
      }
    },
    {
      source: 'The New Yorker · 2026',
      issue: 'Culture & Literature Review',
      title: 'Architectures of Silence: Modern Urban Solitude',
      original: 'In the relentless hum of the modern metropolis, solitude is rarely a spatial absence of noise, but rather an acquired acoustic immunity to perpetual hyper-connectivity.',
      translation: language === 'zh'
        ? '在现代大都市无休止的喧嚣中，独处很少是空间意义上的无声，而是一种对无休止超连接所习得的听觉免疫。'
        : 'In modern metropolises, solitude is rarely a physical void of sound, but an acquired acoustic immunity to hyper-connectivity.',
      analysis: {
        keywords: [
          { 
            word: 'Relentless Hum', 
            exp: language === 'zh' ? '无休止的嗡鸣与喧嚣' : 'Unceasing urban background noise and information friction' 
          },
          { 
            word: 'Acoustic Immunity', 
            exp: language === 'zh' ? '听觉免疫，比喻现代人对信息噪音的心理防御' : 'Psychological defense shielding consciousness from sensory overload' 
          }
        ],
        grammar: language === 'zh'
          ? '经典 [not... but rather...] 对比结构，用于升华独处在数字时代的精神哲学定义。'
          : 'Refined [not... but rather...] contrastive structure redefining digital solitude.'
      }
    }
  ];

  const current = articles[selectedArticle];

  return (
    <div className="w-full space-y-6">
      {/* Reader Control Header */}
      <div className={`p-4 rounded-3xl border flex flex-wrap items-center justify-between gap-3 ${
        isDark ? 'bg-black/50 border-white/15' : 'bg-white/80 border-white/90 shadow-md'
      }`}>
        <div className="flex items-center space-x-2">
          {articles.map((art, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedArticle(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedArticle === idx
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : (isDark ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
              }`}
            >
              {art.source}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className={`px-3.5 py-1.5 rounded-xl border font-bold flex items-center space-x-1.5 transition-all ${
              showAnalysis 
                ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' 
                : (isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-700')
            }`}
          >
            <Layers size={13} />
            <span>{t.syntaxTab[langKey] || t.syntaxTab.zh}</span>
          </button>
        </div>
      </div>

      {/* Dual Column Reading Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Authentic Typography & Translation */}
        <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/90 border-white/90 shadow-xl'
        }`}>
          <div className="flex items-center justify-between border-b pb-3 border-black/5 dark:border-white/10">
            <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider">
              {current.issue}
            </span>
            <span className="text-[11px] font-mono text-gray-400">VECTOR CANVAS 60 FPS</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight leading-snug">
            {current.title}
          </h3>

          <div className="p-4 sm:p-6 rounded-2xl border font-serif leading-relaxed space-y-4 bg-emerald-500/[0.03] border-emerald-500/20 text-base sm:text-lg">
            <p className="text-emerald-500/90 font-mono text-xs uppercase tracking-widest">ORIGINAL EXCERPT</p>
            <p className="italic font-medium">{current.original}</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-400 flex items-center">
              <Bookmark size={13} className="mr-1 text-emerald-500" />
              {language === 'zh' ? '精译解析对照:' : 'Bilingual Translation & Annotation:'}
            </p>
            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              {current.translation}
            </p>
          </div>
        </div>

        {/* Right Column: Grammar Tree & Vocabulary Flashcards */}
        <div className={`lg:col-span-5 p-6 rounded-3xl border space-y-4 flex flex-col justify-between ${
          isDark ? 'bg-black/40 border-white/10' : 'bg-emerald-50/50 border-emerald-100 shadow-sm'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-500 border-b pb-2 border-emerald-500/20">
              <Sparkles size={14} />
              <span>{t.corpusTab[langKey] || t.corpusTab.zh}</span>
            </div>

            <div className="space-y-2.5">
              {current.analysis.keywords.map((kw, i) => (
                <div key={i} className={`p-3 rounded-xl border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-emerald-100 shadow-xs'
                }`}>
                  <div className="text-xs font-mono font-black text-emerald-500">{kw.word}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{kw.exp}</div>
                </div>
              ))}
            </div>

            {showAnalysis && (
              <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
                isDark ? 'bg-blue-950/30 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-900 border-blue-200'
              }`}>
                <div className="font-bold mb-1 flex items-center text-blue-400">
                  <Layers size={13} className="mr-1" />
                  {t.syntaxTab[langKey] || t.syntaxTab.zh}:
                </div>
                {current.analysis.grammar}
              </div>
            )}
          </div>

          <button
            onClick={onVisit}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform"
          >
            <BookOpen size={16} />
            <span>{product.ctaText || (language === 'zh' ? '进入杂志期刊阅览器' : 'Open Reading Workbench')}</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. AI INVESTMENT AGENT: REAL-TIME QUANTITATIVE TERMINAL
// -------------------------------------------------------------
export const AIAgentTerminal: React.FC<Props> = ({ product, isDark, language, onVisit }) => {
  const [selectedAsset, setSelectedAsset] = useState<'NVDA' | 'BTC' | 'GOLD'>('NVDA');

  const t = WORKSTATION_STRINGS.ai;
  const langKey = (language in t.metricReturn ? language : 'zh') as keyof typeof t.metricReturn;

  const assetData = {
    NVDA: {
      name: language === 'zh' ? 'NVDA · 英伟达 (NVIDIA Corporation)' : 'NVDA · NVIDIA Corporation',
      price: '$138.45',
      change: '+4.28%',
      isUp: true,
      rating: 'Strong Buy (9.4/10)',
      riskLevel: language === 'zh' ? '中等风险 · 景气度极高' : 'Moderate Risk · High Momentum',
      factors: [
        { 
          name: language === 'zh' ? '财务质量与自由现金流' : 'Balance Sheet & Free Cash Flow', 
          score: 96, 
          desc: language === 'zh' ? '毛利率维持 75%+，数据中心订单排至 2027 年' : 'Gross margins 75%+, AI DC order backlog secured' 
        },
        { 
          name: language === 'zh' ? '机构资金流入 (Smart Money)' : 'Institutional Smart Money Inflows', 
          score: 92, 
          desc: language === 'zh' ? '顶级量化基金连续 14 个交易日呈现主动买盘' : 'Continuous net active inflows over 14 sessions' 
        },
        { 
          name: language === 'zh' ? '波动率与估值安全边际' : 'Volatility & Valuation Margin of Safety', 
          score: 85, 
          desc: language === 'zh' ? '远期 PEG 为 1.15，相较 AI 产业链具备防御缓冲' : 'Forward PEG 1.15 presents sound risk-reward buffer' 
        }
      ],
      aiSummary: language === 'zh'
        ? '大模型金融大脑综合评估：宏观流动性宽松与算力基础设施需求共振，建议采取分批逢低吸纳策略，目标仓位 18% - 22%。'
        : 'Neural Quantitative Synthesis: Infrastructure demand and easing liquidity align. Recommended DCA accumulation with 18%-22% allocation.'
    },
    BTC: {
      name: 'BTC / USD · Bitcoin',
      price: '$92,450.00',
      change: '+6.12%',
      isUp: true,
      rating: 'Accumulate (8.8/10)',
      riskLevel: language === 'zh' ? '高波动 · 链上活跃度激增' : 'High Volatility · Surge in On-Chain Activity',
      factors: [
        { 
          name: language === 'zh' ? '链上巨鲸钱包异动' : 'On-Chain Whale Net Accumulation', 
          score: 89, 
          desc: language === 'zh' ? '长期持有者抛压减缓，交易所储备持续流出' : 'HODLer sell pressure subsiding, reserves leaving exchanges' 
        },
        { 
          name: language === 'zh' ? '宏观流动性与 ETF 净流入' : 'Macro Liquidity & Spot ETF Inflows', 
          score: 94, 
          desc: language === 'zh' ? '单周现货 ETF 净流入超过 12 亿美元' : 'Weekly spot ETF net inflows exceeded $1.2B' 
        },
        { 
          name: language === 'zh' ? '衍生品资金费率健康度' : 'Derivatives Funding Rate Balance', 
          score: 82, 
          desc: language === 'zh' ? '多空博弈处于中性温和区间，未见极端杠杆过热' : 'Neutral funding rate indicates organic spot-driven action' 
        }
      ],
      aiSummary: language === 'zh'
        ? '链上雷达监测显示主力资金处于有序吸筹周期，建议密切关注 $89,500 关键支撑位，以定投策略平滑波动。'
        : 'On-chain telemetry signals steady institutional accumulation. Watch key $89,500 support level and average in over time.'
    },
    GOLD: {
      name: 'XAU / USD · Gold Spot',
      price: '$2,745.80',
      change: '+0.75%',
      isUp: true,
      rating: 'Overweight (9.1/10)',
      riskLevel: language === 'zh' ? '极低风险 · 终极避险资产' : 'Low Risk · Safe Haven Asset',
      factors: [
        { 
          name: language === 'zh' ? '全球央行购金强度' : 'Central Bank Net Purchases', 
          score: 98, 
          desc: language === 'zh' ? '新兴市场央行连续 18 个月净买入黄金储备' : 'Emerging central banks net purchasers for 18 consecutive months' 
        },
        { 
          name: language === 'zh' ? '地缘政治与通胀预期' : 'Geopolitical Hedging & Real Rates', 
          score: 90, 
          desc: language === 'zh' ? '实际利率下行周期中，去美元化叙事持续发酵' : 'Falling real yields bolster long-term monetary sovereignty' 
        },
        { 
          name: language === 'zh' ? '持仓拥挤度与技术形态' : 'Market Positioning & Breakout Structure', 
          score: 86, 
          desc: language === 'zh' ? '处于历史大级别突破上升通道中' : 'Sustained secular breakout channel on monthly charts' 
        }
      ],
      aiSummary: language === 'zh'
        ? '地缘博弈与全球央行资产多元化配置驱动长周期牛市，建议将其作为组合中的核心抗脆弱锚定资产，配置比例 10%-15%。'
        : 'Secular driver underpinned by global reserve diversification. Recommended as 10%-15% antifragile portfolio hedge.'
    }
  };

  const current = assetData[selectedAsset];

  return (
    <div className="w-full space-y-6">
      {/* Asset Selector Tabs */}
      <div className={`p-4 rounded-3xl border flex items-center justify-between flex-wrap gap-3 ${
        isDark ? 'bg-black/50 border-white/15' : 'bg-white/80 border-white/90 shadow-md'
      }`}>
        <div className="flex items-center space-x-2">
          {(['NVDA', 'BTC', 'GOLD'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedAsset(key)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedAsset === key
                  ? 'bg-blue-600 text-white shadow-md'
                  : (isDark ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="text-gray-400">
            {language === 'zh' ? '推断更新: 实时' : 'Telemetry: Real-time'}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            LIVE 24/7
          </span>
        </div>
      </div>

      {/* Main Terminal Dashboard */}
      <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
        isDark ? 'bg-black/60 border-white/15 shadow-2xl' : 'bg-white/95 border-white/90 shadow-xl'
      }`}>
        {/* Asset Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-black/5 dark:border-white/10">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg sm:text-2xl font-black tracking-tight">{current.name}</h3>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-bold border border-blue-500/20">
                {current.riskLevel}
              </span>
            </div>
            <div className="flex items-baseline space-x-3 mt-1 font-mono">
              <span className="text-2xl sm:text-3xl font-black">{current.price}</span>
              <span className="text-sm font-bold text-emerald-500">{current.change}</span>
            </div>
          </div>

          <div className="sm:text-right">
            <div className="text-xs text-gray-400 font-mono mb-1">
              {language === 'zh' ? 'AI 综合投资评级' : 'Neural Factor Rating'}
            </div>
            <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono font-black text-sm inline-block shadow-sm">
              {current.rating}
            </div>
          </div>
        </div>

        {/* Quant Factors Progression */}
        <div className="space-y-4">
          <div className="text-xs font-mono font-bold text-blue-500 uppercase tracking-widest flex items-center">
            <Activity size={14} className="mr-1.5" />
            {language === 'zh' ? '多因子量化推断雷达 (Institutional Factor Engine)' : 'Multi-Factor Neural Telemetry (Institutional Engine)'}
          </div>

          <div className="grid gap-3">
            {current.factors.map((factor, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border space-y-2 ${
                isDark ? 'bg-white/[0.02] border-white/10' : 'bg-gray-50 border-gray-100'
              }`}>
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                  <span>{factor.name}</span>
                  <span className="font-mono text-blue-500 font-black">{factor.score} / 100</span>
                </div>
                
                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${factor.score}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-400 rounded-full"
                  />
                </div>

                <p className="text-xs text-gray-400">{factor.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Action Summary */}
        <div className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
          isDark ? 'bg-blue-950/20 text-blue-200 border-blue-500/30' : 'bg-blue-50 text-blue-900 border-blue-200'
        }`}>
          <span className="font-bold text-blue-500 font-mono">
            {language === 'zh' ? '【AI 决策建议与风控】: ' : '【Neural Synthesis & Risk Verdict】: '}
          </span>
          {current.aiSummary}
        </div>

        <button
          onClick={onVisit}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-xl shadow-blue-500/25 active:scale-95 transition-transform"
        >
          <Cpu size={18} />
          <span>{product.ctaText || (language === 'zh' ? '打开专业 AI 投资控制台' : 'Launch AI Terminal')}</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 4. GONGPAN CHAT: INTERACTIVE E2EE ENCRYPTED MESSENGER TERMINAL
// -------------------------------------------------------------
export const GongPanChatMessenger: React.FC<Props> = ({ product, isDark, language, onVisit }) => {
  const t = WORKSTATION_STRINGS.chat;
  const langKey = (language in t.statusSecured ? language : 'zh') as keyof typeof t.statusSecured;

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'developer', 
      name: 'GongPan Dev Core', 
      text: language === 'zh' 
        ? '端到端加密通道建立成功。密钥已存入安全飞地（Secure Enclave）。🔒' 
        : 'E2EE tunnel established. Session key generated inside local hardware enclave. 🔒', 
      time: '10:42' 
    },
    { 
      id: 2, 
      sender: 'user', 
      name: language === 'zh' ? 'You (客户端)' : 'You (Local Device)', 
      text: language === 'zh'
        ? '太强了！发送超大文件原图不压缩，体验完全不输 Telegram。⚡️'
        : 'Impressive! Lossless file transfer without compression and zero message tracking. ⚡️', 
      time: '10:43' 
    },
    { 
      id: 3, 
      sender: 'developer', 
      name: 'GongPan Dev Core', 
      text: language === 'zh'
        ? '全新万人群组架构与消息零日志中继已全量上线，欢迎体验！🚀'
        : 'Massive group mesh and zero-knowledge blind relays are live. Enjoy! 🚀', 
      time: '10:44' 
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      name: language === 'zh' ? 'You (客户端)' : 'You (Local Device)',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setInputText('');

    // Simulated instant reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'developer',
          name: 'GongPan Dev Core',
          text: language === 'zh'
            ? '收到加密消息帧。已通过分布式低延迟中继广播完成校验。'
            : 'Encrypted packet received & acknowledged via low-latency blind relay.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Security Status */}
      <div className={`p-4 rounded-3xl border flex items-center justify-between flex-wrap gap-3 ${
        isDark ? 'bg-black/50 border-white/15' : 'bg-white/80 border-white/90 shadow-md'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Lock size={16} />
          </div>
          <div>
            <div className="text-xs font-bold tracking-tight">{t.statusSecured[langKey] || t.statusSecured.zh}</div>
            <div className="text-[10px] font-mono text-gray-400">
              {language === 'zh' ? '状态: 零知情证明生效中 • 零日志留存' : 'Status: Zero-knowledge active • Zero log retention'}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-cyan-400">0.02s</span>
        </div>
      </div>

      {/* Interactive Chat Window */}
      <div className={`rounded-3xl border overflow-hidden flex flex-col h-[420px] ${
        isDark ? 'bg-black/70 border-white/15 shadow-2xl' : 'bg-white/95 border-white/90 shadow-xl'
      }`}>
        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <span className="text-[10px] text-gray-400 mb-1 px-1">{msg.name} • {msg.time}</span>
              <div className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium max-w-[85%] shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-sky-600 text-white rounded-br-none shadow-sky-600/20'
                  : (isDark ? 'bg-white/10 text-white border border-white/10 rounded-bl-none' : 'bg-gray-100 text-gray-900 border border-gray-200 rounded-bl-none')
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className={`p-3 border-t flex items-center space-x-2 ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
        }`}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.inputPlaceholder[langKey] || t.inputPlaceholder.zh}
            className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm outline-none font-medium"
          />
          
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-white transition-all shadow-md active:scale-95"
          >
            <Send size={15} />
          </button>
        </form>
      </div>

      <button
        onClick={onVisit}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-xl shadow-sky-500/25 active:scale-95 transition-transform"
      >
        <MessageSquare size={18} />
        <span>{product.ctaText || (language === 'zh' ? '立即进入 GongPan Chat 私密暢聊' : 'Launch GongPan Chat')}</span>
        <ArrowUpRight size={16} />
      </button>
    </div>
  );
};
