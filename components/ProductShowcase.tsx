import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useTheme } from '../App';
import { showcaseData } from '../src/data/showcases';
import { openBestPansouNode } from '../src/utils/pansouRouter';
import { preloadRoute } from '../src/utils/preload';
import { ProductVisualStory } from './ProductVisualStory';
import { BetaApplyModal } from './BetaApplyModal';

const normalizeCategoryId = (raw = 'pansou') => {
  const id = raw.toLowerCase().trim();
  if (['pansou', 'pan', 'search', 'resource', 'wangpan'].includes(id)) return 'pansou';
  if (['reading-pro', 'readingpro', 'reading', 'journal', 'waikan'].includes(id)) return 'reading-pro';
  if (['ai-agent', 'ai', 'agent', 'invest', 'quant'].includes(id)) return 'ai-agent';
  if (['chat', 'gongpan-chat', 'im', 'telegram', 'messenger'].includes(id)) return 'chat';
  return 'pansou';
};

export const ProductShowcase: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { themeMode, language, showToast, pansouEnabled, isProductEnabled, openProductNotice } = useTheme();
  const categoryId = normalizeCategoryId(id);
  const product = showcaseData[categoryId][language] || showcaseData[categoryId].zh;
  const isEnabled = isProductEnabled ? isProductEnabled(categoryId) : true;
  const [betaApplyModalOpen, setBetaApplyModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setBetaApplyModalOpen(false);
    if (product.targetUrl.startsWith('/')) preloadRoute(product.targetUrl);
  }, [categoryId, product.targetUrl]);

  const handleVisit = async () => {
    if (isConnecting) return;
    if (!isEnabled) {
      openProductNotice?.(product.title, undefined, categoryId);
      return;
    }
    if (product.requiresPansouCheck && !pansouEnabled) {
      showToast(language === 'zh' ? '因政策原因暂停服务' : 'Service is currently suspended');
      return;
    }
    if (categoryId === 'pansou') {
      setIsConnecting(true);
      showToast(language === 'zh' ? '正在检测可用线路…' : 'Checking available routes…');
      try { await openBestPansouNode(); }
      catch { showToast(language === 'zh' ? '暂时无法连接两条线路，请稍后重试' : 'Both routes are unreachable. Please try again shortly.'); }
      finally { setIsConnecting(false); }
      return;
    }
    if (product.isExternal) window.location.assign(product.targetUrl);
    else navigate(product.targetUrl);
  };

  if (!isEnabled) {
    return <div className="min-h-[85svh] grid place-items-center px-6 pt-20">
      <div className="max-w-md text-center">
        <Lock className="mx-auto mb-6 text-gray-400" size={32} strokeWidth={1} />
        <h1 className="text-2xl font-semibold mb-3">{product.title}</h1>
        <p className="text-gray-500 mb-8">{language === 'zh' ? '该产品暂未开放，请稍后再来。' : 'This product is currently unavailable.'}</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 rounded-full liquid-glass-pill-light text-gray-900">{language === 'zh' ? '返回主页' : 'Back home'}</button>
      </div>
    </div>;
  }

  return <>
    <ProductVisualStory key={categoryId} productId={categoryId} product={product}
      language={language} isDark={themeMode === 'dark'} isConnecting={isConnecting}
      onVisit={handleVisit} onApplyBeta={() => setBetaApplyModalOpen(true)} />
    <BetaApplyModal isOpen={betaApplyModalOpen} onClose={() => setBetaApplyModalOpen(false)} />
  </>;
};
