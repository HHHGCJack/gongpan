import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../App';
import { Language } from '../types';

interface BackButtonProps {
  to?: string;
  onClick?: () => void;
  label?: string;
  className?: string;
}

const backTranslations: Record<Language, string> = {
  zh: '返回主页',
  en: 'Return to Home',
  ja: 'ホームに戻る',
  ko: '홈으로 이동',
  es: 'Volver al Inicio',
  fr: "Retour à l'accueil",
  de: 'Zurück zur Startseite',
  el: 'Επιστροφή στην Αρχική',
};

export const BackButton: React.FC<BackButtonProps> = ({
  to = '/',
  onClick,
  label,
  className = '',
}) => {
  const { themeMode, language } = useTheme();
  const isDark = themeMode === 'dark';

  const buttonText = label || backTranslations[language] || '返回主页';

  const baseClasses = `group relative inline-flex items-center space-x-2 text-sm font-bold transition-all duration-300 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full overflow-hidden active:scale-95 ${
    isDark
      ? 'liquid-glass liquid-glass-pill-dark text-white/90 hover:text-white border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1.5px_1.5px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_2px_2px_rgba(255,255,255,0.55)] hover:border-white/40'
      : 'liquid-glass liquid-glass-pill-light text-gray-800 hover:text-black border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.08),inset_0_2px_2px_rgba(255,255,255,1),inset_0_-1.5px_1.5px_rgba(255,255,255,0.45)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.14),inset_0_2.5px_2.5px_rgba(255,255,255,1)] hover:border-white'
  } ${className}`;

  const content = (
    <>
      {/* Specular Top Lens Reflection */}
      <div className="absolute inset-x-0 top-0 h-1/2 pointer-events-none bg-gradient-to-b from-white/35 dark:from-white/15 to-transparent rounded-t-full" />
      {/* Edge Specular Glow */}
      <div className="absolute top-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-white/90 dark:via-white/50 to-transparent pointer-events-none" />
      
      <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1 relative z-10" />
      <span className="relative z-10 tracking-tight">{buttonText}</span>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClasses} type="button">
        {content}
      </button>
    );
  }

  return (
    <Link to={to} className={baseClasses}>
      {content}
    </Link>
  );
};
