import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const Portfolio = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [galleries, setGalleries] = useState([]);

    const categories = [
        { id: 'all', name: 'All' },
        { id: 'wedding', name: 'Weddings' },
        { id: 'pre-wedding', name: 'Pre-Wedding' },
        { id: 'birthday', name: 'Birthdays' },
        { id: 'events', name: 'Events' },
    ];

    // Dummy gallery data
    const dummyGalleries = [
        { id: 1, title: 'Sarah & John Wedding', category: 'wedding', imageCount: 150, image: '/images/wedding.png' },
        { id: 2, title: 'Romantic Pre-Wedding', category: 'pre-wedding', imageCount: 80, image: '/images/prewedding.png' },
        { id: 3, title: 'Emma\'s 5th Birthday', category: 'birthday', imageCount: 60, image: '/images/birthday.png' },
        { id: 4, title: 'Corporate Gala 2024', category: 'events', imageCount: 120, image: '/images/corporate.png' },
        { id: 5, title: 'Beach Wedding Ceremony', category: 'wedding', imageCount: 200, image: '/images/wedding.png' },
        { id: 6, title: 'Sunset Couple Shoot', category: 'pre-wedding', imageCount: 50, image: '/images/prewedding.png' },
        { id: 7, title: 'Kids Birthday Party', category: 'birthday', imageCount: 45, image: '/images/birthday.png' },
        { id: 8, title: 'Tech Conference 2024', category: 'events', imageCount: 90, image: '/images/corporate.png' },
    ];

    useEffect(() => {
        setGalleries(dummyGalleries);
    }, []);

    const filteredGalleries = selectedCategory === 'all'
        ? galleries
        : galleries.filter(g => g.category === selectedCategory);

    return (
        <div className="min-h-screen pt-20">
            {/* Hero */}
            <section className="gradient-primary text-white py-20">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                            Our Portfolio
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                            Explore our collection of beautiful moments captured
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="bg-white py-8 sticky top-20 z-40 shadow-md">
                <div className="container-custom">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-lg font-medium transition-all ${selectedCategory === category.id
                                    ? 'gradient-primary text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredGalleries.map((gallery, index) => (
                            <motion.div
                                key={gallery.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="card-hover overflow-hidden group cursor-pointer"
                            >
                                {/* Image Placeholder */}
                                <div className="h-72 bg-gradient-to-br from-primary-400 to-secondary-500 relative overflow-hidden">
                                    {gallery.image ? (
                                        <img
                                            src={gallery.image}
                                            alt={gallery.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Camera className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform" />
                                            </div>
                                        </>
                                    )}
                                    {/* Image Count Badge */}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                        {gallery.imageCount} photos
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{gallery.title}</h3>
                                    <p className="text-gray-600 capitalize">{gallery.category.replace('-', ' ')}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredGalleries.length === 0 && (
                        <div className="text-center py-20">
                            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-xl text-gray-600">No galleries found in this category</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
