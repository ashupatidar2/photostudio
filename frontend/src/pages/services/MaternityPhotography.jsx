import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, Heart, Award } from 'lucide-react';

const MaternityPhotography = () => {
    const gallery = [
        '/images/services/portrait.png',
        '/images/bride-1.png',
        '/images/bride-2.png',
        '/images/hero-couple.png',
        '/images/pre-wedding.png',
        '/images/wedding.png',
    ];

    return (
        <div className="bg-[#050505] text-white">
            {/* Cinematic Hero */}
            <section className="relative h-[80vh] flex items-center justify-center p-4">
                <div className="absolute inset-0 overflow-hidden">
                    <img src="/images/bride-1.png" className="w-full h-full object-cover opacity-40 grayscale" alt="Maternity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="editorial-title block mb-6"
                    >
                        Pure Grace
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="text-7xl md:text-[12rem] uppercase leading-none mb-10"
                    >
                        MATERNITY <br /><span className="text-outline text-gold italic font-serif lowercase">Portraits</span>
                    </motion.h1>
                    <Link to="/booking?service=maternity" className="luxury-btn">
                        PRESERVE THE GLOW
                    </Link>
                </div>
            </section>

            {/* Editorial Grid */}
            <section className="py-40 bg-zinc-900 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="reveal-text">
                            <h4 className="text-gold font-serif italic text-3xl mb-4">A Sacred Journey</h4>
                            <h2 className="text-5xl md:text-8xl mb-8 leading-none">Elegant <br />In <span className="text-outline">Bloom</span></h2>
                            <p className="text-xl text-gray-400 mb-10 max-w-md font-body">
                                Pregnancy is a visual poem. We use cinematic lighting and editorial compositions to honor the strength and ethereal beauty of motherhood.
                            </p>
                            <div className="flex gap-10">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-2xl flex items-center justify-center mb-4">
                                        <Heart className="text-gold w-8 h-8" />
                                    </div>
                                    <p className="font-bold text-xs tracking-widest uppercase">HEARTFELT</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-2xl flex items-center justify-center mb-4">
                                        <Award className="text-gold w-8 h-8" />
                                    </div>
                                    <p className="font-bold text-xs tracking-widest uppercase">SIGNATURE</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative paper-mask overflow-hidden rounded-[4rem] aspect-[4/5] shadow-[0_0_80px_rgba(212,175,55,0.15)]">
                            <img src="/images/bride-1.png" className="w-full h-full object-cover scale-105" alt="Grace" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Masonry Gallery */}
            <section className="py-40 bg-[#050505]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-[8rem] uppercase font-black tracking-tighter">THE <span className="text-gold italic font-serif lowercase">essence</span></h2>
                    </div>

                    <div className="masonry-grid">
                        {gallery.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`group relative overflow-hidden rounded-[2.5rem] ${index % 2 === 0 ? 'masonry-item-tall' : 'masonry-item-wide'
                                    }`}
                            >
                                <img src={image} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt="Maternity" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                    <span className="text-gold font-serif italic text-2xl">Exquisite</span>
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

export default MaternityPhotography;
