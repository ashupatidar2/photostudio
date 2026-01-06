import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

const Portfolio = () => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');

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
        { id: 4, category: 'wedding', image: '/images/bride-2.png' },
        { id: 5, category: 'wedding', image: '/images/services/event.png' },
        { id: 6, category: 'prewedding', image: '/images/pre-wedding.png' },
        { id: 7, category: 'wedding', image: '/images/bride-1.png' },
        { id: 8, category: 'prewedding', image: '/images/services/portrait.png' },
        { id: 9, category: 'wedding', image: '/images/services/wedding.png' },
        { id: 10, category: 'maternity', image: '/images/services/event.png' },
        { id: 11, category: 'baby', image: '/images/bride-2.png' },
        { id: 12, category: 'models', image: '/images/bride-1.png' },
    ];

    const filteredItems =
        activeCategory === 'all'
            ? portfolioItems
            : portfolioItems.filter((item) => item.category === activeCategory);

    return (
        <div className="min-h-screen pt-20">
            {/* Header */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">Portfolio</h1>
                        <p className="text-xl text-gray-300">Our Best Work</p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filters */}
            <section className="py-8 bg-white dark:bg-gray-900 sticky top-20 z-40 shadow-md">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-8 py-3 font-semibold tracking-wider transition-all ${activeCategory === category.id
                                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="py-12 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative overflow-hidden aspect-square cursor-pointer"
                            >
                                <img
                                    src={item.image}
                                    alt={`Portfolio ${item.id}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
