import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Camera, X } from 'lucide-react';

const Portfolio = () => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
    const [selectedImage, setSelectedImage] = useState(null);

    const categories = [
        { id: 'all', name: 'ALL' },
        { id: 'wedding', name: 'WEDDING' },
        { id: 'prewedding', name: 'PRE WEDDING' },
        { id: 'maternity', name: 'MATERNITY' },
        { id: 'baby', name: 'BABY' },
        { id: 'models', name: 'MODELS' },
    ];

    const portfolioItems = [
        { id: 1, category: 'wedding', image: '/images/services/wedding.png' },
        { id: 2, category: 'wedding', image: '/images/bride-1.png' },
        { id: 3, category: 'prewedding', image: '/images/services/portrait.png' },
        { id: 4, category: 'wedding', image: '/images/services/wedding-ceremony.png' },
        { id: 5, category: 'wedding', image: '/images/services/wedding-reception.png' },
        { id: 6, category: 'prewedding', image: '/images/services/prewedding-outdoor.png' },
        { id: 7, category: 'wedding', image: '/images/bride-1.png' },
        { id: 8, category: 'prewedding', image: '/images/services/portrait.png' },
        { id: 9, category: 'wedding', image: '/images/services/wedding.png' },
        { id: 10, category: 'maternity', image: '/images/bride-1.png' },
        { id: 11, category: 'baby', image: '/images/bride-2.png' },
        { id: 12, category: 'models', image: '/images/bride-1.png' },
    ];

    const filteredItems =
        activeCategory === 'all'
            ? portfolioItems
            : portfolioItems.filter((item) => item.category === activeCategory);

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-10 right-10 text-white hover:text-gold transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-10 h-10" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-5xl max-h-[75vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                className="w-auto h-full max-h-[75vh] object-contain shadow-2xl rounded-lg"
                                alt="Gallery Preview"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <section className="py-20 border-b border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-display font-bold mb-4 tracking-tighter">OUR PORTFOLIO</h1>
                        <p className="text-xl text-gold font-serif italic tracking-widest uppercase opacity-60">Visual Masterpieces</p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filters */}
            <section className="py-8 bg-[#050505] sticky top-20 z-40 border-b border-white/5 backdrop-blur-md">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-6">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-4 py-2 text-xs font-bold tracking-[0.3em] transition-all relative group ${activeCategory === category.id
                                    ? 'text-gold'
                                    : 'text-white/40 hover:text-white'
                                    }`}
                            >
                                {category.name}
                                {activeCategory === category.id && (
                                    <motion.div layoutId="activeCat" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                onDoubleClick={() => setSelectedImage(item.image)}
                                className="group relative overflow-hidden aspect-[4/5] cursor-pointer rounded-2xl shadow-xl"
                            >
                                <img
                                    src={item.image}
                                    alt={`Portfolio ${item.id}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                    <div className="text-center p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-10 h-10 text-gold mx-auto mb-4" />
                                        <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-white">Double Click Preview</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
