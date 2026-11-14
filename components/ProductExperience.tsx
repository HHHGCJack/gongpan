import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Search, BookOpen, Send, ChevronLeft, ChevronRight, Bookmark, X, RotateCcw, Image as ImageIcon, Languages, Minus, Plus, SlidersHorizontal } from 'lucide-react';
import { PRODUCT_VISUALS } from '../src/data/productArt';

interface Props { productId:string; language:string; onVisit:()=>void; onApplyBeta:()=>void; isConnecting:boolean; isDark:boolean }
interface DemoProps { zh:boolean; onVisit:()=>void; onApplyBeta:()=>void; isConnecting:boolean }
const RESOURCES = [
  { id:1,zh:'山海之间 · 自然纪录片',en:'Between Mountains and Sea · Documentary',type:'film',size:'2.4 GB',files:['Episode 01.mp4','Episode 02.mp4','Subtitles.srt'] },
  { id:2,zh:'城市光影 · 短片合集',en:'City Lights · Short films',type:'film',size:'860 MB',files:['City lights.mp4','Behind the scenes.mp4'] },
  { id:3,zh:'夜航 · 钢琴音乐',en:'Night Flight · Piano collection',type:'music',size:'320 MB',files:['01 Night flight.flac','02 A quiet morning.flac','Album booklet.pdf'] },
  { id:4,zh:'自然声景 · 环境音乐',en:'Natural Soundscapes · Ambient',type:'music',size:'180 MB',files:['Forest.wav','Ocean.wav','Rain.wav'] },
  { id:5,zh:'设计与创作 · 学习资料',en:'Design & Creativity · Learning',type:'learn',size:'42 MB',files:['Design notes.pdf','Color workbook.pdf'] },
  { id:6,zh:'世界建筑 · 阅读手册',en:'World Architecture · Reading guide',type:'learn',size:'68 MB',files:['Architecture.pdf','Reading list.pdf'] },
];
const ResourceDemo = ({zh,onVisit,isConnecting}:DemoProps) => {
  const [query,setQuery]=useState(''),[category,setCategory]=useState('all');
  const [selected,setSelected]=useState<number|null>(null),[saved,setSaved]=useState<number[]>([]);
  const filtered=RESOURCES.filter(r=>(category==='all'||r.type===category)&&(!query||(zh?r.zh:r.en).toLowerCase().includes(query.trim().toLowerCase())));
  const item=RESOURCES.find(r=>r.id===selected);
  return <div className="campaign-search-demo">
    <div className="campaign-demo-wordmark">{zh?'从找到，到看清楚。':'Find it. Take a closer look.'}</div>
    <label className="campaign-search-field"><Search size={19}/><input aria-label={zh?'筛选示例内容':'Filter sample content'} value={query} onChange={e=>{setQuery(e.target.value);setSelected(null);}} placeholder={zh?'搜索示例：自然、音乐、设计…':'Try nature, piano or design…'}/>{query&&<button aria-label={zh?'清空示例搜索':'Clear sample search'} onClick={()=>setQuery('')}><X size={15}/></button>}</label>
    <div className="playground-chips" aria-label={zh?'示例内容分类':'Sample categories'}>{[['all','全部','All'],['film','影视','Films'],['music','音乐','Music'],['learn','学习','Learning']].map(([id,cn,en])=><button key={id} aria-pressed={category===id} onClick={()=>{setCategory(id);setSelected(null);}}>{zh?cn:en}</button>)}</div>
    <div className="playground-resource-layout"><div className="campaign-search-results"><p className="playground-caption" role="status">{zh?`${filtered.length} 条匹配示例 · 点击查看文件`:`${filtered.length} sample matches · Select to preview`}</p>
      {filtered.map(r=><button className="campaign-search-result playground-result" key={r.id} aria-pressed={selected===r.id} onClick={()=>setSelected(r.id)}><span className="campaign-result-mark">0{r.id}</span><span>{zh?r.zh:r.en}<small>{r.size} · {r.files.length} {zh?'个文件':'files'}</small></span><ChevronRight size={16}/></button>)}
      {!filtered.length&&<p className="campaign-empty">{zh?'没有匹配的示例，试试其他分类或关键词。':'No sample matches. Try another category or keyword.'}</p>}
    </div><div className="playground-file-preview" aria-live="polite">{item?<><span className="campaign-small-label">FILE PREVIEW</span><h3>{zh?item.zh:item.en}</h3><ul>{item.files.map(file=><li key={file}><span>{file}</span></li>)}</ul><button className="playground-inline-action" aria-pressed={saved.includes(item.id)} onClick={()=>setSaved(s=>s.includes(item.id)?s.filter(id=>id!==item.id):[...s,item.id])}><Bookmark size={15} fill={saved.includes(item.id)?'currentColor':'none'}/>{zh?(saved.includes(item.id)?'已收藏此示例':'收藏此示例'):(saved.includes(item.id)?'Sample saved':'Save sample')}</button></>:<div className="playground-preview-empty"><Search size={28} strokeWidth={1}/><p>{zh?'选一条结果，展开文件清单。':'Select a result to explore its files.'}</p></div>}</div></div>
    <div className="campaign-demo-foot"><span>{zh?'本地示例库 · 非真实网盘资源':'Local sample library · Not live resources'}</span><button onClick={onVisit} disabled={isConnecting}>{zh?(isConnecting?'连接中…':'进入资源搜索'):'Open search'}<ArrowRight size={15}/></button></div>
  </div>;
};

