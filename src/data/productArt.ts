export interface ProductScene {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

export const PRODUCT_SCENES: Record<string, ProductScene[]> = {
  pansou: [
    { title: '想看的，不必四处寻找。', titleEn: 'Less searching. More watching.', description: '影视、音乐与学习资料，从一个入口开始寻找。把辗转切换的时间，留给真正想看的内容。', descriptionEn: 'Discover films, music and learning resources from one starting point. Spend less time switching and more time exploring.' },
    { title: '一次输入，连接多盘内容。', titleEn: 'One search. More places to discover.', description: '聚合不同网盘的公共资源入口，按内容和来源整理线索，让下一次寻找更有条理。', descriptionEn: 'Bring public cloud resources into a clearer view, with content and sources organized together.' },
    { title: '从大屏，到你手中。', titleEn: 'From the big screen to your hands.', description: '在电脑上认真查找，也能在手机和平板上轻松浏览。打开网页，让好内容融入日常。', descriptionEn: 'Explore on your computer, or browse on a phone or tablet. A web experience that fits into your day.' },
  ],
  'reading-pro': [
    { title: '让好内容，成为日常。', titleEn: 'Make good reading a daily habit.', description: '从国际刊物出发，关注世界正在发生的事。让每一次阅读，都留下值得回味的观点。', descriptionEn: 'Explore international journals and fresh perspectives. Make space for ideas that stay with you.' },
    { title: '展开书页，拓宽视野。', titleEn: 'Open the pages. Widen your perspective.', description: '让清晰的页面和顺手的阅读工具陪你慢慢读。单页或双页，按自己的节奏找到舒服的阅读方式。', descriptionEn: 'Clear pages and thoughtful reading tools. Choose a single page or a spread and settle into your own rhythm.' },
    { title: '留一段完整的时间，给自己。', titleEn: 'Make a little room for yourself.', description: '从书桌到沙发，从碎片时间到安静的夜晚。少一点打扰，多一点专注，让阅读回到生活里。', descriptionEn: 'From your desk to a quiet evening corner. Fewer distractions, more attention, and more room for reading.' },
  ],
  'ai-agent': [
    { title: '把线索，连接成脉络。', titleEn: 'Connect the signals to their context.', description: '行情、资讯和研究线索，不必散落在不同窗口。用更清晰的工作空间，建立自己的观察视角。', descriptionEn: 'Bring market information and research into a clearer workspace, and develop your own perspective.' },
    { title: '从报告里，读懂变化。', titleEn: 'Read the reports. Understand the change.', description: '梳理信息，比较背景，把关注点落在具体问题上。AI 辅助研究，让思考更有条理。', descriptionEn: 'Organize information, compare context, and focus on the questions that matter. AI assists the research process.' },
    { title: '重要的信息，随时查看。', titleEn: 'Keep the important context close.', description: '在桌面上深入研究，也可以在小屏幕上回看线索。保持关注，保留自己的判断。', descriptionEn: 'Research in depth at your desk, then revisit the context on a smaller screen. Keep your own judgment.' },
  ],
  chat: [
    { title: '把今天的小事，分享给彼此。', titleEn: 'Share the little things in your day.', description: '一段见闻、一句问候，或者一个突然想到的念头。让交流更轻松，让距离再近一点。', descriptionEn: 'A story, a hello, or a passing thought. Make conversation easier and bring the distance a little closer.' },
    { title: '一句问候，刚刚好的距离。', titleEn: 'A little hello goes a long way.', description: '把界面留给对话，把时间留给彼此。清晰的消息与简单的操作，让每一句表达都自然发生。', descriptionEn: 'More room for conversation, and more time for each other. Clear messages and simple interactions.' },
    { title: '换个屏幕，继续聊。', titleEn: 'Another screen. The same conversation.', description: '在不同设备之间延续交流。GongPan Chat 仍在内测，欢迎一起打磨更好用的日常连接。', descriptionEn: 'Keep the conversation going across devices. GongPan Chat is in beta; help shape a more thoughtful connection.' },
  ],
};

// Every raster has exactly one visible owner. Never fall back to another slot.
export interface ProductVisualSlots {
  detail: string;
  heroPrimary: string;
  heroSecondary: string;
  overview?: string;
  demo?: string;
}
export const PRODUCT_VISUALS: Record<string, ProductVisualSlots> = {
  pansou: {
    detail: '/images/products/pansou-index-detail.webp',
    heroPrimary: '/images/products/pansou-reel-v3.webp',
    heroSecondary: '/images/products/pansou-archive-v3.webp',
    overview: '/images/products/pansou-aperture-overview.webp',
  },
  'reading-pro': {
    detail: '/images/products/reading-newspaper-detail.webp',
    heroPrimary: '/images/products/reading-journal-v3.webp',
    heroSecondary: '/images/products/reading-covers-v3.webp',
    overview: '/images/products/reading-tools-overview.webp',
    demo: '/images/products/reading-editorial-demo.webp',
  },
  'ai-agent': {
    detail: '/images/products/research-risk-detail.webp',
    heroPrimary: '/images/products/research-chart-v3.webp',
    heroSecondary: '/images/products/research-report-v3.webp',
  },
  chat: {
    detail: '/images/products/chat-lock-detail.webp',
    heroPrimary: '/images/products/chat-bubbles-v3.webp',
    heroSecondary: '/images/products/chat-plane-v3.webp',
    overview: '/images/products/chat-profiles-overview.webp',
    demo: '/images/products/chat-postcard-demo.webp',
  },
};
