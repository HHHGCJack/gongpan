
import React from 'react';

interface ToastProps {
    message: string;
    show: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, show }) => {
    return (
        <div 
            id="toast"
            className={`fixed left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-5 py-2.5 rounded-full shadow-2xl z-[200] flex items-center gap-3 transition-all duration-500 ${show ? 'top-20 opacity-100' : '-top-20 opacity-0'}`}
        >
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_10px_#FACC15]"></span>
            <span className="text-sm font-medium tracking-wide">{message}</span>
        </div>
    );
};

export default Toast;
