import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { Search, FileText, Music2, Film, Globe2, ArrowUpRight, Send, MessageCircle, Lightbulb, Landmark, Sprout } from 'lucide-react';
import { PRODUCT_VISUALS } from '../src/data/productArt';

type Progress = MotionValue<number>;
interface LayerProps { progress: Progress; children: React.ReactNode; className?: string; x?: number[]; y?: number[]; scale?: number[]; rotate?: number[]; rotateY?: number[]; reduced: boolean; intensity?: number }
const Layer: React.FC<LayerProps> = ({ progress, children, className = '', x = [0,0,0], y = [0,0,0], scale = [1,1,1], rotate = [0,0,0], rotateY = [0,0,0], reduced, intensity = 1 }) => {
  // Keep the principal silhouette visible at entry and the companion visible at exit,
  // while the other planes travel well beyond the viewport between those anchors.
  const primary = intensity > 1 && className.includes('art-primary');
  const companion = intensity > 1 && className.includes('art-secondary');
  const travelX = x.map((v, i) => primary && i === 0 ? 0 : companion && i === 2 ? v * .15 * intensity : v * intensity);
  const travelY = y.map((v, i) => primary && i === 0 ? 0 : companion && i === 2 ? v * .15 * intensity : v * intensity * (intensity > 1 ? 1.3 : 1));
  const zoom = scale.map((v, i) => primary && i === 0 ? .82 : companion && i === 2 ? 1.15 : Math.max(.2, 1 + (v - 1) * intensity));
  // A five-beat sequence adds a forward pass and a counter-pass between the anchors.
  const direction = className.includes('secondary') || /-[12]$/.test(className) ? -1 : 1;
  const beats = [0, .24, .5, .76, 1];
  const sweep = (v: number[], amount: number) => [v[0], (v[0] + v[1]) / 2 + amount * direction, v[1], (v[1] + v[2]) / 2 - amount * direction, v[2]];
  const tx = useTransform(progress, beats, sweep(travelX, 85 * intensity));
  const ty = useTransform(progress, beats, sweep(travelY, -100 * intensity));
  const s = useTransform(progress, beats, [zoom[0], Math.max(zoom[0],zoom[1]) * 1.12, zoom[1], Math.max(zoom[1],zoom[2]) * 1.1, zoom[2]]);
  const r = useTransform(progress, beats, sweep(rotate.map(v => v * intensity), 8));
  const ry = useTransform(progress, beats, sweep(rotateY.map(v => Math.max(-65, Math.min(65, v * intensity))), 6));
  const rx = useTransform(progress, beats, [0, -10 * direction, 0, 12 * direction, 0]);
  return <motion.div className={`art-layer ${className}`} style={reduced ? undefined : {x:tx,y:ty,scale:s,rotate:r,rotateY:ry,rotateX:rx}}>{children}</motion.div>;
};
interface Props { productId: string; progress: Progress; reduced: boolean; zh: boolean }
export const ProductParallaxStage = ({ productId: id, progress, reduced, zh }: Props) => {
  const common = {progress,reduced,intensity:id === 'pansou' ? 1 : 1.75};
  const art = (secondary=false) => <img src={secondary?PRODUCT_VISUALS[id].heroSecondary:PRODUCT_VISUALS[id].heroPrimary} alt="" decoding="async" />;
  return <div className={`art-stage art-stage--${id}`} aria-hidden="true">
    <div className="art-ambient" /><div className="art-grid" />
    {id === 'pansou' && <>
      <Layer {...common} className="art-word" x={[220,-100,-570]} y={[0,-40,40]}><span>DISCOVER.</span></Layer>
      <Layer {...common} className="art-cutout art-primary" x={[300,0,-360]} y={[-80,-20,-160]} scale={[.65,1.18,.86]} rotate={[32,-12,-36]}>{art()}</Layer>
      <Layer {...common} className="art-cutout art-secondary" x={[-340,20,370]} y={[160,0,-100]} scale={[.65,.85,1.2]} rotate={[-24,8,22]}>{art(true)}</Layer>
      <Layer {...common} className="art-filmstrip" x={[450,0,-650]} rotate={[17,-8,-20]}>{[Film,Music2,FileText,Film,Globe2,Music2].map((Icon,i)=><div key={i}><Icon strokeWidth={.8}/><span>{['CINEMA','MUSIC','LEARNING'][i%3]}</span></div>)}</Layer>
      <Layer {...common} className="art-search art-glass" x={[-180,0,180]} y={[100,0,-190]} scale={[.75,1,1.12]}><Search size={20}/><span>{zh?'从一个关键词开始。':'Start with a keyword.'}</span><ArrowUpRight size={20}/></Layer>
    </>}
    {id === 'reading-pro' && <>
      <Layer {...common} className="art-word" y={[230,0,-300]}><span>READ<br/><i>the world.</i></span></Layer>
      <Layer {...common} className="art-cutout art-primary" x={[60,0,-180]} y={[230,-50,-350]} scale={[.65,1.1,1.28]} rotate={[-15,8,18]} rotateY={[-40,0,32]}>{art()}</Layer>
      <Layer {...common} className="art-cutout art-secondary" x={[300,0,-260]} y={[-240,20,260]} rotate={[28,-8,-24]} scale={[.8,1,1.1]}>{art(true)}</Layer>
      {[0,1,2].map(i=><Layer key={i} {...common} className={`art-paper art-paper-${i}`} x={[220+i*80,0,-160-i*100]} y={[260-i*120,0,-350+i*100]} rotate={[-35+i*18,8-i*10,30-i*20]} rotateY={[-50,10,55]}><span>0{i+1} / PERSPECTIVE</span><strong>{['Ideas.','Culture.','Tomorrow.'][i]}</strong><div className="art-paper-lines"/>{React.createElement([Lightbulb,Landmark,Sprout][i],{strokeWidth:.6})}</Layer>)}
    </>}
    {id === 'ai-agent' && <>
      <Layer {...common} className="art-word" x={[-200,0,300]} scale={[1.2,1,.8]}><span>SIGNAL<br/>/ NOISE</span></Layer>
      <Layer {...common} className="art-cutout art-primary" x={[-350,0,260]} y={[100,-50,-220]} rotateY={[-35,0,40]} rotate={[-18,0,15]} scale={[.65,1.15,1.35]}>{art()}</Layer>
      <Layer {...common} className="art-cutout art-secondary" x={[370,0,-270]} y={[-190,20,210]} rotate={[25,-6,-28]} scale={[.65,.9,1.08]}>{art(true)}</Layer>
      <Layer {...common} className="art-orbit" rotate={[-70,0,110]} scale={[.6,1,1.3]}><i/><i/><i/></Layer>
      {[0,1,2].map(i=><Layer key={i} {...common} className={`art-data art-data-${i} art-glass`} x={[(i-1)*400,0,(1-i)*330]} y={[-220+i*200,0,250-i*260]} rotate={[-25+i*25,0,25-i*20]}><span>{['CONTEXT','RESEARCH','RISK'][i]}</span><svg viewBox="0 0 160 50"><path d={['M0 35L20 25L40 32L60 10L80 22L100 14L120 30L160 12','M0 20L30 8L60 32L90 22L120 38L160 16','M0 10L30 32L60 16L90 36L120 22L160 30'][i]} fill="none" stroke="currentColor" strokeWidth="2"/></svg><small>{zh?'研究图形示意':'Illustrative research'}</small></Layer>)}
    </>}
    {id === 'chat' && <>
      <Layer {...common} className="art-word" x={[-240,0,330]} rotate={[-9,0,9]}><span>hello<span className="art-word-dot">.</span></span></Layer>
      <Layer {...common} className="art-cutout art-primary" x={[-330,0,300]} y={[-160,0,180]} rotate={[-30,0,24]} scale={[.65,1.15,.8]}>{art()}</Layer>
      <Layer {...common} className="art-cutout art-secondary" x={[320,0,-350]} y={[240,-30,-260]} rotate={[35,-5,-45]} scale={[.5,.95,1.25]}>{art(true)}</Layer>
      {[MessageCircle,Send,MessageCircle].map((Icon,i)=><Layer key={i} {...common} className={`art-message art-message-${i} art-glass`} x={[i%2?400:-300,0,i%2?-380:320]} y={[-220+i*180,0,220-i*200]} rotate={[i%2?24:-24,0,i%2?-15:18]}><Icon size={20}/><span>{zh?['在吗？','分享给你。','很高兴，听见你。'][i]:['Hello?','Something for you.','Good to hear from you.'][i]}</span><i>···</i></Layer>)}
    </>}
  </div>;
};
