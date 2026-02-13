import React, { useEffect } from 'react';
import { XIcon } from './icons/XIcon';

interface DonateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 bg-black/60"
            onClick={onClose}
        >
            <div 
                className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-sm m-4 transition-all duration-300 transform scale-95 opacity-0 animate-scale-in" 
                onClick={(e) => e.stopPropagation()}
            >
                <style>{`
                    @keyframes scale-in {
                        to {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    .animate-scale-in {
                        animation: scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                    }
                `}</style>

                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition-colors z-10 bg-white/50 rounded-full p-1">
                    <XIcon />
                </button>
                
                <div className="p-4 pt-6 text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">感谢您的支持</h2>
                    <p className="text-gray-500 mb-4 text-sm">您的慷慨是项目前进的动力</p>
                    <img 
                        src="https://s41.ax1x.com/2026/02/13/pZqMwFA.jpg"
                        alt="Payment QR Codes for WeChat and Alipay"
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default DonateModal;
