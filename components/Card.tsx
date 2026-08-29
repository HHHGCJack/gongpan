import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Lock } from 'lucide-react';
import { ProductCardProps } from '../types';
import { useTheme, translations as appTranslations } from '../App';

export const Card: React.FC<ProductCardProps> = ({ 
  title, 
  description, 
  imageUrl, 
  gradient,
  href, 
  tag, 
  size = 'normal',
  onToast
}) => {
  const { themeMode, language } = useTheme();
  const isDark = themeMode === 'dark';

  const handleClick = (e: React.MouseEvent) => {
    if (href === '#') {
      e.preventDefault();
      if (onToast) onToast();
    }
  };

  const getGlassClasses = () => {
    if (isDark) {
      return 'liquid-glass liquid-glass-dark text-white hover:border-white/30 active:border-white/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]';
    }
    return 'liquid-glass liquid-glass-light text-gray-900 hover:border-white/90 active:border-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]';
  };

  const getTagStyle = () => {
    if (isDark) {
      return 'liquid-glass-pill-dark text-white/90 group-hover:border-white/40 group-active:border-white/60 group-active:bg-white/15';
    }
    return 'liquid-glass-pill-light text-gray-900 group-hover:border-white group-active:border-white group-active:bg-white/30';
  };

  const getButtonStyle = () => {
    if (isDark) {
      return 'liquid-glass-pill-dark text-white/90 group-hover:border-white/40 group-active:border-white/60 group-active:bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] group-active:shadow-[inset_0_1px_2px_rgba(255,255,255,0.35)]';
    }
    return 'liquid-glass-pill-light text-black group-hover:border-white group-active:border-white group-active:bg-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.8)] group-active:shadow-[0_4px_12px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]';
  };

  const ctaText = href === '#' 
    ? appTranslations[language].comingSoon 
    : appTranslations[language].visitNow;

  return (
    <Link 
      to={href === '#' ? '#' : href} 
      onClick={handleClick}
      onTouchStart={() => {}}
      draggable="false"
      className={`group relative isolate overflow-hidden rounded-[2.5rem] 
        transition-transform duration-200 ease-out
        md:hover:-translate-y-1.5 active:scale-[0.99]
        ${size === 'wide' ? 'md:col-span-2' : 'col-span-1'}
        ${getGlassClasses()}
        h-[420px] md:h-[500px] flex flex-col cursor-pointer
        select-none
      `}
    >
      {/* Background Media Container */}
      <div className={`absolute inset-0 z-0 rounded-[2.5rem] overflow-hidden ${isDark ? 'opacity-60' : 'opacity-90 mix-blend-overlay'}`}>
        {gradient ? (
          <div className={`w-full h-full ${gradient} transition-transform duration-500 ease-out group-hover:scale-105 group-active:scale-105`} />
        ) : (
          <img 
            src={imageUrl} 
            alt={title} 
            loading="lazy"
            decoding="async"
            draggable="false"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-active:scale-105"
          />
        )}
        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black via-black/40 to-transparent' : 'from-white/80 via-white/10 to-transparent'}`} />
      </div>

      {/* Glossy Specular Light Reflection & Active Ambient Glow */}
      <div className="absolute inset-0 z-[1] rounded-[2.5rem] pointer-events-none overflow-hidden transition-all duration-300">
        {/* Top curved ambient glass gloss */}
        <div className={`absolute top-0 left-0 right-0 h-3/5 rounded-t-[2.5rem] bg-gradient-to-b ${isDark ? 'from-white/20 via-white/5 group-active:from-white/40 group-active:via-white/15' : 'from-white/60 via-white/15 group-active:from-white/85 group-active:via-white/35'} to-transparent transition-all duration-200`} />
        
        {/* High-intensity top edge specular beam */}
        <div className="absolute top-0 left-[5%] right-[5%] h-[1.5px] bg-gradient-to-r from-transparent via-white/80 group-active:via-white group-active:h-[2px] transition-all duration-200" />
        
        {/* Radial highlight burst centered on card during active/press */}
        <div className={`absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-200 pointer-events-none ${
          isDark 
            ? 'bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(255,255,255,0.22),rgba(255,255,255,0.06)_50%,transparent_80%)]' 
            : 'bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(255,255,255,0.5),rgba(255,255,255,0.18)_50%,transparent_80%)]'
        }`} />

        {/* Bottom specular rim reflex */}
        <div className={`absolute bottom-0 left-0 right-0 h-1/3 rounded-b-[2.5rem] bg-gradient-to-t ${isDark ? 'from-white/5 group-active:from-white/25' : 'from-white/20 group-active:from-white/45'} to-transparent transition-all duration-200`} />
      </div>

      <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          {tag && (
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border transition-colors duration-200 ${getTagStyle()}`}>
              {tag}
            </span>
          )}
          
          <div className={`p-2.5 rounded-full transition-all duration-200 flex items-center justify-center ${getButtonStyle()}`}>
            {href === '#' ? (
               <Lock className="w-5 h-5" />
            ) : (
               <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 group-active:rotate-45 transition-transform duration-200" />
            )}
          </div>
        </div>

        <div>
          <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-[1.1]">
            {title}
          </h3>
          <p className={`text-sm md:text-lg leading-relaxed max-w-sm font-medium ${isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-800'}`}>
            {description}
          </p>
          
          <div className="mt-8 flex items-center h-6">
             <span className={`text-xs font-semibold border-b ${
               isDark ? 'border-white text-white' : 'border-black text-black'
             }`}>
               {ctaText}
             </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

