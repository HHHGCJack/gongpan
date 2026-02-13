
import React, { useState } from 'react';
import { MenuIcon } from './icons/MenuIcon';
import { XIcon } from './icons/XIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface HeaderProps {
    onToggleDonate: () => void;
}

const NavItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`h-full flex items-center cursor-pointer group ${className}`}>
        {children}
    </div>
);

const MegaMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="mega-menu-container absolute top-full left-0 w-full bg-[rgba(245,245,247,0.85)] backdrop-blur-xl border-b border-black/10 shadow-lg invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300">
        <div className="max-w-4xl mx-auto py-8 px-6">
            {children}
        </div>
    </div>
);

const MobileMenu: React.FC<{ isOpen: boolean; onToggleDonate: () => void; closeMenu: () => void; showToast: () => void; }> = ({ isOpen, onToggleDonate, closeMenu, showToast }) => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const toggleMenu = (menuName: string) => {
        setOpenMenu(openMenu === menuName ? null : menuName);
    };

    const handleActionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        showToast();
        closeMenu();
    };

    return (
        <div className={`fixed top-12 left-0 right-0 z-40 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible -translate-y-4'}`}>
            <div className="mx-4 rounded-2xl border border-gray-200/80 bg-[rgba(245,245,247,0.7)] backdrop-blur-2xl shadow-xl">
                 <div className="flex flex-col text-left space-y-1 p-4">
                     
                     <div className="w-full">
                        <button onClick={() => toggleMenu('study')} className="w-full flex justify-between items-center text-lg font-semibold text-gray-800 py-3 px-3 rounded-lg hover:bg-black/5 transition-colors">
                            <span>学习</span>
                            <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${openMenu === 'study' ? 'rotate-180' : ''}`} />
                        </button>
                        {openMenu === 'study' && (
                             <div className="pl-6 mt-1 pb-2">
                                <a href="http://gongcheng.yyboxdns.com:25045" target="_blank" rel="noopener noreferrer" className="block text-gray-600 py-2 hover:text-blue-600 transition-colors" onClick={closeMenu}>外刊精读 Pro</a>
                             </div>
                        )}
                     </div>

                     <div className="w-full">
                        <button onClick={() => toggleMenu('entertainment')} className="w-full flex justify-between items-center text-lg font-semibold text-gray-800 py-3 px-3 rounded-lg hover:bg-black/5 transition-colors">
                            <span>娱乐</span>
                            <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${openMenu === 'entertainment' ? 'rotate-180' : ''}`} />
                        </button>
                        {openMenu === 'entertainment' && (
                             <div className="pl-6 mt-1 pb-2 space-y-1">
                                <a href="http://gongcheng.yyboxdns.com:12309/" target="_blank" rel="noopener noreferrer" className="block text-gray-600 py-2 hover:text-blue-600 transition-colors" onClick={closeMenu}>网盘影视资源搜</a>
                                <a href="#" onClick={handleActionClick} className="block text-gray-600 py-2 hover:text-blue-600 transition-colors">极简小说</a>
                             </div>
                        )}
                     </div>

                     <div className="w-full">
                        <button onClick={() => toggleMenu('tech')} className="w-full flex justify-between items-center text-lg font-semibold text-gray-800 py-3 px-3 rounded-lg hover:bg-black/5 transition-colors">
                            <span>科技</span>
                            <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${openMenu === 'tech' ? 'rotate-180' : ''}`} />
                        </button>
                        {openMenu === 'tech' && (
                             <div className="pl-6 mt-1 pb-2">
                                <a href="#" onClick={handleActionClick} className="block text-gray-600 py-2 hover:text-blue-600 transition-colors">AI 影视智能体</a>
                             </div>
                        )}
                     </div>

                    <button onClick={() => { onToggleDonate(); closeMenu(); }} className="text-lg font-semibold text-gray-800 py-3 px-3 rounded-lg hover:bg-black/5 transition-colors text-left">支持我</button>
                </div>
            </div>
        </div>
    );
};


const Header: React.FC<HeaderProps> = ({ onToggleDonate }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
    
    const showToast = () => {
        const event = new CustomEvent('show-toast');
        window.dispatchEvent(event);
    }

    const handleMegaMenuToastClick = (e: React.MouseEvent) => {
        e.preventDefault();
        showToast();
    };

    return (
        <>
            <header className="glass-nav fixed top-0 w-full z-50 h-12 flex justify-center text-[13px] font-medium tracking-wide">
                <div className="max-w-5xl w-full px-6 flex justify-between items-center h-full">
                    <a href="#" className="text-xl font-bold tracking-tighter text-gray-900 hover:opacity-70 transition-opacity">
                        G胖儿<span className="text-base font-medium opacity-70 ml-1">GongPan</span>
                    </a>

                    <nav className="hidden md:flex h-full items-center space-x-10 text-gray-700">
                        <NavItem>
                            <span className="group-hover:text-black transition-colors">学习</span>
                            <MegaMenu>
                                 <a href="http://gongcheng.yyboxdns.com:25045" target="_blank" rel="noopener noreferrer" className="group/link block">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover/link:text-blue-600 transition">外刊精读 Pro</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">深度解析全球顶级刊物，打破语言围墙。</p>
                                </a>
                            </MegaMenu>
                        </NavItem>
                        <NavItem>
                            <span className="group-hover:text-black transition-colors">娱乐</span>
                             <MegaMenu>
                                <div className="grid grid-cols-2 gap-x-8">
                                    <a href="http://gongcheng.yyboxdns.com:12309/" target="_blank" rel="noopener noreferrer" className="block group/link">
                                        <div className="text-xl font-semibold text-gray-900 mb-1 flex items-center gap-2 group-hover/link:text-blue-600 transition">
                                            网盘影视资源搜
                                            <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold">HOT</span>
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed">全网资源一键直达，极速检索。</p>
                                    </a>
                                    <div onClick={handleMegaMenuToastClick} className="block group/link cursor-pointer">
                                        <div className="text-xl font-semibold text-gray-900 mb-1 group-hover/link:text-blue-600 transition">
                                            极简小说
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed">沉浸式阅读体验 (开发中)</p>
                                    </div>
                                </div>
                            </MegaMenu>
                        </NavItem>
                        <NavItem>
                            <span className="group-hover:text-black transition-colors">科技</span>
                            <MegaMenu>
                                <div onClick={handleMegaMenuToastClick} className="flex items-center gap-6 cursor-pointer group/link">
                                    <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center text-sm font-bold shadow-lg">AI</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover/link:text-blue-600 transition">AI 影视智能体</h3>
                                        <p className="text-sm text-gray-500 mt-1">最懂你的数字观影伴侣 (Coming Soon)</p>
                                    </div>
                                </div>
                            </MegaMenu>
                        </NavItem>
                        <button onClick={onToggleDonate} className="hover:text-black transition-colors">支持我</button>
                    </nav>

                    <div className="md:hidden">
                        <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-black z-50 relative">
                            {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </header>
            <MobileMenu isOpen={isMobileMenuOpen} onToggleDonate={onToggleDonate} closeMenu={() => setMobileMenuOpen(false)} showToast={showToast} />
        </>
    );
};

export default Header;