const ARTICLES = [
  {title:'A wider perspective',cnTitle:'一种更开阔的视角',text:'A new perspective begins with a simple question. When we read beyond familiar ideas, the world becomes a little larger. A page can be a quiet place to meet a different way of thinking.',cn:'新的视角，始于一个简单的问题。当阅读超越熟悉的观念，世界也会随之扩大。一页文字，可以是与另一种思考方式相遇的安静空间。',word:'perspective',meaning:'视角；看待事物的方式',enMeaning:'A particular way of considering or understanding something.'},
  {title:'The shape of a city',cnTitle:'城市的形状',text:'A city is more than its skyline. Its character lives in small places: a shaded street, a public garden, a library open to everyone. Thoughtful design makes ordinary moments feel more generous.',cn:'城市不止有天际线。它的性格藏在细微之处：一条林荫街道、一座公共花园、一间向所有人开放的图书馆。用心的设计，让寻常时刻也变得宽裕。',word:'character',meaning:'特征；性格；独特的气质',enMeaning:'The distinctive qualities that make a place or person unique.'},
  {title:'Room for curiosity',cnTitle:'为好奇心留一点空间',text:'Curiosity does not always need a destination. Sometimes we follow a small detail, then discover a connection we had never noticed. Learning grows when we make room for questions as well as answers.',cn:'好奇心并不总需要一个终点。有时顺着一个微小的细节，就会发现此前未曾注意的联系。既容纳答案，也容纳问题，学习才能持续生长。',word:'Curiosity',meaning:'好奇心；探索未知的愿望',enMeaning:'The desire to learn about or discover something.'},
  {title:'The value of attention',cnTitle:'专注的价值',text:'Attention is a choice about what matters now. Slowing down for a paragraph can change what we notice. Reading offers a small invitation: stay with an idea long enough to understand it.',cn:'专注，是对眼前重要之事的一次选择。为一段文字放慢脚步，可能改变我们的观察。阅读发出一个小小的邀请：与一种观点多相处一会儿，直到理解它。',word:'Attention',meaning:'注意；专注；关注',enMeaning:'The act of directing your thoughts toward something.'},
];
const ReaderDemo = ({zh,onVisit}:DemoProps) => {
  const [spread,setSpread]=useState(true),[page,setPage]=useState(0),[translation,setTranslation]=useState(false),[font,setFont]=useState(17),[wordOpen,setWordOpen]=useState(false),[saved,setSaved]=useState<number[]>([]);
  const article=ARTICLES[page],parts=article.text.split(article.word);
  const changePage=(n:number)=>{setPage(n);setWordOpen(false);};
  return <div className="campaign-reader-demo">
    <div className="campaign-reader-controls playground-reader-controls"><span><BookOpen size={16}/>{zh?'原创短文 · 点词释义':'Original sample · Select the highlighted word'}</span><div className="playground-control-group"><button onClick={()=>setSpread(v=>!v)} aria-pressed={spread}>{zh?(spread?'双页':'单页'):(spread?'Spread':'Single')}</button><button onClick={()=>setTranslation(v=>!v)} aria-pressed={translation}><Languages size={14}/>{zh?'译文':'Translation'}</button><button aria-label={zh?'缩小阅读字号':'Decrease reading size'} disabled={font<=15} onClick={()=>setFont(v=>v-2)}><Minus size={14}/></button><button aria-label={zh?'增大阅读字号':'Increase reading size'} disabled={font>=21} onClick={()=>setFont(v=>v+2)}><Plus size={14}/></button><button aria-label={zh?'收藏这一页':'Bookmark this page'} aria-pressed={saved.includes(page)} onClick={()=>setSaved(s=>s.includes(page)?s.filter(n=>n!==page):[...s,page])}><Bookmark size={14} fill={saved.includes(page)?'currentColor':'none'}/></button></div></div>
    <div className={`campaign-book playground-book ${spread?'campaign-book--spread':''}`}>
      {spread&&<div className="campaign-book-cover"><img src={PRODUCT_VISUALS['reading-pro'].demo} alt="" loading="lazy"/><div><span>GONGPAN / READING</span><strong>Perspective.</strong><span>0{page+1} / {article.title}</span></div></div>}
      <article className="campaign-book-page playground-article" style={{'--reading-size':`${font}px`} as React.CSSProperties}><span className="campaign-book-number">0{page+1} / 04</span><h3>{article.title}</h3><p>{parts.map((part,i)=><React.Fragment key={i}>{part}{i<parts.length-1&&<button className="playground-word" aria-expanded={wordOpen} onClick={()=>setWordOpen(v=>!v)}>{article.word}</button>}</React.Fragment>)}</p>{wordOpen&&<aside className="playground-vocabulary" aria-live="polite"><strong>{article.word}</strong><span>{zh?article.meaning:article.enMeaning}</span></aside>}{translation&&<div className="playground-translation"><h4>{article.cnTitle}</h4><p>{article.cn}</p></div>}</article>
    </div>
    <div className="campaign-demo-foot"><div className="campaign-page-controls"><button aria-label={zh?'上一页示例':'Previous sample page'} disabled={page===0} onClick={()=>changePage(page-1)}><ChevronLeft size={16}/></button><span>{page+1} / {ARTICLES.length}</span><button aria-label={zh?'下一页示例':'Next sample page'} disabled={page===ARTICLES.length-1} onClick={()=>changePage(page+1)}><ChevronRight size={16}/></button></div><span>{zh?'原创示例文章':'Original sample articles'}</span><button onClick={onVisit}>{zh?'打开阅读空间':'Open reader'}<ArrowRight size={15}/></button></div>
  </div>;
};

