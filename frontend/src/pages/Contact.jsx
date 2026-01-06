import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Youtube } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-[#050505] text-white pt-20">
            {/* Cinematic Hero */}
            <section className="relative py-40 overflow-hidden flex items-center justify-center text-center">
                <div className="editorial-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] opacity-[0.03]">CONNECT</div>
                <div className="relative z-10 w-full px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        <h4 className="text-gold font-serif italic text-2xl mb-4 tracking-[0.3em] uppercase">Start Your Tale</h4>
                        <h1 className="text-7xl md:text-[10rem] font-black leading-none mb-10">
                            INITIATE <br /><span className="text-outline text-gold italic font-serif lowercase">Collaborations</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Editorial Contact Grid */}
            <section className="py-20 bg-white text-black">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-32">
                        {/* Info Section */}
                        <div className="reveal-text">
                            <h2 className="text-6xl md:text-[6rem] mb-12 leading-none">Tell Us <br /><span className="text-gold italic font-serif">Your Story</span></h2>
                            <div className="space-y-12">
                                <div className="group border-b border-gray-100 pb-8 hover:border-gold transition-all">
                                    <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.4em] mb-4">Voice</p>
                                    <p className="text-3xl md:text-5xl font-display group-hover:text-gold transition-colors">+91 91310 33810</p>
                                </div>
                                <div className="group border-b border-gray-100 pb-8 hover:border-gold transition-all">
                                    <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.4em] mb-4">Letter</p>
                                    <p className="text-3xl md:text-5xl font-display group-hover:text-gold transition-colors">hello@ashupatidar.com</p>
                                </div>
                                <div className="group border-b border-gray-100 pb-8 hover:border-gold transition-all">
                                    <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.4em] mb-4">Atelier</p>
                                    <p className="text-3xl md:text-5xl font-display group-hover:text-gold transition-colors">Indore, India</p>
                                </div>
                            </div>

                            <div className="mt-20 flex gap-8">
                                <a href="#" className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-gold hover:text-black transition-all hover:border-gold"><Instagram className="w-6 h-6" /></a>
                                <a href="#" className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-gold hover:text-black transition-all hover:border-gold"><Facebook className="w-6 h-6" /></a>
                                <a href="#" className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-gold hover:text-black transition-all hover:border-gold"><Youtube className="w-6 h-6" /></a>
                            </div>
                        </div>

                        {/* Form Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-[#050505] p-16 rounded-[4rem] shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-10 opacity-20"><Send className="w-20 h-20 text-gold" /></div>
                            <form className="relative z-10 space-y-10">
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-[0.5em] text-gray-500 uppercase">Your Name</label>
                                        <input type="text" className="w-full bg-white/5 border-b border-white/10 p-4 focus:border-gold outline-none transition-all text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-[0.5em] text-gray-500 uppercase">Your Email</label>
                                        <input type="email" className="w-full bg-white/5 border-b border-white/10 p-4 focus:border-gold outline-none transition-all text-white" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-[0.5em] text-gray-500 uppercase">Your Vision</label>
                                    <textarea rows="4" className="w-full bg-white/5 border-b border-white/10 p-4 focus:border-gold outline-none transition-all text-white"></textarea>
                                </div>
                                <button className="luxury-btn w-full text-xl py-8 mt-10">
                                    DELIVER MESSAGE
                                </button>
                            </form>
                        </motion.div>
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

export default Contact;
