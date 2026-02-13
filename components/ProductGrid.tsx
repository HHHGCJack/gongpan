
import React from 'react';

interface ProductGridProps {
    onShowToast: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onShowToast }) => {
    return (
        <section className="max-w-5xl w-full mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <a href="http://gongcheng.yyboxdns.com:12309/" target="_blank" rel="noopener noreferrer" className="product-card col-span-1 md:col-span-2 relative h-[450px] rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-200/50 group block">
                    <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop"
                         alt="Search"
                         className="card-image absolute inset-0 w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end text-white">
                        <div className="mb-4">
                            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded mb-3 inline-block shadow-lg shadow-blue-600/30">ONLINE</span>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-2">网盘影视资源搜</h2>
                            <p className="text-gray-200 text-sm max-w-md opacity-90">聚合全网资源，打破信息孤岛。一次搜索，无限内容。</p>
                        </div>
                        <div className="flex items-center text-sm font-medium opacity-80 group-hover:opacity-100 transition">
                            立即访问 <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </div>
                    </div>
                </a>

                <div onClick={onShowToast} className="product-card cursor-pointer relative h-[450px] rounded-3xl overflow-hidden bg-gray-100 border border-gray-200/50 group">
                    <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop"
                         alt="Read"
                         className="card-image absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"/>
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition"></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <div className="bg-white/80 backdrop-blur-md px-5 py-4 rounded-2xl shadow-lg">
                            <h3 className="text-lg font-bold text-gray-900">极简小说</h3>
                            <p className="text-gray-600 text-xs mt-1">沉浸式阅读体验 (开发中)</p>
                        </div>
                    </div>
                </div>

                 <a href="http://gongcheng.yyboxdns.com:25045" target="_blank" rel="noopener noreferrer" className="product-card md:col-span-2 lg:col-span-2 relative h-[300px] rounded-3xl overflow-hidden bg-white border border-gray-200/50 group flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=800&auto=format&fit=crop"
                             className="card-image w-full h-full object-cover" alt="Study"/>
                    </div>
                    <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                        <span className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-2 block">Premium</span>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">外刊精读 Pro</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">精选《经济学人》、《纽约客》深度文章，配合 AI 词汇解析。</p>
                        <span className="text-blue-600 text-sm font-semibold flex items-center group-hover:text-blue-700">
                           立即学习 <span className="ml-1.5 group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                    </div>
                </a>

                <div onClick={onShowToast} className="product-card cursor-pointer relative h-[300px] rounded-3xl overflow-hidden bg-black text-white group">
                    <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop"
                         alt="AI"
                         className="card-image absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"/>
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 blur-2xl absolute opacity-30 group-hover:opacity-50 transition-all duration-700"></div>
                        <h3 className="text-2xl font-bold relative">AI 智能体</h3>
                        <p className="text-gray-400 text-xs mt-2 relative">Coming Soon</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProductGrid;
