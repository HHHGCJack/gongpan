import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { showcaseData, ShowcaseProduct } from '../src/data/showcases';
import { PRODUCT_VISUALS, PRODUCT_SCENES } from '../src/data/productArt';
import { preloadRoute } from '../src/utils/preload';
import { ProductExperience } from './ProductExperience';
import { ProductParallaxStage } from './ProductParallaxStage';
import { ProductMaterialSequence } from './ProductMaterialSequence';
import '../src/styles/product-campaign.css';
import '../src/styles/product-art-direction.css';

const DIRECTION: Record<string, { label: string; color: string; zh: string[]; en: string[] }> = {
  pansou: { label: 'THE ART OF DISCOVERY', color: '#f59e0b',
    zh: ['光影之间，发现所爱。', '穿过纷繁，直达精彩。', '让寻找，回归简单。', '下一幕，由你开启。'],
    en: ['Find what moves you.', 'Beyond the noise. Into discovery.', 'Make finding feel effortless.', 'Your next scene awaits.'] },
  'reading-pro': { label: 'A WIDER PERSPECTIVE', color: '#10b981',
    zh: ['世界，在字里行间。', '翻过一页，看见更远。', '把阅读，放回中心。', '每次阅读，都是抵达。'],
    en: ['A world between the lines.', 'Turn a page. See a little further.', 'Make room for reading.', 'Every page, a new arrival.'] },
  'ai-agent': { label: 'CLARITY IN COMPLEXITY', color: '#3b82f6',
    zh: ['穿透数据，看见脉络。', '让复杂，变得清晰。', '从信息，到有据可循。', '把判断，留给自己。'],
    en: ['See beyond the numbers.', 'Find clarity in complexity.', 'From information to context.', 'Keep your own perspective.'] },
  chat: { label: 'CLOSER BY DESIGN', color: '#06b6d4',
    zh: ['让距离，轻一点。', '连接彼此，保留自我。', '交流，本可以很简单。', '好的交流，从此开始。'],
    en: ['Bring the distance closer.', 'Connect. And stay yourself.', 'Conversation, simply.', 'A better conversation begins.'] },
};

const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
};

const FeatureRow: React.FC<{ feature: ShowcaseProduct['features'][number]; index: number }> = ({ feature, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, .42, 1], [160 + index * 22, 0, -150 - index * 18]);
  const rotate = useTransform(scrollYProgress, [0, .42, 1], [index % 2 ? 7 : -7, 0, index % 2 ? -5 : 5]);
  const scale = useTransform(scrollYProgress, [0, .42, 1], [.84, 1, .92]);
  return <motion.div ref={ref} className="campaign-feature liquid-glass" style={reduced ? undefined : { y, rotate, scale }}>
    <span className="campaign-feature-index">0{index + 1}</span>
    <div><p className="campaign-small-label campaign-accent">{feature.highlight || feature.metricLabel}</p><h3>{feature.title}</h3><p className="campaign-feature-description">{feature.description}</p></div>
  </motion.div>;
};

const ImmersiveScene: React.FC<{ progress: ReturnType<typeof useScroll>['scrollYProgress']; index: number; title: string; body: string; reduced: boolean }> = ({ progress, index, title, body, reduced }) => {
  const stops = index === 0 ? [0, .20, .34, 1] : index === 1 ? [.20, .34, .54, .70] : [.54, .70, .96, 1];
  const opacity = useTransform(progress, stops, index === 0 ? [1, 1, 0, 0] : index === 1 ? [0, 1, 1, 0] : [0, 1, 1, 1]);
  const y = useTransform(progress, [Math.max(0, index * .3 - .07), index * .3 + .1], [45, 0]);
  return <motion.div className={`campaign-hero-scene campaign-container ${reduced ? 'campaign-hero-scene--static' : ''}`} style={reduced ? undefined : { opacity, y }} aria-hidden={reduced ? undefined : true}>
    <span className="campaign-scene-number">0{index + 1} / 03</span><h2>{title.includes('，') ? title.split('，').map((part, index, parts) => <span key={index} className="campaign-title-phrase">{part}{index < parts.length - 1 ? '，' : ''}</span>) : title}</h2><p>{body}</p>
  </motion.div>;
};

interface Props {
  productId: string; product: ShowcaseProduct; language: string; isDark: boolean;
  isConnecting: boolean; onVisit: () => void; onApplyBeta: () => void;
}

