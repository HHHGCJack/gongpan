
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import DonateModal from './components/DonateModal';
import Toast from './components/Toast';

const App: React.FC = () => {
    const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
    const [isToastVisible, setIsToastVisible] = useState(false);
    const toastTimeoutRef = useRef<number | null>(null);

    const showToast = useCallback(() => {
        if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
        }
        setIsToastVisible(true);
        toastTimeoutRef.current = window.setTimeout(() => {
            setIsToastVisible(false);
        }, 2500);
    }, []);
    
    useEffect(() => {
        window.addEventListener('show-toast', showToast);

        return () => {
            window.removeEventListener('show-toast', showToast);
            if (toastTimeoutRef.current) {
                clearTimeout(toastTimeoutRef.current);
            }
        };
    }, [showToast]);

    const toggleDonate = useCallback(() => {
        setIsDonateModalOpen(prev => !prev);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#f5f5f7]">
            <Header onToggleDonate={toggleDonate} />
            <main className="flex-grow">
                <Hero />
                <ProductGrid onShowToast={showToast} />
            </main>
            <Footer />
            <DonateModal isOpen={isDonateModalOpen} onClose={toggleDonate} />
            <Toast message="功能开发中，敬请期待..." show={isToastVisible} />
        </div>
    );
};

export default App;
