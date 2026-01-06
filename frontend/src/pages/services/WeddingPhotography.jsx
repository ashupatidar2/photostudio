import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, Heart, Award, MapPin } from 'lucide-react';

const WeddingPhotography = () => {
    const gallery = [
        '/images/wedding.png',
        '/images/services/wedding.png',
        '/images/services/wedding-ceremony.png',
        '/images/services/wedding-outdoor.png',
        '/images/bride-1.png',
        '/images/bride-2.png',
        '/images/hero-couple.png',
        '/images/prewedding.png',
    ];

    return (
        <div className="bg-[#050505] text-white">
            {/* Cinematic Hero */}
            <section className="relative h-screen flex items-center justify-center p-4">
                <div className="absolute inset-0 overflow-hidden">
                    <img src="/images/wedding.png" className="w-full h-full object-cover opacity-40 scale-110" alt="Hero" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="editorial-title block mb-4"
                    >
                        Union of Souls
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="text-7xl md:text-[12rem] uppercase leading-none mb-8"
                    >
                        WEDDING <br /><span className="text-outline text-gold italic font-serif lowercase">Ceremonies</span>
                    </motion.h1>
                    <Link to="/booking?service=wedding" className="luxury-btn">
                        BOOK YOUR LEGACY
                    </Link>
                </div>
            </section>

            {/* Editorial Story */}
            <section className="py-40 bg-white text-black relative">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="reveal-text">
                            <h4 className="text-gold font-serif italic text-3xl mb-4 underline underline-offset-8 uppercase tracking-widest">Royal Occasions</h4>
                            <h2 className="text-6xl md:text-8xl mb-8 leading-none">Magnificence <br />In <span className="text-outline">Motion</span></h2>
                            <p className="text-xl text-gray-500 mb-10 max-w-xl font-body">
                                Your wedding day is an editorial masterpiece waiting to be captured. We orchestrate a visual symphony that honors the grandeur, the emotion, and the royalty within your union.
                            </p>
                        </div>
                        <div className="relative paper-mask overflow-hidden rounded-[3rem] shadow-2xl aspect-[4/5]">
                            <img src="/images/bride-2.png" className="w-full h-full object-cover scale-105" alt="Bride" />
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-20 right-0 text-[15vw] font-black text-gray-100/50 pointer-events-none whitespace-nowrap z-0">
                    ROYALTY
                </div>
            </section>

            {/* Asymmetric Gallery */}
            <section className="py-40 bg-[#050505]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-24">
                        <span className="editorial-title block">Visual Symphony</span>
                        <h2 className="text-5xl md:text-9xl uppercase">THE <span className="text-gold italic">GALLERY</span></h2>
                    </div>

                    <div className="masonry-grid">
                        {gallery.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`group relative overflow-hidden rounded-[2.5rem] shadow-2xl ${index % 3 === 0 ? 'masonry-item-tall' :
                                        index % 5 === 0 ? 'masonry-item-large' : ''
                                    }`}
                            >
                                <img src={image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Wedding" />
                                <div className="absolute inset-0 bg-gold/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                                    <Camera className="w-10 h-10 text-white" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Luxury Collections */}
            <section className="py-40 bg-zinc-900 overflow-hidden relative">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="editorial-title block opacity-10">Investment</span>
                    <h2 className="text-6xl md:text-8xl mb-24 uppercase">Signature <span className="text-gold italic">Collections</span></h2>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { name: 'Classic', price: '₹25K', features: ['4h Coverage', 'Senior Photographer', '200 Photos'] },
                            { name: 'Royal', price: '₹50K', features: ['8h Coverage', '2 Photographers', '500 Photos', 'Cinematic Film'] },
                            { name: 'Imperial', price: '₹95K', features: ['Full Day', '3 Camera Crew', 'Premium Album', 'All RAW'] }
                        ].map((pkg, i) => (
                            <div key={i} className="group p-1 bg-gradient-to-b from-white/10 to-transparent rounded-[3rem] hover:from-gold transition-all duration-700">
                                <div className="bg-[#0A0A0A] p-12 rounded-[2.9rem] flex flex-col items-center h-full">
                                    <h3 className="text-3xl font-display mb-4 uppercase">{pkg.name}</h3>
                                    <div className="text-6xl font-black text-gold mb-10">{pkg.price}</div>
                                    <ul className="space-y-4 mb-12 text-gray-500 font-bold uppercase tracking-widest text-xs">
                                        {pkg.features.map((f, j) => <li key={j}>{f}</li>)}
                                    </ul>
                                    <Link to="/booking" className={`w-full py-5 rounded-full font-black border-2 transition-all ${i === 1 ? 'bg-gold border-gold text-black' : 'border-gold/30 text-gold hover:bg-gold hover:text-black'}`}>
                                        SELECT SUITE
                                    </Link>
                                </div>
                            </div>
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

export default WeddingPhotography;