const DATASETS:Record<string,number[]>={A:[102,98,103,109,106,101,105,111,108,115,112,107,110,116,113,109,105,111,118,114,119,115,110,117,121,116,112,118,115,120],US:[110,114,108,104,109,115,112,106,101,108,113,109,116,120,114,110,117,113,108,112,119,116,122,118,114,120,125,119,123,121]};
const ResearchDemo = ({zh,onVisit}:DemoProps) => {
  const [market,setMarket]=useState('A'),[period,setPeriod]=useState(14),[average,setAverage]=useState(true),[point,setPoint]=useState(13);
  const values=DATASETS[market].slice(-period),min=Math.min(...values)-4,max=Math.max(...values)+4;
  const pointAt=(i:number,v:number)=>[i/(values.length-1)*800,160-(v-min)/(max-min)*135];
  const line=values.map((v,i)=>`${i?'L':'M'}${pointAt(i,v).join(' ')}`).join(' ');
  const avg=values.map((_,i)=>{const a=values.slice(Math.max(0,i-3),i+1);return a.reduce((s,v)=>s+v,0)/a.length;});
  const averageLine=avg.map((v,i)=>`${i?'L':'M'}${pointAt(i,v).join(' ')}`).join(' ');
  const selected=Math.min(point,values.length-1),position=pointAt(selected,values[selected]);
  return <div className="campaign-research-demo">
    <div className="campaign-research-heading"><div><span className="campaign-small-label">EXPLORE THE SAMPLE</span><h3>{zh?'把图表，交给你探索。':'Explore the chart yourself.'}</h3></div><div className="campaign-segmented">{['A','US'].map(id=><button key={id} aria-pressed={market===id} onClick={()=>setMarket(id)}>{id==='A'?(zh?'A 股示例':'A-share sample'):(zh?'美股示例':'US sample')}</button>)}</div></div>
    <div className="playground-chart-controls"><label><SlidersHorizontal size={14}/>{zh?'采样范围':'Sample range'}<select aria-label={zh?'示例采样范围':'Sample range'} value={period} onChange={e=>{const n=Number(e.target.value);setPeriod(n);setPoint(n-1);}}>{[7,14,30].map(n=><option key={n} value={n}>{n} {zh?'个点':'points'}</option>)}</select></label><button aria-pressed={average} onClick={()=>setAverage(v=>!v)}>{zh?'四点均线':'4-point average'}</button><output>{zh?'示例指数':'Sample index'} <strong>{values[selected]}</strong></output></div>
    <div className="campaign-chart playground-chart"><div className="campaign-chart-grid"/><svg viewBox="0 0 800 180" role="img" aria-label={zh?'可交互的虚构指数曲线':'Interactive fictional index chart'} preserveAspectRatio="none" onPointerMove={e=>{const b=e.currentTarget.getBoundingClientRect();setPoint(Math.round(Math.max(0,Math.min(1,(e.clientX-b.left)/b.width))*(values.length-1)));}}><path d={`${line} L800 180 L0 180Z`} fill="currentColor" opacity=".08"/><path d={line} fill="none" stroke="currentColor" strokeWidth="2"/>{average&&<path d={averageLine} fill="none" stroke="#e5a451" strokeWidth="2" strokeDasharray="6 5"/>}<line x1={position[0]} x2={position[0]} y1="0" y2="180" stroke="currentColor" opacity=".3" strokeDasharray="3 4"/><circle cx={position[0]} cy={position[1]} r="5" fill="currentColor" stroke="var(--campaign-bg)" strokeWidth="2"/></svg></div>
    <label className="playground-chart-scrubber"><span>{zh?'拖动查看数据点':'Scrub through the data'}</span><input type="range" min="0" max={values.length-1} value={selected} onChange={e=>setPoint(Number(e.target.value))} aria-label={zh?'查看示例数据点':'Inspect sample data point'}/><output>{selected+1} / {values.length}</output></label>
    <div className="campaign-research-notes"><div><span>{zh?'区间最低':'Range low'}</span><p>{Math.min(...values)}</p></div><div><span>{zh?'区间最高':'Range high'}</span><p>{Math.max(...values)}</p></div><div><span>{zh?'区间均值':'Range mean'}</span><p>{(values.reduce((s,v)=>s+v,0)/values.length).toFixed(1)}</p></div></div>
    <div className="campaign-demo-foot"><span>{zh?'虚构数据 · 用于演示图表交互':'Fictional data · Chart interaction demo'}</span><button onClick={onVisit}>{zh?'进入研究空间':'Open research'}<ArrowRight size={15}/></button></div>
  </div>;
};

