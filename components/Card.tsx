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
      return 'liquid-glass liquid-glass-dark text-white hover:border-white/40 active:border-white/50 hover:shadow-[0_24px_48px_rgba(0,0,0,0.65)]';
    }
    return 'liquid-glass liquid-glass-light text-gray-900 hover:border-white active:border-white hover:shadow-[0_24px_48px_rgba(0,0,0,0.09)]';
  };

  const getTagStyle = () => {
    if (isDark) {
      return 'liquid-glass-pill-dark text-white/90 group-hover:border-white/40 group-active:border-white/50 group-hover:bg-white/10 group-active:bg-white/15';
    }
    return 'liquid-glass-pill-light text-gray-900 group-hover:border-white group-active:border-white group-hover:bg-white/30 group-active:bg-white/40';
  };

  const getButtonStyle = () => {
    if (isDark) {
      return 'liquid-glass-pill-dark text-white/90 group-hover:border-white/40 group-active:border-white/60 group-hover:bg-white/15 group-active:bg-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] group-hover:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.3)]';
    }
    return 'liquid-glass-pill-light text-black group-hover:border-white group-active:border-white group-hover:bg-white/40 group-active:bg-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.8)] group-hover:shadow-[0_4px_14px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]';
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

      {/* Glossy Specular Light Reflection & Active/Hover Ambient Glow */}
      <div className="absolute inset-0 z-[1] rounded-[2.5rem] pointer-events-none overflow-hidden transition-all duration-300">
        {/* Top curved ambient glass gloss */}
        <div className={`absolute top-0 left-0 right-0 h-1/2 rounded-t-[2.5rem] bg-gradient-to-b transition-all duration-300 ${
          isDark 
            ? 'from-white/15 via-white/5 group-hover:from-white/25 group-hover:via-white/10 group-active:from-white/30 group-active:via-white/10' 
            : 'from-white/45 via-white/10 group-hover:from-white/60 group-hover:via-white/20 group-active:from-white/70 group-active:via-white/25'
        } to-transparent`} />
        
        {/* High-intensity top edge specular beam */}
        <div className="absolute top-0 left-[6%] right-[6%] h-[1.5px] bg-gradient-to-r from-transparent via-white/70 group-hover:via-white group-active:via-white group-active:h-[2px] transition-all duration-300" />
        
        {/* Soft radial highlight burst during hover (desktop) & press (mobile) */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none ${
          isDark 
            ? 'bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_50%,transparent_75%)]' 
            : 'bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgba(255,255,255,0.28),rgba(255,255,255,0.08)_50%,transparent_75%)]'
        }`} />

        {/* Bottom specular rim reflex */}
        <div className={`absolute bottom-0 left-0 right-0 h-1/4 rounded-b-[2.5rem] bg-gradient-to-t transition-all duration-300 ${
          isDark 
            ? 'from-white/5 group-hover:from-white/12 group-active:from-white/18' 
            : 'from-white/15 group-hover:from-white/25 group-active:from-white/32'
        } to-transparent`} />
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

