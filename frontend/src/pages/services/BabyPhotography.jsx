import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, Heart, Smile } from 'lucide-react';

const BabyPhotography = () => {
    const gallery = [
        '/images/birthday.png',
        '/images/services/birthday.png',
        '/images/services/portrait.png',
        '/images/bride-1.png',
        '/images/bride-2.png',
        '/images/hero-couple.png',
    ];

    return (
        <div className="bg-[#050505] text-white">
            {/* Cinematic Hero */}
            <section className="relative h-[80vh] flex items-center justify-center p-4">
                <div className="absolute inset-0 overflow-hidden">
                    <img src="/images/birthday.png" className="w-full h-full object-cover opacity-50 blur-[2px]" alt="Baby" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
                </div>

                <div className="relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="editorial-title block mb-6"
                    >
                        Tiny Wonders
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="text-7xl md:text-[10rem] uppercase leading-none mb-10"
                    >
                        BABY <br /><span className="text-outline text-gold italic font-serif lowercase">Artistry</span>
                    </motion.h1>
                    <Link to="/booking?service=baby" className="luxury-btn">
                        CAPTURE THE MAGIC
                    </Link>
                </div>
            </section>

            {/* Editorial Story */}
            <section className="py-40 bg-white text-black relative">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative paper-mask overflow-hidden rounded-[3rem] aspect-square shadow-2xl">
                            <img src="/images/services/birthday.png" className="w-full h-full object-cover" alt="Baby" />
                        </div>
                        <div className="reveal-text">
                            <h4 className="text-gold font-serif italic text-3xl mb-4 tracking-widest uppercase">Pure Innocence</h4>
                            <h2 className="text-5xl md:text-8xl mb-8 leading-none">Magic <br />In <span className="text-outline">Little</span></h2>
                            <p className="text-xl text-gray-500 mb-10 max-w-lg font-body">
                                Every giggle and tiny movement is a masterpiece. Our baby photography merges a comfortable environment with an artistic, high-end editorial approach.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-8 bg-black/5 rounded-[2rem] border-l-4 border-gold">
                                    <Smile className="text-gold w-10 h-10 mb-4" />
                                    <h4 className="text-xl font-bold">Safest Studio</h4>
                                </div>
                                <div className="p-8 bg-black/5 rounded-[2rem] border-l-4 border-gold">
                                    <Heart className="text-gold w-10 h-10 mb-4" />
                                    <h4 className="text-xl font-bold">Artisan Sets</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Masonry Gallery */}
            <section className="py-40 bg-[#050505]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-9xl uppercase font-black">THE <span className="text-gold italic font-serif lowercase">gallery</span></h2>
                    </div>

                    <div className="masonry-grid">
                        {gallery.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`group relative overflow-hidden rounded-[3rem] ${index % 3 === 0 ? 'masonry-item-large' : 'masonry-item-tall'
                                    }`}
                            >
                                <img src={image} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt="Baby" />
                                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
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

export default BabyPhotography;