interface Message {id:number;text:string;sent:boolean;image?:boolean}
const ChatDemo = ({zh,onApplyBeta}:DemoProps) => {
  const initial:Message[]=[{id:0,text:zh?'你好！在这里试着聊一句吧。':'Hello! Try a message here.',sent:false}];
  const [messages,setMessages]=useState<Message[]>(initial),[draft,setDraft]=useState(''),[typing,setTyping]=useState(false);
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null),counter=useRef(1),conversation=useRef<HTMLDivElement>(null);
  useEffect(()=>{const el=conversation.current;if(el)el.scrollTop=el.scrollHeight;},[messages,typing]);
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
  const send=(text:string,image=false)=>{
    if(typing||(!text.trim()&&!image)||(image&&messages.some(m=>m.image)))return;
    const messageId=counter.current++;
    setMessages(m=>[...m,{id:messageId,text:text.trim(),sent:true,image}].slice(-8));setDraft('');setTyping(true);
    timer.current=setTimeout(()=>{const replyId=counter.current++;setMessages(m=>[...m,{id:replyId,text:zh?(image?'收到了，这张示例图片很有意思。':'收到啦。每一段对话，都从一句简单的问候开始。'):(image?'Got it. That is a lovely sample image.':'Got it. A conversation begins with a little hello.'),sent:false}].slice(-8));setTyping(false);timer.current=null;},650);
  };
  const reset=()=>{if(timer.current)clearTimeout(timer.current);timer.current=null;setMessages(initial);setDraft('');setTyping(false);};
  return <div className="campaign-chat-demo"><div className="campaign-chat-contact"><div className="campaign-avatar">G</div><div><strong>{zh?'演示好友':'Demo friend'}</strong><span>{zh?'本地模拟会话':'Local simulated conversation'}</span></div><button className="playground-chat-reset" onClick={reset} aria-label={zh?'重置演示对话':'Reset demo conversation'}><RotateCcw size={16}/></button></div>
    <div ref={conversation} className="campaign-conversation playground-conversation" role="log" aria-live="polite" aria-label={zh?'本地演示对话':'Local demo conversation'}>{messages.map(m=><div key={m.id} className={`campaign-bubble ${m.sent?'campaign-bubble--sent':''}`}>{m.image&&<img className="playground-chat-image" src={PRODUCT_VISUALS.chat.demo} alt={zh?'发送的示例图像':'Sent sample illustration'}/>}<span>{m.text}</span></div>)}{typing&&<div className="playground-typing" role="status">{zh?'演示好友正在输入…':'Demo friend is typing…'}</div>}</div>
    <div className="playground-quick-replies">{(zh?['你好，今天怎么样？','分享一个新发现。']:['Hello, how was your day?','Something new to share.']).map(text=><button key={text} disabled={typing} onClick={()=>send(text)}>{text}</button>)}</div>
    <form className="campaign-message-field" onSubmit={e=>{e.preventDefault();send(draft);}}><button type="button" className="playground-attach" disabled={typing||messages.some(m=>m.image)} title={zh?'每轮对话可试发一张独立示例图':'One sample image per demo conversation'} aria-label={zh?'发送示例图片':'Send sample image'} onClick={()=>send(zh?'分享一张示例图片。':'Sharing a sample image.',true)}><ImageIcon size={17}/></button><input aria-label={zh?'试写预览消息':'Write a preview message'} value={draft} maxLength={160} onChange={e=>setDraft(e.target.value)} placeholder={zh?'写一句话，看看回应…':'Write a message and see a reply…'}/><button type="submit" disabled={!draft.trim()||typing} aria-label={zh?'发送本地预览消息':'Send local preview message'}><Send size={17}/></button></form>
    <div className="campaign-demo-foot"><span>{zh?'本地模拟 · 消息与图片均不会发出':'Local simulation · No messages or images are sent'}</span><button onClick={onApplyBeta}>{zh?'申请内测':'Apply for beta'}<ArrowRight size={15}/></button></div>
  </div>;
};

