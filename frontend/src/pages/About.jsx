import { motion } from 'framer-motion';
import { Camera, Award, Heart, Check } from 'lucide-react';

const About = () => {
    const stats = [
        { label: 'Years Experience', value: '10+' },
        { label: 'Weddings Shot', value: '500+' },
        { label: 'Happy Clients', value: '1000+' },
        { label: 'Awards Won', value: '25+' },
    ];

    return (
        <div className="bg-[#050505] text-white pt-20">
            {/* Cinematic Hero */}
            <section className="relative py-40 overflow-hidden flex items-center justify-center">
                <div className="editorial-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] opacity-[0.03]">VISIONARY</div>
                <div className="relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        <h4 className="text-gold font-serif italic text-2xl mb-4 tracking-[0.3em] uppercase">The Artist Behind</h4>
                        <h1 className="text-7xl md:text-[10rem] font-black leading-none mb-10">
                            ASHU <br /><span className="text-outline text-gold italic font-serif lowercase">Patidar</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Editorial Story */}
            <section className="py-20 bg-white text-black">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-32 items-center">
                        <div className="relative paper-mask overflow-hidden rounded-[4rem] aspect-[4/5] shadow-2xl">
                            <img src="/images/hero-couple.png" alt="Photography Store" className="w-full h-full object-cover scale-110" />
                        </div>
                        <div className="reveal-text">
                            <h2 className="text-5xl md:text-[6rem] mb-10 leading-[0.8]">Legacy of <br /><span className="text-gold italic font-serif">True Light</span></h2>
                            <p className="text-2xl text-gray-500 mb-10 leading-relaxed font-body">
                                Based in Indore, our studio is dedicated to the art of visual storytelling. We don't just take pictures; we craft heirlooms that breathe life into your most precious memories.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                {['Cinematic Art', 'Editorial Vision', 'Soulful Frames', 'Elite Quality'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <Check className="text-gold w-5 h-5" />
                                        <span className="font-bold uppercase tracking-widest text-xs">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Reveal */}
            <section className="py-40 bg-[#050505] relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-center group"
                            >
                                <p className="text-6xl md:text-8xl font-black text-outline mb-4 group-hover:text-gold transition-colors">{stat.value}</p>
                                <p className="text-gray-500 font-bold text-xs uppercase tracking-[0.4em]">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
                .font-serif { font-family: 'Cormorant Garamond', serif; }
            `}} />
        </div>
    );
};

export default About;
