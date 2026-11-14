import React, { useRef } from 'react';
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Search, Film, Music2, BookOpen, FileText, Globe2, ScanLine, Languages } from 'lucide-react';
import { PRODUCT_VISUALS } from '../src/data/productArt';
import { ShowcaseProduct } from '../src/data/showcases';

type Spec = ShowcaseProduct['specs'][number];
interface SceneProps { progress: MotionValue<number>; product: ShowcaseProduct; glass: string; zh: boolean }
const HEADINGS: Record<string, [string, string]> = {
  pansou: ['从一个入口，展开更多精彩。', 'One starting point. A wider discovery.'],
  'reading-pro': ['翻动的，是看世界的方式。', 'Turn a page. Change your perspective.'],
  'ai-agent': ['拆开信息，重新看见全局。', 'Separate the signals. See the whole picture.'],
  chat: ['各自的轨迹，终于相遇。', 'Different paths. A shared conversation.'],
};
const SpecCopy = ({ spec }: { spec: Spec }) => <><strong>{spec.value}</strong><span>{spec.label}</span><p>{spec.subtext}</p></>;

const DiscoveryIris = ({ progress:p, product, glass, zh }:SceneProps) => {
  const aperture = useTransform(p,[0,.15,.7,1],['circle(6% at 50% 50%)','circle(14% at 50% 50%)','circle(90% at 50% 50%)','circle(100% at 50% 50%)']);
  const reelScale = useTransform(p,[0,.35,.65,1],[.8,1.1,.45,.4]);
  const reelOpacity = useTransform(p,[0,.25,.6,1],[1,1,0,0]);
  const lensRotate = useTransform(p,[0,1],[0,220]);
  const boardScale = useTransform(p,[0,.6,1],[1.35,1,.94]);
  return <div className="sequence-iris">
    <motion.div className="sequence-iris-rings" style={{rotate:lensRotate}}><i/><i/><i/><i/></motion.div>
    <motion.img className="sequence-iris-reel" src={PRODUCT_VISUALS.pansou.overview} alt="" loading="lazy" style={{scale:reelScale,opacity:reelOpacity}}/>
    <motion.div className="sequence-discovery-board" style={{clipPath:aperture,scale:boardScale}}>
      <div className={`sequence-discovery-search ${glass}`}><Search size={20}/><span>{zh?'寻找下一份精彩':'Find your next discovery'}</span></div>
      <div className="sequence-discovery-grid">{product.specs.map((spec,i)=>{
        const Icon=[Film,Music2,BookOpen,FileText][i];
        return <div key={spec.label} className={`sequence-resource sequence-resource-${i} ${glass}`}><Icon strokeWidth={1}/><SpecCopy spec={spec}/></div>;
      })}</div>
    </motion.div>
  </div>;
};

const TurningLeaf:React.FC<{ spec:Spec; index:number; progress:MotionValue<number> }> = ({spec,index,progress}) => {
  const start=index*.25+.08;
  const rotateY=useTransform(progress,[start,start+.23],[0,-178]);
  const zIndex=useTransform(progress,[start,start+.12,start+.23],[8-index,8-index,index+1]);
  return <motion.div className="sequence-leaf" style={{rotateY,zIndex}}>
    <div className="sequence-leaf-face sequence-leaf-front"><span className="sequence-folio">0{index+1} / READING PRO</span><SpecCopy spec={spec}/><div className="sequence-editorial-rule"/>{React.createElement([Globe2,ScanLine,Languages][index],{strokeWidth:.5})}<div className="sequence-editorial-lines"/></div>
    <div className="sequence-leaf-face sequence-leaf-back"><div className="sequence-editorial-lines"/><span>Another perspective.</span></div>
  </motion.div>;
};
const EditorialBook = ({progress,product}:SceneProps) => {
  const tilt=useTransform(progress,[0,.4,.8,1],[18,5,-8,0]);
  const scale=useTransform(progress,[0,.4,1],[.8,1.05,.94]);
  return <div className="sequence-book-space"><motion.div className="sequence-book" style={{rotateX:tilt,scale}}>
    <div className="sequence-book-base sequence-book-left"><span className="sequence-folio">GONGPAN / THE WORLD IN PRINT</span><h3>Open<br/>your<br/><em>world.</em></h3><img src={PRODUCT_VISUALS['reading-pro'].overview} alt="" loading="lazy"/></div>
    <div className="sequence-book-base sequence-book-right"><span className="sequence-folio">04 / A NEW PERSPECTIVE</span><SpecCopy spec={product.specs[3]}/><div className="sequence-editorial-lines"/></div>
    {product.specs.slice(0,3).map((spec,index)=><TurningLeaf key={spec.label} spec={spec} index={index} progress={progress}/>)}
  </motion.div></div>;
};

