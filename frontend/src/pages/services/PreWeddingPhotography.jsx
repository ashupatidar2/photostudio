import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, Heart, MapPin, Star } from 'lucide-react';

const PreWeddingPhotography = () => {
    const gallery = [
        '/images/prewedding.png',
        '/images/pre-wedding.png',
        '/images/services/prewedding-outdoor.png',
        '/images/hero-couple.png',
        '/images/bride-1.png',
        '/images/bride-2.png',
        '/images/wedding.png',
        '/images/services/wedding.png',
    ];

    return (
        <div className="bg-[#050505] text-white">
            {/* Cinematic Hero */}
            <section className="relative h-[80vh] flex items-center justify-center p-4">
                <div className="absolute inset-0 overflow-hidden">
                    <img src="/images/pre-wedding.png" className="w-full h-full object-cover opacity-50 contrast-125" alt="Pre-wedding" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
                </div>

                <div className="relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="editorial-title block mb-6"
                    >
                        Before the Vows
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="text-7xl md:text-[10rem] uppercase leading-none mb-10"
                    >
                        PRE-WEDDING <br /><span className="text-outline text-gold italic font-serif lowercase">Love Stories</span>
                    </motion.h1>
                    <Link to="/booking?service=prewedding" className="luxury-btn">
                        SCRIPT YOUR STORY
                    </Link>
                </div>
            </section>

            {/* Editorial Grid */}
            <section className="py-40 bg-white text-black relative">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-32 items-center">
                        <div className="order-2 lg:order-1 relative paper-mask overflow-hidden rounded-[3rem] aspect-square shadow-2xl">
                            <img src="/images/hero-couple.png" className="w-full h-full object-cover" alt="Couple" />
                        </div>
                        <div className="order-1 lg:order-2 reveal-text">
                            <h4 className="text-gold font-serif italic text-3xl mb-4 uppercase tracking-[0.2em]">Romantic Escapes</h4>
                            <h2 className="text-5xl md:text-8xl mb-8 leading-none">Candid <br />In <span className="text-outline">Nature</span></h2>
                            <p className="text-xl text-gray-500 mb-10 max-w-lg font-body">
                                We capture the silent promises and raw affection shared between you before the grand celebration. Our pre-wedding sessions are cinematic journeys through your favorite landscapes.
                            </p>
                            <div className="space-y-6">
                                <div className="flex gap-4 items-center">
                                    <MapPin className="text-gold w-6 h-6" />
                                    <span className="font-bold uppercase tracking-widest text-sm">Scenic Destinations</span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <Star className="text-gold w-6 h-6" />
                                    <span className="font-bold uppercase tracking-widest text-sm">Signature Styling</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-20 left-10 text-[10vw] font-black text-gray-100 pointer-events-none z-0">
                    ADVENTURE
                </div>
            </section>

            {/* Masonry Gallery */}
            <section className="py-40 bg-[#050505]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-9xl uppercase font-black">SELECTED <span className="text-gold italic font-serif lowercase">shots</span></h2>
                    </div>

                    <div className="masonry-grid">
                        {gallery.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`group relative overflow-hidden rounded-[3rem] ${index % 4 === 0 ? 'masonry-item-large' : 'masonry-item-tall'
                                    }`}
                            >
                                <img src={image} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="Pre-wedding" />
                                <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                                    <Camera className="w-12 h-12 text-white" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
                .font-serif { font-family: 'Cormorant Garamond', serif; }
                .font-display { font-family: 'Playfair Display', serif; }
            `}} />
        </div>
    );
};

export default PreWeddingPhotography;