export const ProductExperience:React.FC<Props> = ({productId,language,onVisit,onApplyBeta,isConnecting,isDark}) => {
  const ref=useRef<HTMLDivElement>(null),reduced=!!useReducedMotion(),zh=language==='zh';
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
  const leftY=useTransform(scrollYProgress,[0,1],[75,-100]),rightY=useTransform(scrollYProgress,[0,1],[-50,95]);
  const rotate=useTransform(scrollYProgress,[0,1],[-9,9]);
  const demoProps={zh,onVisit,onApplyBeta,isConnecting};
  const labels:Record<string,string[]>={pansou:['SEARCH','PREVIEW','SAVE'],'reading-pro':['READ','TRANSLATE','BOOKMARK'],'ai-agent':['EXPLORE','COMPARE','INSPECT'],chat:['SAY HELLO','SHARE','CONNECT']};
  return <div ref={ref} className="playground-stage"><div className="playground-parallax" aria-hidden="true"><motion.span className="playground-orbit-token playground-orbit-token--left" style={reduced?undefined:{y:leftY,rotate}}>{labels[productId][0]}</motion.span><motion.span className="playground-orbit-token playground-orbit-token--right" style={reduced?undefined:{y:rightY,rotate}}>{labels[productId][1]}</motion.span><div className="playground-halo"/></div>
    <div className={`campaign-demo campaign-demo--${productId} liquid-glass ${isDark?'liquid-glass-dark':'liquid-glass-light'}`}><div className="campaign-demo-toolbar"><span className="campaign-window-dots" aria-hidden="true"><i/><i/><i/></span><span>{productId==='pansou'?'PanSou':productId==='reading-pro'?'Reading Pro':productId==='ai-agent'?'Research Studio':'GongPan Chat'}</span><span className="campaign-demo-label">{zh?'动手试一试':'PLAYGROUND'}</span></div>
      {productId==='pansou'?<ResourceDemo {...demoProps}/>:productId==='reading-pro'?<ReaderDemo {...demoProps}/>:productId==='ai-agent'?<ResearchDemo {...demoProps}/>:<ChatDemo {...demoProps}/>}
    </div></div>;
};
