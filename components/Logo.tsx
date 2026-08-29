import React, { useEffect } from 'react';
import { useTheme } from '../App';

interface LogoProps {
  size?: number;
  className?: string;
}

const LIGHT_LOGO_URL = 'https://pic1.imgdb.cn/i/034Btz7zzuwPNEbWvK0iIG.jpg';
const DARK_LOGO_URL = 'https://pic1.imgdb.cn/i/034Btz7qvfI0vFKCCLUwsk.jpg';

// Pre-warm browser cache immediately when module is loaded
if (typeof window !== 'undefined') {
  const img1 = new Image();
  img1.src = LIGHT_LOGO_URL;
  const img2 = new Image();
  img2.src = DARK_LOGO_URL;
}

export const Logo: React.FC<LogoProps> = ({ size = 36, className = '' }) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  // Liquid glass border and container styling
  const glassContainerStyle = isDark
    ? 'bg-neutral-800/60 border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),_0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-md'
    : 'bg-white/40 border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),_0_8px_24px_rgba(0,0,0,0.05)] backdrop-blur-md';

  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl p-1 overflow-hidden transition-all duration-300 ease-out hover:scale-110 active:scale-95 cursor-pointer transform-gpu ${glassContainerStyle} ${className}`}
      style={{ width: size, height: size }}
      id="brand-logo-container"
    >
      <img
        src={isDark ? DARK_LOGO_URL : LIGHT_LOGO_URL}
        alt="GongPan Logo"
        className="w-full h-full object-contain rounded-lg select-none"
        referrerPolicy="no-referrer"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
