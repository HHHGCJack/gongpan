import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Copy, Check, Users, MessageCircle, Sparkles, ShieldAlert, ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../App';

interface BetaApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BetaApplyModal: React.FC<BetaApplyModalProps> = ({ isOpen, onClose }) => {
  const { themeMode, language, showToast } = useTheme();
  const isDark = themeMode === 'dark';
  const [copiedType, setCopiedType] = useState<'qq' | 'wechat' | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const copyToClipboard = (text: string, type: 'qq' | 'wechat', label: string) => {
    const handleSuccess = () => {
      setCopiedType(type);
      showToast?.(language === 'zh' ? `已复制${label}：${text}` : `Copied: ${text}`);
      setTimeout(() => {
        setCopiedType(null);
      }, 2500);
    };

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
        .then(handleSuccess)
        .catch(() => {
          fallbackCopy(text, handleSuccess);
        });
    } else {
      fallbackCopy(text, handleSuccess);
    }
  };

  const fallbackCopy = (text: string, onSuccess: () => void) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        onSuccess();
      } else {
        showToast?.(language === 'zh' ? `复制失败，请手动记录：${text}` : `Failed to copy: ${text}`);
      }
    } catch {
      showToast?.(language === 'zh' ? `复制失败，请手动记录：${text}` : `Failed to copy: ${text}`);
    }
  };

  const texts = {
    zh: {
      title: '申请内测资格',
      subtitle: '本功能目前处于封闭测试状态，仅受邀请用户可以注册账号。请通过以下方式联系申请内测资格：',
      qqTitle: '方式一：加入官方 QQ 群',
      qqNumber: '991366619',
      qqDesc: 'QQ 群号：991366619，进群联系群主或管理员申请开通',
      wechatTitle: '方式二：微信搜索公众号',
      wechatName: 'G胖儿GongPan',
      wechatDesc: '微信搜索公众号「G胖儿GongPan」关注后发送消息或留言申请',
      copy: '复制',
      copied: '已复制',
      tip: '提示：申请时请备注「Chat 内测申请」，我们将尽快为您发放专属邀请码。',
      openClient: '直接前往 Web 客户端',
      close: '关闭'
    },
    en: {
      title: 'Apply for Beta Access',
      subtitle: 'This feature is currently in testing; only invited users can register. Contact us via the channels below to request beta access:',
      qqTitle: 'Method 1: Join Official QQ Group',
      qqNumber: '991366619',
      qqDesc: 'QQ Group: 991366619, contact the group admin for invitation code',
      wechatTitle: 'Method 2: WeChat Official Account',
      wechatName: 'G胖儿GongPan',
      wechatDesc: 'Search WeChat Official Account "G胖儿GongPan" and send a message',
      copy: 'Copy',
      copied: 'Copied',
      tip: 'Tip: Please mention "Chat Beta Access" in your request. We will provide your invitation code shortly.',
      openClient: 'Open Web Client Directly',
      close: 'Close'
    },
    ja: {
      title: 'ベータテスト利用申請',
      subtitle: '本機能は現在テスト段階です。招待されたユーザーのみアカウントを登録できます。以下の方法でお問い合わせください：',
      qqTitle: '方法1：公式QQグループに参加',
      qqNumber: '991366619',
      qqDesc: 'QQグループ：991366619、参加後管理者に招待コードをご請求ください',
      wechatTitle: '方法2：WeChat公式アカウント',
      wechatName: 'G胖儿GongPan',
      wechatDesc: 'WeChatで「G胖儿GongPan」を検索・フォローしてお問い合わせください',
      copy: 'コピー',
      copied: '完了',
      tip: '備考：「Chatベータ申請」と明記してお問い合わせください。',
      openClient: 'Webクライアントを開く',
      close: '閉じる'
    },
    ko: {
      title: '베ータ 테스터 신청',
      subtitle: '본 기능은 현재 테스트 중이며, 초대받은 사용자만 계정을 등록할 수 있습니다. 아래 방법으로 내측 자격을 신청하세요:',
      qqTitle: '방법 1: 공식 QQ 그룹 참여',
      qqNumber: '991366619',
      qqDesc: 'QQ 그룹: 991366619, 가입 후 관리자에게 초대 코드를 요청하세요',
      wechatTitle: '방법 2: WeChat 공식 계정',
      wechatName: 'G胖儿GongPan',
      wechatDesc: 'WeChat에서 "G胖儿GongPan" 검색 후 메시지를 보내주세요',
      copy: '복사',
      copied: '완료',
      tip: '참고: "Chat 베타 신청"이라고 남겨주시면 빠르게 안내해 드립니다.',
      openClient: '웹 클라이언트 바로가기',
      close: '닫기'
    },
    es: {
      title: 'Solicitar Acceso Beta',
      subtitle: 'Esta función está en fase de prueba; solo los usuarios invitados pueden registrarse. Contáctanos por los siguientes medios:',
      qqTitle: 'Método 1: Grupo oficial de QQ',
      qqNumber: '991366619',
      qqDesc: 'Grupo QQ: 991366619, contacta al administrador',
      wechatTitle: 'Método 2: Cuenta oficial de WeChat',
      wechatName: 'G胖儿GongPan',
      wechatDesc: 'Busca "G胖儿GongPan" en WeChat y envía un mensaje',
      copy: 'Copiar',
      copied: 'Copiado',
      tip: 'Nota: Indica "Chat Beta" en tu mensaje para recibir el código de invitación.',
      openClient: 'Abrir cliente web',
      close: 'Cerrar'
    },
    fr: {
      title: 'Demande d\'Accès Bêta',
      subtitle: 'Cette fonctionnalité est en phase de test ; seuls les utilisateurs invités peuvent créer un compte.',
      qqTitle: 'Méthode 1 : Groupe officiel QQ',
      qqNumber: '991366619',
      qqDesc: 'Groupe QQ : 991366619, contactez l\'administrateur',
      wechatTitle: 'Méthode 2 : Compte officiel WeChat',
      wechatName: 'G胖儿GongPan',
      wechatDesc: 'Recherchez « G胖儿GongPan » sur WeChat et envoyez un message',
      copy: 'Copier',
      copied: 'Copié',
      tip: 'Astuce : Mentionnez « Chat Bêta » pour recevoir votre code.',
      openClient: 'Ouvrir le client web',
      close: 'Fermer'
    },
    de: {
      title: 'Beta-Zugang beantragen',
      subtitle: 'Diese Funktion befindet sich in der Testphase; nur eingeladene Benutzer können ein Konto registrieren.',
      qqTitle: 'Methode 1: Offizielle QQ-Gruppe',
      qqNumber: '991366619',
      qqDesc: 'QQ-Gruppe: 991366619, kontaktieren Sie den Administrator',
      wechatTitle: 'Methode 2: Offizieller WeChat-Account',
      wechatName: 'G胖儿GongPan',
      wechatDesc: 'Suchen Sie «G胖儿GongPan» auf WeChat und senden Sie eine Nachricht',
      copy: 'Kopieren',
      copied: 'Kopiert',
      tip: 'Hinweis: Bitte geben Sie «Chat Beta» bei der Anfrage an.',
      openClient: 'Web-Client direkt öffnen',
      close: 'Schließen'
    },
    el: {
      title: 'Αίτηση Πρόσβασης Beta',
      subtitle: 'Αυτή η λειτουργία είναι σε δοκιμαστική φάση. Μόνο προσκεκλημένοι χρήστες μπορούν να εγγραφούν.',
      qqTitle: 'Μέθοδος 1: Επίσημη ομάδα QQ',
      qqNumber: '991366619',
      qqDesc: 'Ομάδα QQ: 991366619, επικοινωνήστε με τον διαχειριστή',
      wechatTitle: 'Μέθοδος 2: Επίσημος λογαριασμός WeChat',
      wechatName: 'G胖儿GongPan',
      wechatDesc: 'Αναζητήστε «G胖儿GongPan» στο WeChat και στείλτε μήνυμα',
      copy: 'Αντιγραφή',
      copied: 'Αντιγράφηκε',
      tip: 'Σημείωση: Αναφέρετε «Chat Beta» στο αίτημά σας.',
      openClient: 'Άνοιγμα Web Client',
      close: 'Κλείσιμο'
    }
  };

  const t = texts[language as keyof typeof texts] || texts.zh;

  if (!mounted) return null;

  const modalNode = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3.5 sm:p-6 overflow-hidden pointer-events-auto overscroll-none">
          {/* Transparent Backdrop (Does NOT darken the background behind the modal) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/0 cursor-pointer -z-10"
          />

          {/* Liquid Glass Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            style={{
              borderRadius: '28px',
              WebkitMaskImage: '-webkit-radial-gradient(white, black)'
            }}
            className={`relative w-full max-w-lg p-5 sm:p-7 rounded-[28px] border liquid-glass z-10 overflow-hidden ${
              isDark 
                ? 'liquid-glass-dark text-white border-white/25 shadow-2xl' 
                : 'liquid-glass-light text-gray-900 border-white/90 shadow-2xl'
            }`}
          >
            {/* Top specular reflection rim */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/50 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between relative z-10 mb-4 sm:mb-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-500 dark:text-sky-400 shrink-0 shadow-inner">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight flex items-center gap-2 text-gray-900 dark:text-white">
                    <span>{t.title}</span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-300 border border-sky-400/30">
                      BETA
                    </span>
                  </h3>
                  <p className="text-xs text-sky-600 dark:text-sky-400 font-medium mt-0.5">
                    GongPan Chat · 邀请制封闭内测
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-black/5 text-gray-500 hover:text-black'
                }`}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <p className={`text-xs sm:text-sm mb-5 leading-relaxed font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {t.subtitle}
            </p>

            {/* Contact Options List */}
            <div className="space-y-3 relative z-10">
              {/* Option 1: QQ Group */}
              <div className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                isDark 
                  ? 'bg-white/[0.04] border-white/10 hover:border-sky-400/40 hover:bg-white/[0.07]' 
                  : 'bg-white/70 border-white/90 hover:border-sky-300 hover:bg-white/90 shadow-sm'
              }`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-500 shrink-0">
                      <Users size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                        {t.qqTitle}
                      </div>
                      <div className="text-base sm:text-lg font-black font-mono tracking-wider text-sky-600 dark:text-sky-400 select-all">
                        991366619
                      </div>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                        {t.qqDesc}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('991366619', 'qq', 'QQ 群号')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer active:scale-95 shadow-sm ${
                      copiedType === 'qq'
                        ? 'bg-emerald-500 text-white shadow-emerald-500/25'
                        : 'bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/25'
                    }`}
                  >
                    {copiedType === 'qq' ? (
                      <>
                        <Check size={13} />
                        <span>{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>{t.copy}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Option 2: WeChat Official Account */}
              <div className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                isDark 
                  ? 'bg-white/[0.04] border-white/10 hover:border-emerald-400/40 hover:bg-white/[0.07]' 
                  : 'bg-white/70 border-white/90 hover:border-emerald-300 hover:bg-white/90 shadow-sm'
              }`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-500 shrink-0">
                      <MessageCircle size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                        {t.wechatTitle}
                      </div>
                      <div className="text-base sm:text-lg font-black tracking-wide text-emerald-600 dark:text-emerald-400 select-all">
                        G胖儿GongPan
                      </div>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                        {t.wechatDesc}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('G胖儿GongPan', 'wechat', '微信公众号名称')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer active:scale-95 shadow-sm ${
                      copiedType === 'wechat'
                        ? 'bg-emerald-500 text-white shadow-emerald-500/25'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/25'
                    }`}
                  >
                    {copiedType === 'wechat' ? (
                      <>
                        <Check size={13} />
                        <span>{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>{t.copy}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Tip */}
            <div className={`mt-4 p-3 rounded-2xl border text-xs leading-relaxed flex items-start space-x-2.5 ${
              isDark ? 'bg-sky-950/40 border-sky-800/40 text-sky-200' : 'bg-sky-50/80 border-sky-200 text-sky-950 shadow-inner'
            }`}>
              <ShieldAlert size={15} className="shrink-0 mt-0.5 text-sky-500 dark:text-sky-400" />
              <span>{t.tip}</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <a
                href="http://gongcheng.yyboxdns.com:21312/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 border transition-all ${
                  isDark
                    ? 'border-white/15 text-gray-300 hover:text-white hover:bg-white/10'
                    : 'border-gray-200 text-gray-700 hover:text-black hover:bg-gray-100'
                }`}
              >
                <span>{t.openClient}</span>
                <ArrowUpRight size={13} />
              </a>

              <button
                onClick={onClose}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  isDark ? 'bg-white/15 hover:bg-white/25 text-white' : 'bg-gray-900 hover:bg-black text-white shadow-sm'
                }`}
              >
                {t.close}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalNode, document.body);
};
