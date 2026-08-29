import React, { useState, useEffect } from 'react';
import { X, Coffee, Download, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../App';
import { 
  DEFAULT_SUPPORT_QR, 
  SUPPORT_QR_BASE64, 
  SUPPORT_QR_SOURCES 
} from '../src/assets/support_qr_base64';

interface SupportModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ 
  isOpen = false, 
  onClose 
}) => {
  const { themeMode, language } = useTheme();
  const isDark = themeMode === 'dark';
  const [qrImage, setQrImage] = useState<string>(() => {
    const saved = localStorage.getItem('custom_support_qr');
    if (saved && (saved.includes('nloln.de') || saved.includes('img2.') || saved.includes('support_qr_code_1787368553422'))) {
      localStorage.removeItem('custom_support_qr');
      return DEFAULT_SUPPORT_QR;
    }
    return saved || DEFAULT_SUPPORT_QR;
  });

  useEffect(() => {
    fetch('/api/support-qr')
      .then(res => {
        if (res.ok) return res.blob();
        throw new Error('No custom server qr');
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setQrImage(url);
      })
      .catch(() => {
        const saved = localStorage.getItem('custom_support_qr');
        if (saved) setQrImage(saved);
      });
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose?.();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const texts = {
    zh: {
      title: '支持我',
      subtitle: '每一份心意都是持续创作与维护的动力',
      badge: '微信 · 支付宝 扫码支持',
      saveQr: '保存收款码到本地',
      close: '关闭'
    },
    en: {
      title: 'Support Me',
      subtitle: 'Every bit of support fuels continuous development',
      badge: 'WeChat · Alipay Scan to Pay',
      saveQr: 'Save QR Code Image',
      close: 'Close'
    },
    ja: {
      title: 'サポート',
      subtitle: '皆様の温かいご支援が制作と継続の原动力です',
      badge: 'WeChat · Alipay 対応',
      saveQr: 'QRコード画像を保存',
      close: '閉じる'
    },
    ko: {
      title: '후원하기',
      subtitle: '여러분의 응원이 지속적인 개발과 운영의 큰 힘이 됩니다',
      badge: 'WeChat · Alipay 스캔 지원',
      saveQr: 'QR코드 이미지 저장',
      close: '닫기'
    }
  };

  const t = texts[language as keyof typeof texts] || texts.zh;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-hidden pointer-events-auto overscroll-none">
          {/* Transparent Backdrop (Does not darken background) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-transparent cursor-pointer"
          />

          {/* Standalone Support Card - Spacious, Prominent & Non-scrolling */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            className={`relative z-10 p-5 sm:p-7 rounded-[2.2rem] sm:rounded-[2.5rem] border max-w-md sm:max-w-xl w-full my-auto overflow-hidden text-center space-y-3.5 liquid-glass shadow-2xl ${
              isDark 
                ? 'liquid-glass-dark text-white border-white/20' 
                : 'liquid-glass-light text-gray-900 border-white/80'
            }`}
          >
            {/* Top specular reflection rim */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              title={t.close}
            >
              <X size={18} />
            </button>

            {/* Header: Coffee icon badge & Title */}
            <div className="pt-0.5 flex flex-col items-center">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-500 shadow-inner">
                <Coffee size={18} className="text-rose-500 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">{t.title}</h3>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* QR Image Container - Significantly Enlarged, Ultra Crisp & Prominent without triggering scrolling */}
            <div className="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-white shadow-2xl border border-gray-200/80 dark:border-white/40 flex flex-col items-center justify-center mx-auto w-full max-w-[340px] sm:max-w-[420px] transition-all duration-300">
              <div className="overflow-hidden rounded-xl sm:rounded-2xl w-full flex items-center justify-center">
                <img 
                  src={qrImage || SUPPORT_QR_BASE64} 
                  alt="Support QR Code" 
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== SUPPORT_QR_BASE64) {
                      target.src = SUPPORT_QR_BASE64;
                    }
                  }}
                  className="w-full h-auto rounded-xl object-contain max-h-[340px] sm:max-h-[420px]" 
                />
              </div>
            </div>

            {/* Subtitle Badge & Action Button */}
            <div className="space-y-2.5 pt-0.5">
              <div className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-300 flex items-center justify-center space-x-1.5 font-medium">
                <Gift size={13} className="text-rose-500 shrink-0" />
                <span>{t.badge}</span>
              </div>

              <div className="flex justify-center">
                <a
                  href={qrImage || SUPPORT_QR_BASE64}
                  download="GongPan_Support_QR.jpg"
                  className={`w-full max-w-[340px] sm:max-w-[420px] py-2 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all duration-200 active:scale-95 shadow-sm ${
                    isDark 
                      ? 'bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-white/30' 
                      : 'bg-black/5 hover:bg-black/10 text-gray-800 border border-black/10 hover:border-black/20'
                  }`}
                  title="保存赞赏码图片到本地"
                >
                  <Download size={14} />
                  <span>{t.saveQr}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
