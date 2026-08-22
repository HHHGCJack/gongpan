import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  // Pure logic for jump qualification without altering native physical press animations
  const touchStartTimeRef = useRef<number>(0);
  const touchStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isCancelledRef = useRef<boolean>(false);
  const suppressClickRef = useRef<boolean>(false);

  const TAP_MAX_DURATION = 260; // Max milliseconds for a true quick tap (轻点)
  const MOVE_CANCEL_THRESHOLD = 10; // Max movement in pixels before treating as scroll

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchStartTimeRef.current = Date.now();
    touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
    isCancelledRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartPosRef.current.x;
    const dy = touch.clientY - touchStartPosRef.current.y;
    if (Math.hypot(dx, dy) > MOVE_CANCEL_THRESHOLD) {
      isCancelledRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    const duration = Date.now() - touchStartTimeRef.current;
    // Only genuine quick tap (<260ms and un-dragged) qualifies for jump
    // If the user held the card down and then released (regret / cancelled), disarm the click
    const isQuickTap = !isCancelledRef.current && duration < TAP_MAX_DURATION;

    if (!isQuickTap) {
      suppressClickRef.current = true;
      setTimeout(() => {
        suppressClickRef.current = false;
      }, 400);
    } else {
      suppressClickRef.current = false;
    }
  };

  const handleTouchCancel = () => {
    isCancelledRef.current = true;
    suppressClickRef.current = true;
    setTimeout(() => {
      suppressClickRef.current = false;
    }, 400);
  };

  const handleClick = (e: React.MouseEvent) => {
    // If suppressed because user held down / regretted / scrolled, ignore click
    if (suppressClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (href === '#') {
      e.preventDefault();
      if (onToast) onToast();
    } else if (href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
    }
  };

  const getGlassClasses = () => {
    if (isDark) {
      return 'bg-black/35 bg-gradient-to-br from-white/10 via-transparent to-white/5 backdrop-blur-[24px] backdrop-saturate-[160%] border border-white/15 text-white shadow-[0_24px_50px_rgba(0,0,0,0.45),_inset_0_1px_1px_rgba(255,255,255,0.25)] hover:shadow-[0_36px_72px_rgba(0,0,0,0.65),_inset_0_1px_2px_rgba(255,255,255,0.4)] hover:border-white/25 active:bg-black/50';
    }
    return 'bg-white/15 bg-gradient-to-br from-white/50 via-white/10 to-white/25 backdrop-blur-[24px] backdrop-saturate-[180%] border border-white/60 text-gray-900 shadow-[0_24px_50px_rgba(0,0,0,0.06),_inset_0_1px_1.5px_rgba(255,255,255,0.95)] hover:shadow-[0_36px_72px_rgba(0,0,0,0.12),_inset_0_1px_2px_rgba(255,255,255,1)] hover:border-white/80 active:bg-white/25 active:border-white';
  };

  const getTagStyle = () => {
    if (isDark) {
      return 'bg-white/10 text-white border-white/20 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] group-hover:bg-white/20 group-hover:border-white/40 group-active:bg-white/30';
    }
    return 'bg-white/30 text-gray-900 border-white/60 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] group-hover:bg-white/50 group-hover:border-white/80 group-active:bg-white/60';
  };

  const getButtonStyle = () => {
    if (isDark) {
      return 'bg-white/10 text-white border border-white/20 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] hover:bg-white/25 hover:scale-110 active:scale-95 active:bg-white/35';
    }
    return 'bg-white/30 text-black border border-white/60 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] hover:bg-white/50 hover:scale-110 active:scale-95 active:bg-white/70';
  };

  const ctaText = href === '#' 
    ? appTranslations[language].comingSoon 
    : appTranslations[language].visitNow;

  return (
    <a 
      href={href} 
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onContextMenu={(e) => e.preventDefault()}
      draggable="false"
      className={`group relative isolate overflow-hidden rounded-[2.5rem] transform-gpu will-change-transform 
        transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        md:hover:-translate-y-3 md:hover:scale-[1.02]
        active:scale-[0.98] active:translate-y-0 active:duration-75
        ${size === 'wide' ? 'md:col-span-2' : 'col-span-1'}
        ${getGlassClasses()}
        h-[420px] md:h-[500px] flex flex-col cursor-pointer
        touch-manipulation select-none
      `}
      style={{ 
        WebkitTouchCallout: 'none'
      }}
    >
      {/* Background Media Container with strictly matched rounded-[2.5rem] */}
      <div className={`absolute inset-0 z-0 rounded-[2.5rem] overflow-hidden ${isDark ? 'opacity-60' : 'opacity-90 mix-blend-overlay'}`}>
        {gradient ? (
          <div className={`w-full h-full ${gradient} transform-gpu transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110 group-active:scale-105 will-change-transform`} />
        ) : (
          <img 
            src={imageUrl} 
            alt={title} 
            loading="lazy"
            decoding="async"
            draggable="false"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transform-gpu transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110 group-active:scale-105 will-change-transform`}
          />
        )}
        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black via-black/40 to-transparent' : 'from-white/80 via-white/10 to-transparent'}`}></div>
      </div>

      {/* Glossy Specular Light Reflection */}
      <div className="absolute inset-0 z-[1] rounded-[2.5rem] pointer-events-none overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-1/2 rounded-t-[2.5rem] bg-gradient-to-b ${isDark ? 'from-white/10' : 'from-white/40'} to-transparent`} />
        <div className={`absolute bottom-0 left-0 right-0 h-1/4 rounded-b-[2.5rem] bg-gradient-to-t ${isDark ? 'from-white/5' : 'from-white/15'} to-transparent`} />
      </div>

      <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          {tag && (
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border transition-colors duration-500 ${getTagStyle()}`}>
              {tag}
            </span>
          )}
          
          <div className={`p-2.5 rounded-full transition-all duration-500 flex items-center justify-center ${getButtonStyle()}`}>
            {href === '#' ? (
               <Lock className="w-5 h-5" />
            ) : (
               <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 group-active:rotate-45 transition-transform duration-300" />
            )}
          </div>
        </div>

        <div className="transform transition-transform duration-500 group-hover:-translate-y-1 group-active:-translate-y-0.5">
          <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-[1.1]">
            {title}
          </h3>
          <p className={`text-sm md:text-lg leading-relaxed max-w-sm font-medium transition-opacity duration-500 ${isDark ? 'text-gray-400 group-hover:text-gray-300 group-active:text-gray-300' : 'text-gray-600 group-hover:text-gray-800 group-active:text-gray-800'}`}>
            {description}
          </p>
          
          <div className="mt-8 flex items-center overflow-hidden h-6">
             <span className={`text-xs font-semibold border-b transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] transform-gpu ${
               isDark ? 'border-white text-white' : 'border-black text-black'
             } translate-y-8 group-hover:translate-y-0 group-active:translate-y-0`}>
               {ctaText}
             </span>
          </div>
        </div>
      </div>
    </a>
  );
};