export const ProductVisualStory: React.FC<Props> = ({ productId, product, language, isDark, isConnecting, onVisit, onApplyBeta }) => {
  const heroRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const pageRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();
  const zh = language === 'zh';
  const direction = DIRECTION[productId] || DIRECTION.pansou;
  const copy = zh ? direction.zh : direction.en;
  const scenes = PRODUCT_SCENES[productId];
  const glassClass = `liquid-glass ${isDark ? 'liquid-glass-dark' : 'liquid-glass-light'}`;
  const pillClass = isDark ? 'liquid-glass-pill-dark' : 'liquid-glass-pill-light';
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end end'] });
  const { scrollYProgress: detailProgress } = useScroll({ target: detailRef, offset: ['start end', 'end start'] });
  const detailScale = useTransform(detailProgress, [0, .55, 1], [.5, 1.4, .75]);
  const detailY = useTransform(detailProgress, [0, 1], ['60%', '-50%']);
  const detailRotate = useTransform(detailProgress, [0, 1], [-34, 38]);
  const { scrollYProgress: pageProgress } = useScroll({ target: pageRef, offset: ['start start', 'end end'] });
  const variables = {
    '--campaign-bg': isDark ? '#09090b' : '#f6f7fa',
    '--campaign-ink': isDark ? '#f4f4f5' : '#111827',
    '--campaign-muted': isDark ? '#a1a1aa' : '#667085',
    '--campaign-line': isDark ? 'rgba(239,241,235,.13)' : 'rgba(41,48,42,.14)',
    '--campaign-surface': isDark ? 'rgba(255,255,255,.035)' : 'rgba(255,255,255,.48)',
    '--campaign-accent': direction.color,
  } as React.CSSProperties;
  const actionLabel = isConnecting ? (zh ? '正在连接…' : 'Connecting…') : (product.ctaText || (zh ? '立即体验' : 'Explore now'));

  return <main ref={pageRef} className={`product-campaign campaign--${productId} ${isDark ? 'product-campaign--dark' : ''}`} style={variables}>
    <motion.div aria-hidden="true" className="campaign-page-progress" style={{ scaleX: pageProgress }} />
    <section className="campaign-gateway" aria-labelledby="campaign-title">
      <div className="campaign-gateway-copy campaign-container">
        <p className="campaign-gateway-tag">{product.tag}</p>
        <h1 id="campaign-title">{product.heroHeadline}</h1>
        <p className="campaign-gateway-description">{product.heroSubheadline}</p>
        <div className="campaign-gateway-actions"><button className={`campaign-button campaign-button--gateway ${pillClass}`} onClick={onVisit} disabled={isConnecting}>{actionLabel}<ArrowUpRight size={17} /></button></div>
        {productId === 'chat' && <p className="campaign-gateway-beta">{zh ? '内测阶段 · 仅受邀用户可注册' : 'In beta · Registration by invitation'} <button onClick={onApplyBeta}>{zh ? '申请内测' : 'Apply for beta'}</button></p>}
      </div>
      <div className="campaign-gateway-arrow">
        <motion.button className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer liquid-glass ${pillClass} ${isDark ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-black'}`}
          aria-label={zh ? '向下了解产品' : 'Scroll down to explore'}
          onClick={() => detailRef.current?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' })}
          animate={reduced ? undefined : { opacity: [.6, 1, .6] }} transition={{ opacity: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' } }}>
          <motion.div animate={reduced ? undefined : { y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}><ChevronDown size={20} strokeWidth={2.5} /></motion.div>
        </motion.button>
      </div>
    </section>

    <div className="campaign-feature-lead campaign-container"><Reveal className="campaign-section-label"><span>01 / THE DETAILS</span><span>{product.title}</span></Reveal></div>
    <section ref={detailRef} className="campaign-details campaign-container" aria-label={zh ? '产品特点' : 'Product features'}>
      <div className={`campaign-detail-picture ${glassClass}`}>
        <div className="campaign-detail-image-frame"><div className="campaign-detail-stage-pattern" aria-hidden="true" /><motion.img src={PRODUCT_VISUALS[productId].detail} alt={zh ? `${product.title}概念图形` : `${product.title} concept illustration`} loading="lazy" decoding="async"
          style={reduced ? undefined : { scale: detailScale, y: detailY, rotate: detailRotate }} />
          <div className="campaign-detail-image-shade" /><div className="campaign-detail-picture-caption"><span>PRODUCT ANATOMY</span><p>{zh ? scenes[1].title : scenes[1].titleEn}</p></div>
        </div>
        <div className="campaign-image-caption"><span>{direction.label}</span><span>SCENE 02 — {zh ? '图形解构' : 'PRODUCT ANATOMY'}</span></div>
      </div>
      <div className={`campaign-feature-list ${isDark ? 'campaign-glass-dark' : 'campaign-glass-light'}`}>{product.features.map((feature, index) => <FeatureRow key={feature.title} feature={feature} index={index} />)}</div>
    </section>

    <section ref={heroRef} className={`campaign-hero ${reduced ? 'campaign-hero--reduced' : ''}`} aria-label={zh ? '沉浸式产品介绍' : 'Immersive product introduction'}>
      <div className="campaign-hero-stage">
        <div className="campaign-hero-visual">
          <ProductParallaxStage productId={productId} progress={heroProgress} reduced={reduced} zh={zh} />
        </div>
        <div className="campaign-hero-top campaign-container"><span>{direction.label}</span><span>GONGPAN / {String(Object.keys(DIRECTION).indexOf(productId) + 1).padStart(2, '0')}</span></div>
        {scenes.map((scene, index) => <ImmersiveScene key={index} progress={heroProgress} index={index} title={zh ? scene.title : scene.titleEn} body={zh ? scene.description : scene.descriptionEn} reduced={reduced} />)}
        {!reduced && <div className="campaign-hero-bottom campaign-container"><span>SCROLL TO DISCOVER</span><div className="campaign-story-track"><motion.div style={{scaleX:heroProgress}} /></div><span>{zh ? '继续探索' : 'KEEP EXPLORING'}</span></div>}
        {!reduced && <div className="sr-only">{scenes.map((scene, index) => <div key={index}><h2>{zh ? scene.title : scene.titleEn}</h2><p>{zh ? scene.description : scene.descriptionEn}</p></div>)}</div>}
      </div>
    </section>

    <ProductMaterialSequence productId={productId} product={product} zh={zh} isDark={isDark} />

    <section ref={experienceRef} className="campaign-experience campaign-container" aria-label={zh ? '产品交互预览' : 'Interactive product preview'}>
      <Reveal className="campaign-section-label"><span>02 / THE EXPERIENCE</span><span>{zh ? '让体验，说明一切。' : 'LET THE EXPERIENCE SPEAK.'}</span></Reveal>
      <Reveal className="campaign-experience-heading"><h2>{copy[2]}</h2><p>{zh ? ({pansou: '切换分类、筛选内容，点开结果探索文件清单。', 'reading-pro': '翻页阅读原创短文，点词释义，切换译文与阅读字号。', 'ai-agent': '切换示例序列、调整采样范围，拖动查看每一个数据点。', chat: '发一句问候，收到模拟回应，也可以分享一张示例图片。'}[productId]) : ({pansou: 'Filter, select and explore the sample files.', 'reading-pro': 'Read, turn pages, explore words and adjust your reading view.', 'ai-agent': 'Switch sample series, change the range and inspect individual points.', chat: 'Try a message, get a simulated reply and share a sample image.'}[productId])}</p></Reveal>
      <div><ProductExperience productId={productId} language={language} onVisit={onVisit} onApplyBeta={onApplyBeta} isConnecting={isConnecting} isDark={isDark} /></div>
    </section>

    <section className="campaign-finale" aria-label={zh ? '开始体验' : 'Get started'}>
      <Reveal className={`campaign-finale-copy campaign-container ${glassClass}`}><p className="campaign-small-label">03 / YOUR NEXT CHAPTER</p><h2>{copy[3]}</h2><p>{product.finalCtaSubtitle}</p><div className="campaign-finale-actions"><button className={`campaign-button campaign-button--gateway ${pillClass}`} onClick={onVisit} disabled={isConnecting}>{actionLabel}<ArrowUpRight size={17} /></button>{productId === 'chat' && <button className="campaign-text-button" onClick={onApplyBeta}>{zh ? '申请内测资格' : 'Apply for beta'}<ArrowRight size={16} /></button>}</div></Reveal>
    </section>

    <nav className="campaign-collection campaign-container" aria-label={zh ? '继续探索产品' : 'Explore more products'}>
      <div className="campaign-section-label"><span>THE GONGPAN COLLECTION</span><Link to="/">{zh ? '全部产品' : 'All products'}<ArrowUpRight size={13} /></Link></div>
      <div className="campaign-collection-grid">{Object.keys(DIRECTION).filter(key => key !== productId).map(key => {
        const next = showcaseData[key][language] || showcaseData[key].zh;
        return <Link to={`/showcase/${key}`} key={key} className="campaign-collection-link" onMouseEnter={() => preloadRoute(`/showcase/${key}`)} onFocus={() => preloadRoute(`/showcase/${key}`)}><div className={`campaign-collection-mark campaign-collection-mark--${key}`} aria-hidden="true"><span>{({pansou:'PAN / SOU','reading-pro':'READ.PRO','ai-agent':'AI / RESEARCH',chat:'HELLO, CHAT'})[key]}</span><small>GONGPAN COLLECTION</small></div><span>{next.title}<ArrowUpRight size={17} /></span></Link>;
      })}</div>
    </nav>
  </main>;
};