const AnalysisPlane:React.FC<{spec:Spec;index:number;progress:MotionValue<number>;glass:string}> = ({spec,index,progress:p,glass}) => {
  const side=index%2?1:-1, row=index<2?-1:1;
  const x=useTransform(p,[0,.32,.78,1],[side*220,side*95,0,0]);
  const y=useTransform(p,[0,.32,.78,1],[row*100,row*45,0,0]);
  const z=useTransform(p,[0,.32,.78,1],[300+index*110,220-index*40,0,0]);
  const rotateX=useTransform(p,[0,.32,.78,1],[52,28,0,0]);
  const rotateY=useTransform(p,[0,.32,.78,1],[side*28,side*12,0,0]);
  const pathLength=useTransform(p,[.1+index*.08,.7+index*.08],[0,1]);
  return <motion.div className={`sequence-analysis-plane sequence-analysis-plane-${index} ${glass}`} style={{x,y,z,rotateX,rotateY}}>
    <span className="sequence-folio">0{index+1} / {['CONTEXT','SIGNALS','RESEARCH','PERSPECTIVE'][index]}</span><SpecCopy spec={spec}/>
    <svg viewBox="0 0 300 75"><path d="M0 25H300M0 50H300" fill="none" stroke="currentColor" opacity=".1"/><motion.path d={['M0 60L30 35L60 46L90 20L120 32L150 12L180 42L210 25L240 39L270 10L300 24','M0 30L30 42L60 15L90 32L120 60L150 40L180 56L210 20L240 35L270 12L300 30','M0 15L30 30L60 20L90 50L120 35L150 60L180 45L210 62L240 32L270 50L300 24','M0 50L30 20L60 40L90 25L120 44L150 15L180 36L210 20L240 50L270 25L300 40'][index]} fill="none" stroke="currentColor" strokeWidth="2" style={{pathLength}}/></svg>
  </motion.div>;
};
const ResearchAssembly = ({progress,product,glass}:SceneProps) => {
  const scan=useTransform(progress,[0,1],['0%','100%']);
  return <div className="sequence-dashboard-space"><div className="sequence-dashboard">
    {product.specs.map((spec,index)=><AnalysisPlane key={spec.label} spec={spec} index={index} progress={progress} glass={glass}/>)}
    <motion.div className="sequence-scan" style={{top:scan}}/>
  </div></div>;
};

const OrbitMessage:React.FC<{spec:Spec;index:number;progress:MotionValue<number>;glass:string}> = ({spec,index,progress,glass}) => {
  const orbit=(p:number,axis:'x'|'y')=>{
    const angle=index*Math.PI/2-p*Math.PI*2.4;
    const blend=Math.max(0,(p-.72)/.28);
    const radius=axis==='x'?155:155;
    const position=(axis==='x'?Math.cos(angle):Math.sin(angle))*radius;
    const settled=axis==='x'?(index%2?57:-57):(index<2?-58:58);
    return `${position*(1-blend)+settled*blend}%`;
  };
  const x=useTransform(progress,(p:number)=>orbit(p,'x')),y=useTransform(progress,(p:number)=>orbit(p,'y'));
  const scale=useTransform(progress,(p:number)=>p>.72?1:.78+Math.sin(index*Math.PI/2-p*Math.PI*2.4)*.16);
  const rotate=useTransform(progress,[0,.72,1],[index%2?12:-12,index%2?-8:8,0]);
  return <motion.div className={`sequence-orbit-message sequence-orbit-message-${index} ${glass}`} style={{x,y,scale,rotate}}><span className="sequence-folio">GONGPAN CHAT / 0{index+1}</span><SpecCopy spec={spec}/></motion.div>;
};
const ConversationOrbit = ({progress,product,glass}:SceneProps) => {
  const draw=useTransform(progress,[0,.7],[.1,1]);
  const centerScale=useTransform(progress,[0,.6,.85,1],[.6,1.25,.5,.15]);
  const centerOpacity=useTransform(progress,[0,.65,.85,1],[1,1,.2,0]);
  return <div className="sequence-conversation">
    <svg className="sequence-conversation-path" viewBox="0 0 800 500"><motion.ellipse cx="400" cy="250" rx="310" ry="180" fill="none" stroke="currentColor" strokeWidth=".7" style={{pathLength:draw}}/><ellipse cx="400" cy="250" rx="240" ry="220" fill="none" stroke="currentColor" opacity=".2" strokeWidth=".7"/></svg>
    <motion.div className="sequence-conversation-center" style={{scale:centerScale,opacity:centerOpacity}}><img src={PRODUCT_VISUALS.chat.overview} alt="" loading="lazy"/></motion.div>
    {product.specs.map((spec,index)=><OrbitMessage key={spec.label} spec={spec} index={index} progress={progress} glass={glass}/>)}
  </div>;
};

export const ProductMaterialSequence:React.FC<{productId:string;product:ShowcaseProduct;zh:boolean;isDark:boolean}> = ({productId,product,zh,isDark}) => {
  const ref=useRef<HTMLElement>(null), reduced=!!useReducedMotion();
  const {scrollYProgress:progress}=useScroll({target:ref,offset:['start start','end end']});
  const glass=`liquid-glass ${isDark?'liquid-glass-dark':'liquid-glass-light'}`;
  const props={progress,product,glass,zh};
  return <section ref={ref} className={`campaign-macro sequence--${productId} ${reduced?'sequence--static':''}`} aria-label={zh?'产品概览':'Product overview'}>
    <div className="campaign-macro-stage">
      <div className="campaign-macro-heading campaign-container"><p className="campaign-small-label">{productId==='pansou'?'DISCOVER MORE':productId==='reading-pro'?'TURN THE PERSPECTIVE':productId==='ai-agent'?'BRING IT TOGETHER':'FIND YOUR CONNECTION'}</p><h2>{HEADINGS[productId][zh?0:1]}</h2></div>
      {reduced ? <div className="sequence-static-grid campaign-container">{product.specs.map(spec=><div key={spec.label} className={glass}><SpecCopy spec={spec}/></div>)}</div> : <>
        <div className="sequence-canvas" aria-hidden="true">{productId==='pansou'?<DiscoveryIris {...props}/>:productId==='reading-pro'?<EditorialBook {...props}/>:productId==='ai-agent'?<ResearchAssembly {...props}/>:<ConversationOrbit {...props}/>}</div>
        <div className="sr-only">{product.specs.map(spec=><p key={spec.label}>{spec.value} {spec.label} {spec.subtext}</p>)}</div>
        <div className="campaign-macro-progress" aria-hidden="true"><motion.div style={{scaleX:progress}}/></div>
      </>}
    </div>
  </section>;
};
