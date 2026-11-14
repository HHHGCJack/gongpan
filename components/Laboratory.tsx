import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import { 
  Copy, 
  Check, 
  Code, 
  Terminal, 
  Layers, 
  FileText, 
  AlertCircle,
  Gamepad2,
  Wrench,
  ExternalLink,
  Sparkles,
  Play,
  Flame,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { BackButton } from './BackButton';

export const Laboratory: React.FC = () => {
  const { themeMode, language, showToast } = useTheme();
  const location = useLocation();
  const selectedGame = new URLSearchParams(location.search).get('game');
  
  // Category Active State: 'tools' (工具) | 'games' (小游戏)
  const [activeCategory, setActiveCategory] = useState<'tools' | 'games'>('tools');

  // UI Tab Active State for Tools
  const [activeTab, setActiveTab] = useState<'glass' | 'json' | 'codec' | 'token'>('glass');
  const isDark = themeMode === 'dark';

  // Sync category with URL parameters or hash
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category') || params.get('tab');
    if (cat === 'games' || cat === 'game') {
      setActiveCategory('games');
    } else if (cat === 'tools' || cat === 'tool') {
      setActiveCategory('tools');
    } else if (location.hash === '#games') {
      setActiveCategory('games');
    }
  }, [location.search, location.hash]);

  useEffect(() => {
    if (activeCategory !== 'games' || !selectedGame) return;
    const timer = setTimeout(() => {
      const card = document.getElementById(`game-${selectedGame}`);
      card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card?.focus({ preventScroll: true });
    }, 300);
    return () => clearTimeout(timer);
  }, [activeCategory, selectedGame]);

  // State: Common copied indicator
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // States: Glassmorphism designer
  const [glassBlur, setGlassBlur] = useState<number>(16);
  const [glassOpacity, setGlassOpacity] = useState<number>(25);
  const [glassSaturation, setGlassSaturation] = useState<number>(140);
  const [glassBorderOpacity, setGlassBorderOpacity] = useState<number>(15);

  // States: JSON validation & formatter
  const [jsonInput, setJsonInput] = useState<string>('');
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [jsonIndent, setJsonIndent] = useState<number>(2);
  const [jsonIsValid, setJsonIsValid] = useState<boolean | null>(null);
  const [jsonError, setJsonError] = useState<string>('');

  // States: Codec (Base64 & URL)
  const [codecInput, setCodecInput] = useState<string>('');
  const [codecOutput, setCodecOutput] = useState<string>('');
  const [codecError, setCodecError] = useState<string>('');

  // States: Strong key generator
  const [tokenLength, setTokenLength] = useState<number>(16);
  const [tokenUpper, setTokenUpper] = useState<boolean>(true);
  const [tokenLower, setTokenLower] = useState<boolean>(true);
  const [tokenNumbers, setTokenNumbers] = useState<boolean>(true);
  const [tokenSymbols, setTokenSymbols] = useState<boolean>(true);
  const [generatedToken, setGeneratedToken] = useState<string>('');
  const [tokenStrength, setTokenStrength] = useState<'weak' | 'medium' | 'strong'>('strong');

  // Trigger copy tool
  const triggerCopy = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    showToast(language === 'zh' ? '复制成功！' : 'Copied successfully!');
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Trigger base64 / URL encoding-decoding
  const runCodec = (action: 'b64-encode' | 'b64-decode' | 'url-encode' | 'url-decode') => {
    setCodecError('');
    if (!codecInput) {
      setCodecOutput('');
      return;
    }
    try {
      if (action === 'b64-encode') {
        // Safe standard unicode Base64 encoding
        const encoder = new TextEncoder();
        const data = encoder.encode(codecInput);
        let binString = "";
        data.forEach((byte) => {
          binString += String.fromCharCode(byte);
        });
        setCodecOutput(btoa(binString));
      } else if (action === 'b64-decode') {
        try {
          const binString = atob(codecInput);
          const uint8Array = Uint8Array.from(binString, (m) => m.codePointAt(0) || 0);
          const decoder = new TextDecoder();
          setCodecOutput(decoder.decode(uint8Array));
        } catch {
          throw new Error(language === 'zh' ? '无效的 Base64 编码格式' : 'Invalid Base64 format');
        }
      } else if (action === 'url-encode') {
        setCodecOutput(encodeURIComponent(codecInput));
      } else if (action === 'url-decode') {
        try {
          setCodecOutput(decodeURIComponent(codecInput));
        } catch {
          throw new Error(language === 'zh' ? '无效的 URL 编码格式' : 'Invalid URL encoded format');
        }
      }
    } catch (err: any) {
      setCodecError(err.message || 'Error occurred');
      setCodecOutput('');
    }
  };

  // Format or format minified JSON
  const processJson = (mode: 'beautify' | 'minify') => {
    setJsonError('');
    setJsonIsValid(null);
    if (!jsonInput.trim()) {
      setJsonOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonIsValid(true);
      if (mode === 'beautify') {
        setJsonOutput(JSON.stringify(parsed, null, jsonIndent));
      } else {
        setJsonOutput(JSON.stringify(parsed));
      }
    } catch (err: any) {
      setJsonIsValid(false);
      setJsonError(err.message || 'JSON parsing error');
      setJsonOutput('');
    }
  };

  // Generate ultra high entropy keys
  const generateTokenNow = () => {
    const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowers = 'abcdefghijklmnopqrstuvwxyz';
    const nums = '0123456789';
    const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let allowedChars = '';
    if (tokenUpper) allowedChars += uppers;
    if (tokenLower) allowedChars += lowers;
    if (tokenNumbers) allowedChars += nums;
    if (tokenSymbols) allowedChars += syms;

    if (!allowedChars) {
      setGeneratedToken('');
      return;
    }

    let result = '';
    const length = tokenLength;
    const randomArray = new Uint32Array(length);
    window.crypto.getRandomValues(randomArray);

    for (let i = 0; i < length; i++) {
      result += allowedChars[randomArray[i] % allowedChars.length];
    }

    setGeneratedToken(result);

    // Dynamic strength scoring
    let checkedCount = 0;
    if (tokenUpper) checkedCount++;
    if (tokenLower) checkedCount++;
    if (tokenNumbers) checkedCount++;
    if (tokenSymbols) checkedCount++;

    if (length < 8 || checkedCount <= 1) {
      setTokenStrength('weak');
    } else if (length < 12 || checkedCount <= 2) {
      setTokenStrength('medium');
    } else {
      setTokenStrength('strong');
    }
  };

  // Generate password on mount and option toggles
  useEffect(() => {
    generateTokenNow();
  }, [tokenLength, tokenUpper, tokenLower, tokenNumbers, tokenSymbols]);

  // Multilanguage Translations setup
  const translations = {
    zh: {
      labTitle: "创新实验室",
      labSub: "极客专属的前沿实验性交互工具箱与在线沙盒。所有数据就地即时运算，确保纯粹的隐私与安全。",
      categories: {
        tools: "工具",
        games: "小游戏",
        toolsCount: "4 款工具",
        gamesCount: "2 款小游戏",
        toolsSubtitle: "极客专属的前沿实验性交互工具箱与在线沙盒。所有数据就地即时运算，确保纯粹的隐私与安全。",
        gamesSubtitle: "精选趣味轻量级网页互动小游戏，点击即可极速跳转畅玩，免下载无需安装。"
      },
      games: {
        title: "实验性小游戏",
        subtitle: "留一点时间，给纯粹的好玩。",
        instantBadge: "网页直开 · 免安装",
        playBtn: "开始游戏",
        copyLinkBtn: "复制链接",
        openNewTab: "在新窗口打开",
        jumpPrompt: "点击跳转至游戏网页",
        items: [
          {
            id: 'roadster',
            title: 'Roadster · 气动逃逸',
            subtitle: '百万级尊界旗舰突袭 · 全频段遥遥领先',
            desc: '“当百万级东方旗舰尊界以雷霆之势席卷公路，车头璀璨星徽伴随着余总亲授的‘遥遥领先’、‘绝对对得起那四个字’、‘一千万以内最好的SUV’、‘让他们永远追不上’原声震撼灌顶！凡俗座驾在如此纯血豪威面前，唯有长按空格启动冷气推进器冲向天空，方能感受被时代巨轮遥遥领先的尊贵压迫感。”',
            url: 'https://roadster-game-d4gk0fp9k5bde5fd2-1508914020.tcloudbaseapp.com/roadster-game/',
            tag: '遥遥领先',
            features: ['🏆 尊界 S800 亲临公路，随机震撼播放五大天籁原声金句', '🔥 凡人跑车紧急升空避让，感受东方豪华旗舰的无上威严', '🚗 绝对对得起那四个字，见证连尾灯都让人永远追不上的魄力'],
            themeGradient: 'from-rose-500/20 via-orange-500/10 to-transparent',
            themeBorder: 'border-rose-500/30 hover:border-rose-500/60',
            glowColor: 'rgba(244, 63, 94, 0.25)',
            badgeColor: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
            buttonGradient: 'from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 shadow-rose-500/20',
            type: '旗舰巡礼'
          },
          {
            id: 'zhuzhiliao',
            title: '竹知了 · 一转就哇哇叫',
            subtitle: 'huawei.dog 纯血声学奇迹 · 响彻云霄之音',
            desc: '“傲立于顶级尊贵域名 huawei.dog 之上的划时代东方声学巨制！无需任何高深算力堆砌，只需按住指针优雅转动，即可原汁原味召唤‘一千万以内最好’、‘都买得起’、‘啊我们这个是吧’与‘遥遥领先’天籁圣训。指尖转速越快，澎湃的爱国信仰与声浪越震耳欲聋，全球累计狂转超一亿次，真正实现了让全世界友商在耳朵里都永远追不上的超凡境界！”',
            url: 'https://huawei.dog/',
            tag: '纯血声学',
            features: ['🌐 尊享顶级域名 huawei.dog，血统纯正声学体验', '🎙️ 完美收录余总‘一千万以内最好’、‘遥遥领先’天籁圣训', '⚡ 累计狂转突破 1 亿次，转得越猛、信仰越强、叫声越宏亮'],
            themeGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
            themeBorder: 'border-emerald-500/30 hover:border-emerald-500/60',
            glowColor: 'rgba(16, 185, 129, 0.25)',
            badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
            buttonGradient: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20',
            type: '声学奇迹'
          }
        ]
      },
      tabs: {
        glass: "磨砂玻璃卡片生成器",
        json: "JSON 格式化校验",
        codec: "Base64 & URL 编解码",
        token: "安全随机密钥生成器"
      },
      glass: {
        title: "Liquid Glassmorphism 磨砂玻璃预设面板",
        subtitle: "交互式调整高斯模糊与色彩深度，实时复制 Tailwind 或纯 CSS 类名。",
        blur: "高斯模糊度",
        opacity: "背景透明度",
        saturation: "色彩饱和度",
        border: "边缘线条不透明",
        preview: "玻璃效果实时演示",
        cardTitle: "探索未知边界",
        cardDesc: "GongPan Laboratory 引领极简流动的透明高精视觉美感。",
        copyCss: "复制 CSS 纯样式",
        copyTw: "复制 Tailwind 类名",
      },
      json: {
        title: "JSON 深度格式化与合规校验",
        subtitle: "粘贴或键入任意 JSON 内容，支持一键进行压缩或标准化美化缩进。",
        inputLabel: "原始 JSON 输入",
        outputLabel: "格式化输出结果",
        btnBeautify: "美化排版",
        btnMinify: "紧凑压缩",
        indent2: "2 空格缩进",
        indent4: "4 空格缩进",
        valid: "合规 JSON 数据格式！",
        invalid: "语法错误:"
      },
      codec: {
        title: "Base64 与 URL 安全高效安全编解码",
        subtitle: "秒级将文本与代码在标准 Base64 或 URL 格式之间流畅转换。",
        inputLabel: "待处理文本",
        outputLabel: "编解码结果",
        btnB64Enc: "Base64 编码",
        btnB64Dec: "Base64 解码",
        btnUrlEnc: "URL 编码",
        btnUrlDec: "URL 解码",
        error: "格式解析失败:"
      },
      token: {
        title: "工业级高熵密钥 / 强密码安全生成器",
        subtitle: "采用浏览器底层安全随机数（webcrypto），保障生成的口令具备极高不可破解度。",
        length: "密钥生成长度",
        opts: "字符组成规则",
        upper: "大写字母 (A-Z)",
        lower: "小写字母 (a-z)",
        num: "独立数字 (0-9)",
        sym: "特殊字符 (!@#...)",
        strength: "密钥破译安全级",
        weak: "【偏弱】建议延长位数或勾选多元字符",
        medium: "【中等安全】适用于一般网站账户",
        strong: "【极高安全】不可破解，支持现代高防护口令",
        btnRefresh: "新生成一组",
        copyBtn: "复制安全密钥"
      }
    },
    en: {
      labTitle: "Inno Laboratory",
      labSub: "An interactive utility toolbox & playground built specifically for web geeks and developers. Run locally instantly.",
      categories: {
        tools: "Tools",
        games: "Mini Games",
        toolsCount: "4 Tools",
        gamesCount: "2 Games",
        toolsSubtitle: "An interactive utility toolbox & playground built specifically for web geeks and developers. Run locally instantly.",
        gamesSubtitle: "Curated lightweight web mini-games. Click to jump directly and play in browser without installation."
      },
      games: {
        title: "Experimental Mini-Games",
        subtitle: "A little time for the simple joy of play.",
        instantBadge: "Browser Instant Play · No Install",
        playBtn: "Play Now",
        copyLinkBtn: "Copy Link",
        openNewTab: "Open in New Tab",
        jumpPrompt: "Click to jump to game website",
        items: [
          {
            id: 'roadster',
            title: 'Roadster · Air Run',
            subtitle: 'Million-Dollar Zunjie Flagship Blitz · Unrivaled Supremacy',
            desc: '"When the pinnacle million-dollar flagship Zunjie dominates the highway with thunderous authority, beaming Yu Chengdong\'s sacred aphorisms (\'Far, Far Ahead\', \'Truly worthy of those four words\', \'Best SUV under 10 million\', \'Leave them hopelessly behind\') right into your soul! Mere mortal sports cars can only hold space to blast cold-gas thrusters and take flight, basking in the supreme prestige of being outpaced by history\'s greatest automotive miracle."',
            url: 'https://roadster-game-d4gk0fp9k5bde5fd2-1508914020.tcloudbaseapp.com/roadster-game/',
            tag: 'Far Ahead',
            features: ['🏆 Zunjie S800 blitzes the highway with 5 authentic voice clips', '🔥 Mere sports cars take flight to salute the supreme flagship aura', '🚗 Truly worthy of those four words, unmatched and unreachable'],
            themeGradient: 'from-rose-500/20 via-orange-500/10 to-transparent',
            themeBorder: 'border-rose-500/30 hover:border-rose-500/60',
            glowColor: 'rgba(244, 63, 94, 0.25)',
            badgeColor: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
            buttonGradient: 'from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 shadow-rose-500/20',
            type: 'Flagship Salute'
          },
          {
            id: 'zhuzhiliao',
            title: 'Bamboo Cicada · Whirling Toy',
            subtitle: 'Purebred Acoustic Wonder on "huawei.dog"',
            desc: '"An epoch-making acoustic miracle gloriously hosted on the ultra-prestigious domain huawei.dog! No complex chipsets required—simply hold and spin the pointer to channel the sacred mantras: \'Best under 10 million\', \'Everyone can afford it\', and \'Far, Far Ahead\'. The faster you spin, the higher the patriotic fervor surges. Over 100 million communal spins worldwide, achieving an acoustic transcendence that competitors can never, ever catch up to!"',
            url: 'https://huawei.dog/',
            tag: 'Holy Acoustics',
            features: ['🌐 Anchored on the prestigious huawei.dog domain', '🎙️ Authentic master recordings of "Far, Far Ahead" and "Best under 10M"', '⚡ Over 100M spins worldwide—spin faster for deafening glory'],
            themeGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
            themeBorder: 'border-emerald-500/30 hover:border-emerald-500/60',
            glowColor: 'rgba(16, 185, 129, 0.25)',
            badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
            buttonGradient: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20',
            type: 'Acoustic Miracle'
          }
        ]
      },
      tabs: {
        glass: "Glassmorphism Designer",
        json: "JSON Validator & Beautifier",
        codec: "Base64 & URL Codec",
        token: "High-Entropy Password Generator"
      },
      glass: {
        title: "Liquid Glassmorphism Interface Designer",
        subtitle: "Adjust backdrop filters, blur, and opacity settings interactively to copy CSS or Tailwind recipes.",
        blur: "Backdrop Blur Radius",
        opacity: "Backdrop Opacity",
        saturation: "Color Saturation",
        border: "Border Line Opacity",
        preview: "Live Sandbox Preview",
        cardTitle: "Explore the Unknown",
        cardDesc: "Leading highly minimalistic fluid visuals and modern aesthetics by GongPan.",
        copyCss: "Copy CSS Rules",
        copyTw: "Copy Tailwind Classes",
      },
      json: {
        title: "Strict JSON Validation & Code Styler",
        subtitle: "Paste messy JSON payload to beautify with dynamic spacing, validate schemas, or compress syntax.",
        inputLabel: "Source JSON Payload",
        outputLabel: "Beautified / Minified Results",
        btnBeautify: "Format JSON",
        btnMinify: "Minify Raw",
        indent2: "2 Spaces Tab",
        indent4: "4 Spaces Tab",
        valid: "Valid JSON schema recognized!",
        invalid: "Parsing error:"
      },
      codec: {
        title: "Symmetric Base64 & Safe URL Encoder / Decoder",
        subtitle: "Fast unicode string processing system to swap between standard base64 and web URI encodings.",
        inputLabel: "Source String Content",
        outputLabel: "Processed Codec Results",
        btnB64Enc: "B64 Encode",
        btnB64Dec: "B64 Decode",
        btnUrlEnc: "URL Encode",
        btnUrlDec: "URL Decode",
        error: "Codec error:"
      },
      token: {
        title: "High-Entropy Secure Password Generator",
        subtitle: "Powered by cryptographic secure random numbers (Web Crypto API) for robust password strength.",
        length: "Password Length",
        opts: "String Content Filters",
        upper: "Uppercase A-Z",
        lower: "Lowercase a-z",
        num: "Numerical 0-9",
        sym: "Special characters (!@#...)",
        strength: "Security Rating",
        weak: "Weak - Increase length or include extra flags",
        medium: "Medium - Good for normal website registry requirements",
        strong: "Strong - Industrial protection against brute force attacks",
        btnRefresh: "Regenerate Key",
        copyBtn: "Copy Password"
      }
    }
  }[language === 'zh' ? 'zh' : 'en'];

  // Reactive classes for glass effects
  const liquidGlassClass = isDark
    ? 'bg-black/20 backdrop-blur-[20px] backdrop-saturate-[180%] border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_20px_50px_rgba(0,0,0,0.4)]'
    : 'bg-white/40 backdrop-blur-[20px] backdrop-saturate-[180%] border-white/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),_0_20px_50px_rgba(0,0,0,0.05)]';

  const tabItemClass = (tab: typeof activeTab) => {
    const isSelected = activeTab === tab;
    if (isSelected) {
      return isDark
        ? 'bg-white/15 border-white/20 text-blue-400 shadow-[0_4px_16px_rgba(59,130,246,0.15)] font-black'
        : 'bg-white/90 border-blue-500/30 text-blue-600 shadow-[0_4px_16px_rgba(0,0,0,0.05)] font-black';
    }
    return isDark
      ? 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
      : 'border-transparent text-gray-600 hover:text-black hover:bg-black/5';
  };

  // Glassmorphism dynamic custom styles
  const previewCardStyle = {
    backdropFilter: `blur(${glassBlur}px) saturate(${glassSaturation}%)`,
    WebkitBackdropFilter: `blur(${glassBlur}px) saturate(${glassSaturation}%)`,
    backgroundColor: isDark ? `rgba(0, 0, 0, ${glassOpacity / 100})` : `rgba(255, 255, 255, ${glassOpacity / 100})`,
    borderColor: isDark ? `rgba(255, 255, 255, ${glassBorderOpacity / 100})` : `rgba(0, 0, 0, ${glassBorderOpacity / 100})`,
  };

  const getGlassStyleString = () => {
    return `backdrop-filter: blur(${glassBlur}px) saturate(${glassSaturation}%);\nbackground-color: ${
      isDark ? `rgba(0, 0, 0, ${glassOpacity / 100})` : `rgba(255, 255, 255, ${glassOpacity / 100})`
    };\nborder: 1px solid ${
      isDark ? `rgba(255, 255, 255, ${glassBorderOpacity / 100})` : `rgba(0, 0, 0, ${glassBorderOpacity / 100})`
    };`;
  };

  const getGlassTailwindString = () => {
    const bgOpacityStr = Math.round(glassOpacity);
    const borderOpacityStr = Math.round(glassBorderOpacity);
    return `bg-${isDark ? 'black' : 'white'}/${bgOpacityStr} backdrop-blur-[${glassBlur}px] backdrop-saturate-[${glassSaturation}%] border border-${
      isDark ? 'white' : 'black'
    }/${borderOpacityStr}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="flex-grow pt-20 md:pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Return home link */}
      <div className="flex items-center mb-6">
        <BackButton />
      </div>

      {/* Hero Header Area */}
      <div className="mb-8 text-center md:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <Terminal size={14} />
          <span>GongPan Laboratory</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
          {translations.labTitle}
        </h1>
        <p className={`text-base md:text-lg max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
          {activeCategory === 'tools' ? translations.categories.toolsSubtitle : translations.categories.gamesSubtitle}
        </p>
      </div>

      {/* Top Category Switcher: "工具" vs "小游戏" */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveCategory('tools')}
          className={`inline-flex items-center space-x-2.5 px-6 py-3 rounded-2xl border text-sm font-black transition-all cursor-pointer ${
            activeCategory === 'tools'
              ? isDark
                ? 'bg-blue-600/20 border-blue-500/40 text-blue-400 shadow-[0_4px_20px_rgba(59,130,246,0.25)]'
                : 'bg-blue-500/10 border-blue-500/30 text-blue-600 shadow-[0_4px_20px_rgba(59,130,246,0.12)]'
              : isDark
                ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                : 'bg-black/5 border-black/10 text-gray-600 hover:text-black hover:bg-black/10'
          }`}
        >
          <Wrench size={18} />
          <span>{translations.categories.tools}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            activeCategory === 'tools'
              ? isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-500/20 text-blue-700'
              : isDark ? 'bg-white/10 text-gray-400' : 'bg-black/10 text-gray-600'
          }`}>
            4
          </span>
        </button>

        <button
          onClick={() => setActiveCategory('games')}
          className={`inline-flex items-center space-x-2.5 px-6 py-3 rounded-2xl border text-sm font-black transition-all cursor-pointer ${
            activeCategory === 'games'
              ? isDark
                ? 'bg-purple-600/20 border-purple-500/40 text-purple-400 shadow-[0_4px_20px_rgba(168,85,247,0.25)]'
                : 'bg-purple-500/10 border-purple-500/30 text-purple-600 shadow-[0_4px_20px_rgba(168,85,247,0.12)]'
              : isDark
                ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                : 'bg-black/5 border-black/10 text-gray-600 hover:text-black hover:bg-black/10'
          }`}
        >
          <Gamepad2 size={18} />
          <span>{translations.categories.games}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            activeCategory === 'games'
              ? isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-500/20 text-purple-700'
              : isDark ? 'bg-white/10 text-gray-400' : 'bg-black/10 text-gray-600'
          }`}>
            2
          </span>
        </button>
      </div>

      {/* Category Content: Tools vs Games */}
      <AnimatePresence mode="wait">
        {activeCategory === 'tools' ? (
          <motion.div
            key="category-tools"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {/* Laboratory main Grid container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Navigation selection rail */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 p-1.5 rounded-3xl border border-white/20 backdrop-blur-md bg-white/5 overflow-x-auto lg:overflow-visible shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('glass')}
            className={`flex items-center justify-center lg:justify-start space-x-3 px-5 py-3.5 rounded-2xl border text-sm font-bold transition-all flex-1 lg:flex-initial whitespace-nowrap ${tabItemClass('glass')}`}
          >
            <Layers size={18} />
            <span>{translations.tabs.glass}</span>
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center justify-center lg:justify-start space-x-3 px-5 py-3.5 rounded-2xl border text-sm font-bold transition-all flex-1 lg:flex-initial whitespace-nowrap ${tabItemClass('json')}`}
          >
            <Code size={18} />
            <span>{translations.tabs.json}</span>
          </button>
          <button
            onClick={() => setActiveTab('codec')}
            className={`flex items-center justify-center lg:justify-start space-x-3 px-5 py-3.5 rounded-2xl border text-sm font-bold transition-all flex-1 lg:flex-initial whitespace-nowrap ${tabItemClass('codec')}`}
          >
            <FileText size={18} />
            <span>{translations.tabs.codec}</span>
          </button>
          <button
            onClick={() => setActiveTab('token')}
            className={`flex items-center justify-center lg:justify-start space-x-3 px-5 py-3.5 rounded-2xl border text-sm font-bold transition-all flex-1 lg:flex-initial whitespace-nowrap ${tabItemClass('token')}`}
          >
            <Terminal size={18} />
            <span>{translations.tabs.token}</span>
          </button>
        </div>

        {/* Dynamic Display Area */}
        <div className="lg:col-span-9 w-full">
          <AnimatePresence mode="wait">
            
            {/* TAB: GLASSMORPHISM */}
            {activeTab === 'glass' && (
              <motion.div
                key="glass-designer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className={`rounded-[2.5rem] p-6 md:p-8 border ${liquidGlassClass}`}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold tracking-tight mb-1">{translations.glass.title}</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{translations.glass.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch pt-2">
                  {/* Slider controls block */}
                  <div className="space-y-6 flex flex-col justify-center">
                    {/* Gaussian Blur slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span>{translations.glass.blur}</span>
                        <span className="font-mono text-blue-500">{glassBlur}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        value={glassBlur}
                        onChange={(e) => setGlassBlur(Number(e.target.value))}
                        className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    {/* Opacity slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span>{translations.glass.opacity}</span>
                        <span className="font-mono text-blue-500">{glassOpacity}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={glassOpacity}
                        onChange={(e) => setGlassOpacity(Number(e.target.value))}
                        className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    {/* Saturation slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span>{translations.glass.saturation}</span>
                        <span className="font-mono text-blue-500">{glassSaturation}%</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="200"
                        value={glassSaturation}
                        onChange={(e) => setGlassSaturation(Number(e.target.value))}
                        className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    {/* Border Opacity slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span>{translations.glass.border}</span>
                        <span className="font-mono text-blue-500">{glassBorderOpacity}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="80"
                        value={glassBorderOpacity}
                        onChange={(e) => setGlassBorderOpacity(Number(e.target.value))}
                        className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>
                  </div>

                  {/* Sandbox preview column */}
                  <div className="flex flex-col justify-between rounded-[2rem] p-6 bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-blue-500/15 border border-white/5 shadow-inner overflow-hidden relative min-h-[300px]">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#82aaff] uppercase mb-4 z-10">{translations.glass.preview}</span>
                    
                    {/* Animated color globes underneath mockup card */}
                    <div className="absolute -left-12 -top-12 w-40 h-40 bg-gradient-to-tr from-pink-500 to-red-500 rounded-full blur-[40px] opacity-40 animate-pulse pointer-events-none" />
                    <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-gradient-to-tr from-blue-500 to-emerald-500 rounded-full blur-[40px] opacity-40 animate-pulse delay-700 pointer-events-none" />

                    {/* Glass card object container */}
                    <div className="flex-grow flex items-center justify-center py-6 z-10">
                      <div style={previewCardStyle} className="rounded-3xl p-6 border max-w-[320px] shadow-2xl transition-all duration-150">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 border border-blue-500/30">
                            <Layers size={18} />
                          </div>
                          <div>
                            <h4 className="text-sm font-black truncate">{translations.glass.cardTitle}</h4>
                            <p className="text-[10px] font-mono tracking-wider opacity-60">ID: GP-LAB-BOX</p>
                          </div>
                        </div>
                        <p className="text-xs leading-relaxed opacity-80">{translations.glass.cardDesc}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formatted Code copy cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-4 border-t border-white/5">
                  <div className="p-4 rounded-2xl bg-black/25 border border-white/5 relative group">
                    <span className="text-xs font-mono font-bold text-gray-500 block mb-2">{(translations.glass as any).cssCode || 'CSS Code'}</span>
                    <pre className="font-mono text-xs text-[#82aaff] overflow-x-auto whitespace-pre-wrap select-all leading-relaxed">
                      {getGlassStyleString()}
                    </pre>
                    <button
                      onClick={() => triggerCopy(getGlassStyleString(), 'css')}
                      className="absolute right-3 top-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-gray-400 hover:text-white transition-all border border-white/5"
                    >
                      {copiedText === 'css' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/25 border border-white/5 relative group">
                    <span className="text-xs font-mono font-bold text-gray-500 block mb-2">{(translations.glass as any).twCode || 'Tailwind Code'}</span>
                    <pre className="font-mono text-xs text-amber-500 overflow-x-auto whitespace-pre-wrap select-all leading-relaxed">
                      {getGlassTailwindString()}
                    </pre>
                    <button
                      onClick={() => triggerCopy(getGlassTailwindString(), 'tw')}
                      className="absolute right-3 top-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-gray-400 hover:text-white transition-all border border-white/5"
                    >
                      {copiedText === 'tw' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: JSON STYLER */}
            {activeTab === 'json' && (
              <motion.div
                key="json-styler"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className={`rounded-[2.5rem] p-6 md:p-8 border ${liquidGlassClass}`}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold tracking-tight mb-1">{translations.json.title}</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{translations.json.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left input */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">{translations.json.inputLabel}</label>
                    <textarea
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      placeholder={(translations.json as any).placeholder || 'Paste JSON here...'}
                      className="w-full h-80 p-4 font-mono text-xs rounded-2xl border focus:outline-none transition-all resize-none bg-black/35 border-white/5 text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Right formatted output */}
                  <div className="flex flex-col space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">{translations.json.outputLabel}</label>
                      {jsonOutput && (
                        <button
                          onClick={() => triggerCopy(jsonOutput, 'json-out')}
                          className="flex items-center space-x-1 px-2.0 py-1 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 border border-white/5"
                        >
                          {copiedText === 'json-out' ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                          <span>{copiedText === 'json-out' ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>
                    <pre className="w-full h-80 p-4 font-mono text-xs rounded-2xl border bg-[#0d0d11] border-white/10 text-emerald-400 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
                      {jsonOutput || '{...}'}
                    </pre>
                  </div>
                </div>

                {/* Validation Status message */}
                {jsonIsValid !== null && (
                  <div className={`mt-4 p-4 rounded-xl flex items-center space-x-3 text-sm font-bold border ${
                    jsonIsValid 
                      ? 'bg-green-500/10 border-green-500/25 text-green-500' 
                      : 'bg-red-500/10 border-red-500/25 text-red-500'
                  }`}>
                    <AlertCircle size={18} />
                    <span>{jsonIsValid ? translations.json.valid : `${translations.json.invalid} ${jsonError}`}</span>
                  </div>
                )}

                {/* Toolbar actions bar */}
                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
                  {/* Indentation configuration selectors */}
                  <div className="flex bg-black/20 rounded-xl p-1 border border-white/5">
                    <button
                      onClick={() => setJsonIndent(2)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${jsonIndent === 2 ? 'bg-white/10 text-white' : 'text-gray-400'}`}
                    >
                      {translations.json.indent2}
                    </button>
                    <button
                      onClick={() => setJsonIndent(4)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${jsonIndent === 4 ? 'bg-white/10 text-white' : 'text-gray-400'}`}
                    >
                      {translations.json.indent4}
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => processJson('beautify')}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs"
                    >
                      {translations.json.btnBeautify}
                    </button>
                    <button
                      onClick={() => processJson('minify')}
                      className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 font-bold text-xs"
                    >
                      {translations.json.btnMinify}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: CODEC (Base64) */}
            {activeTab === 'codec' && (
              <motion.div
                key="codec-coder"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className={`rounded-[2.5rem] p-6 md:p-8 border ${liquidGlassClass}`}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold tracking-tight mb-1">{translations.codec.title}</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{translations.codec.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left String input */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">{translations.codec.inputLabel}</label>
                    <textarea
                      value={codecInput}
                      onChange={(e) => setCodecInput(e.target.value)}
                      placeholder={(translations.codec as any).placeholder || 'Type or paste content...'}
                      className="w-full h-80 p-4 font-mono text-xs rounded-2xl border focus:outline-none transition-all resize-none bg-black/35 border-white/5 text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Right codec output */}
                  <div className="flex flex-col space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">{translations.codec.outputLabel}</label>
                      {codecOutput && (
                        <button
                          onClick={() => triggerCopy(codecOutput, 'codec-out')}
                          className="flex items-center space-x-1 px-2.0 py-1 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 border border-white/5"
                        >
                          {copiedText === 'codec-out' ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                          <span>{copiedText === 'codec-out' ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>
                    <pre className="w-full h-80 p-4 font-mono text-xs rounded-2xl border bg-[#0d0d11] border-white/10 text-amber-500 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
                      {codecOutput || '...'}
                    </pre>
                  </div>
                </div>

                {/* Parsing decode standard errors */}
                {codecError && (
                  <div className="mt-4 p-4 rounded-xl flex items-center space-x-3 text-sm font-bold border bg-red-500/10 border-red-500/25 text-red-500">
                    <AlertCircle size={18} />
                    <span>{translations.codec.error} {codecError}</span>
                  </div>
                )}

                {/* Multi-Trigger button bar */}
                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-3 justify-end">
                  <button
                    onClick={() => runCodec('b64-encode')}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs"
                  >
                    {translations.codec.btnB64Enc}
                  </button>
                  <button
                    onClick={() => runCodec('b64-decode')}
                    className="px-4 py-2.5 rounded-xl bg-black/35 hover:bg-black/50 border border-white/10 text-gray-200 font-bold text-xs"
                  >
                    {translations.codec.btnB64Dec}
                  </button>
                  <button
                    onClick={() => runCodec('url-encode')}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs"
                  >
                    {translations.codec.btnUrlEnc}
                  </button>
                  <button
                    onClick={() => runCodec('url-decode')}
                    className="px-4 py-2.5 rounded-xl bg-black/35 hover:bg-black/50 border border-white/10 text-gray-200 font-bold text-xs"
                  >
                    {translations.codec.btnUrlDec}
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB: SECURE KEY GENERATOR */}
            {activeTab === 'token' && (
              <motion.div
                key="secure-keygen"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className={`rounded-[2.5rem] p-6 md:p-8 border ${liquidGlassClass}`}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold tracking-tight mb-1">{translations.token.title}</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{translations.token.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pt-2">
                  {/* Slider and Filter Options Column */}
                  <div className="xl:col-span-7 space-y-6">
                    {/* Size Selector slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span>{translations.token.length}</span>
                        <span className="font-mono text-blue-500">{tokenLength} chars</span>
                      </div>
                      <input
                        type="range"
                        min="6"
                        max="64"
                        value={tokenLength}
                        onChange={(e) => setTokenLength(Number(e.target.value))}
                        className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    {/* Filter flag check blocks */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">{translations.token.opts}</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className="flex items-center space-x-3 p-3 rounded-xl border border-white/5 bg-black/10 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={tokenUpper}
                            onChange={(e) => setTokenUpper(e.target.checked)}
                            className="rounded text-blue-500 focus:ring-0 w-4 h-4 bg-transparent border-white/20"
                          />
                          <span className="text-sm font-medium">{translations.token.upper}</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 rounded-xl border border-white/5 bg-black/10 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={tokenLower}
                            onChange={(e) => setTokenLower(e.target.checked)}
                            className="rounded text-blue-500 focus:ring-0 w-4 h-4 bg-transparent border-white/20"
                          />
                          <span className="text-sm font-medium">{translations.token.lower}</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 rounded-xl border border-white/5 bg-black/10 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={tokenNumbers}
                            onChange={(e) => setTokenNumbers(e.target.checked)}
                            className="rounded text-blue-500 focus:ring-0 w-4 h-4 bg-transparent border-white/20"
                          />
                          <span className="text-sm font-medium">{translations.token.num}</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 rounded-xl border border-white/5 bg-black/10 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={tokenSymbols}
                            onChange={(e) => setTokenSymbols(e.target.checked)}
                            className="rounded text-blue-500 focus:ring-0 w-4 h-4 bg-transparent border-white/20"
                          />
                          <span className="text-sm font-medium">{translations.token.sym}</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Output Generated String and rating Column */}
                  <div className="xl:col-span-5 flex flex-col justify-between p-6 rounded-3xl bg-black/25 border border-white/5">
                    {/* Live styled Output viewer block */}
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-[#0d0d11] border border-white/10 select-all font-mono text-sm break-all text-center text-teal-400 font-bold min-h-[72px] flex items-center justify-center">
                        {generatedToken || 'Select options...'}
                      </div>

                      {/* Score Indicator details block */}
                      {generatedToken && (
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-bold">
                            <span>{translations.token.strength}</span>
                            <span className={
                              tokenStrength === 'strong' ? 'text-green-500' : tokenStrength === 'medium' ? 'text-[#f78c6c]' : 'text-red-500'
                            }>
                              {tokenStrength.toUpperCase()}
                            </span>
                          </div>
                          
                          {/* Colored dynamic progress indicators */}
                          <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden flex">
                            <div className={`h-full transition-all duration-300 ${
                              tokenStrength === 'strong' 
                                ? 'bg-green-500 w-full' 
                                : tokenStrength === 'medium' 
                                  ? 'bg-[#f78c6c] w-2/3' 
                                  : 'bg-red-500 w-1/3'
                            }`} />
                          </div>
                          
                          <p className="text-[10px] text-gray-500 leading-normal">
                            {translations.token[tokenStrength]}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Trigger Generate & Copy blocks */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <button
                        onClick={generateTokenNow}
                        className="px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 font-bold text-xs"
                      >
                        {translations.token.btnRefresh}
                      </button>
                      <button
                        onClick={() => triggerCopy(generatedToken, 'pass-copy')}
                        className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/10"
                      >
                        {translations.token.copyBtn}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  ) : (
    <motion.div
      key="category-games"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22 }}
      className="space-y-8"
    >
      <div className="flex items-end justify-between gap-4 px-1">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-3">PLAY / EXPLORE</p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{translations.games.title}</h2>
          <p className="text-sm text-gray-500 mt-2">{translations.games.subtitle}</p>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">{translations.categories.gamesCount}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {translations.games.items.map((game) => (
          <motion.article
            key={game.id}
            id={`game-${game.id}`}
            tabIndex={-1}
            whileHover={{ y: -4 }}
            className={`group relative rounded-[2rem] border p-5 sm:p-7 backdrop-blur-2xl flex flex-col scroll-mt-24 outline-none transition-shadow duration-300 ${
              isDark ? 'bg-white/[0.04] border-white/10 shadow-2xl' : 'bg-white/55 border-white/90 shadow-[0_20px_60px_-35px_rgba(30,40,60,0.25)]'
            } ${selectedGame === game.id ? 'ring-1 ring-blue-400/30' : ''}`}
          >
            <div aria-hidden="true" className={`relative h-48 sm:h-56 rounded-[1.3rem] overflow-hidden flex items-center justify-center bg-gradient-to-br ${
              game.id === 'roadster' ? 'from-rose-950 via-slate-950 to-orange-950' : 'from-emerald-950 via-slate-950 to-teal-950'
            }`}>
              <div className={`absolute w-44 h-44 rounded-full blur-3xl opacity-40 bg-gradient-to-br ${game.themeGradient}`} />
              <div className="absolute inset-6 rounded-full border border-white/10 -rotate-12 scale-x-150" />
              <div className="relative flex flex-col items-center gap-5 text-white/85">
                {game.id === 'roadster' ? <Flame size={44} strokeWidth={1} /> : <Sparkles size={44} strokeWidth={1} />}
                <span className="text-[10px] tracking-[0.3em]">{game.id === 'roadster' ? 'ROADSTER / AIR RUN' : 'BAMBOO CICADA'}</span>
              </div>
            </div>
            <div className="pt-6 pb-7 flex-1">
              <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-3">{game.type}</p>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">{game.title}</h3>
              <p className={`text-sm leading-relaxed mt-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'zh'
                  ? (game.id === 'roadster' ? '长按空格，启动冷气推进。在公路与天空之间，来一场轻松的逃逸。' : '按住指针，轻轻转动。用一只竹知了，唤回童年的声音与简单的快乐。')
                  : (game.id === 'roadster' ? 'Hold space to fire the thrusters. A playful escape between the highway and the sky.' : 'Press, spin, and listen. Rediscover the simple joy of a childhood toy.')}
              </p>
            </div>
            <div className={`pt-5 border-t flex items-center justify-between gap-3 ${isDark ? 'border-white/10' : 'border-black/5'}`}>
              <span className="text-[11px] text-gray-400">{translations.games.instantBadge}</span>
              <a href={game.url} target="_blank" rel="noopener noreferrer"
                aria-label={`${translations.games.playBtn} · ${game.title}`}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all hover:-translate-y-0.5 active:scale-95 ${
                  isDark ? 'liquid-glass-pill-dark border-white/20 text-white' : 'liquid-glass-pill-light border-white text-gray-900'
                }`}>
                {translations.games.playBtn}<ArrowUpRight size={15} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </motion.div>
  );
};
