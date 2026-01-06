import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Heart, Users, Star, Calendar, MessageSquare } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Testimonials from '../components/common/Testimonials';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroImages = [
        '/images/hero-couple.png',
        '/images/wedding.png',
        '/images/pre-wedding.png',
        '/images/bride-1.png',
        '/images/bride-2.png'
    ];

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax sections
            gsap.utils.toArray('.parallax-group').forEach((group) => {
                const img = group.querySelector('.parallax-img');
                gsap.to(img, {
                    yPercent: 30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: group,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

            // Reveal animations
            gsap.utils.toArray('.reveal-text').forEach((text) => {
                gsap.from(text, {
                    opacity: 0,
                    y: 100,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: text,
                        start: "top 90%",
                    }
                });
            });
        });
        return () => ctx.revert();
    }, []);

    const portfolioImages = [
        { id: 1, category: 'wedding', size: 'large', image: '/images/wedding.png' },
        { id: 2, category: 'wedding', size: 'tall', image: '/images/bride-1.png' },
        { id: 3, category: 'prewedding', size: 'small', image: '/images/pre-wedding.png' },
        { id: 4, category: 'wedding', size: 'wide', image: '/images/bride-2.png' },
        { id: 5, category: 'wedding', size: 'tall', image: '/images/hero-couple.png' },
        { id: 6, category: 'prewedding', size: 'large', image: '/images/prewedding.png' },
        { id: 7, category: 'baby', size: 'tall', image: '/images/birthday.png' },
        { id: 8, category: 'wedding', size: 'small', image: '/images/services/wedding.png' },
    ];

    const services = [
        { title: 'Weddings', img: '/images/wedding.png', link: '/services/wedding' },
        { title: 'Couples', img: '/images/pre-wedding.png', link: '/services/prewedding' },
        { title: 'Portraits', img: '/images/bride-1.png', link: '/services/maternity' },
        { title: 'Lifestyle', img: '/images/birthday.png', link: '/services/baby' },
    ];

    return (
        <div className="bg-[#050505] text-white overflow-hidden">
            {/* Editorial Hero */}
            <section className="relative h-screen flex items-center justify-center p-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 0.6, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 2 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
                    />
                </AnimatePresence>

                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
                    <motion.div style={{ y: y1 }} className="text-center mb-10">
                        <span className="editorial-title block text-white/40">Luxury 2026</span>
                        <h1 className="text-[12vw] md:text-[8vw] font-black uppercase text-outline absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full opacity-30 select-none">
                            ASHU PATIDAR
                        </h1>
                        <h1 className="text-[10vw] md:text-[7vw] relative z-10 leading-none">
                            Telling Stories<br />
                            <span className="italic font-light text-gold font-serif">In Every Frame</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="flex gap-8 items-center"
                    >
                        <Link to="/booking" className="luxury-btn">
                            SCHEDULE A CONSULTATION
                        </Link>
                        <button className="hidden md:flex items-center gap-4 text-sm font-bold tracking-[0.3em] group">
                            SCROLL <div className="w-10 h-px bg-white/30 group-hover:w-20 transition-all duration-500"></div>
                        </button>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-10 text-xs font-bold tracking-[0.5em] opacity-30 uppercase">
                    Indore / Mumbai / Worldwide
                </div>
            </section>

            {/* Cinematic Intro */}
            <section className="py-40 bg-white text-black relative">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="parallax-group overflow-hidden rounded-[2rem] paper-mask aspect-[4/5]">
                            <img src="/images/bride-1.png" className="parallax-img w-full h-[140%] object-cover scale-110" alt="Art" />
                        </div>
                        <div className="reveal-text">
                            <h4 className="text-gold font-serif italic text-3xl mb-4 underline underline-offset-8">Our Philosophy</h4>
                            <h2 className="text-6xl md:text-8xl mb-8">Artistry <br /><span className="text-outline">Meet Soul</span></h2>
                            <p className="text-xl text-gray-600 mb-10 max-w-xl">
                                We believe in the raw, unscripted beauty of human connection. Our lens doesn't just record events; it captures the very essence of your existence in a cinematic and editorial style.
                            </p>
                            <Link to="/about" className="group flex items-center gap-4 text-lg font-bold">
                                LEARN OUR STORY <ArrowRight className="group-hover:translate-x-4 transition-transform text-gold" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Large Overlapping Text */}
                <div className="absolute -bottom-20 left-0 text-[20vw] font-black text-gray-200/50 pointer-events-none whitespace-nowrap z-0">
                    EXCELLENCE
                </div>
            </section>

            {/* Asymmetric Masonry Gallery */}
            <section className="py-40 bg-[#050505]">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                        <div className="reveal-text">
                            <span className="editorial-title block">Collections</span>
                            <h2 className="text-5xl md:text-8xl">VISUAL <span className="text-gold italic">ESSENCE</span></h2>
                        </div>
                        <Link to="/portfolio" className="mb-4 text-gold font-bold tracking-widest text-sm hover:underline">VIEW ALL WORK</Link>
                    </div>

                    <div className="masonry-grid">
                        {portfolioImages.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`group relative overflow-hidden rounded-[2rem] shadow-2xl ${item.size === 'large' ? 'masonry-item-large' :
                                    item.size === 'tall' ? 'masonry-item-tall' :
                                        item.size === 'wide' ? 'masonry-item-wide' : ''
                                    }`}
                            >
                                <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Portfolio" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                                    <div className="text-center p-8">
                                        <Camera className="w-12 h-12 text-gold mx-auto mb-4" />
                                        <p className="text-xs tracking-[0.4em] uppercase font-bold">View Project</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Reveal */}
            <section className="py-40 bg-zinc-900 border-y border-white/10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, i) => (
                        <Link key={i} to={service.link} className="group relative h-[60vh] overflow-hidden border-r border-white/5 flex flex-col justify-end p-10">
                            <img src={service.img} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110" alt={service.title} />
                            <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
                                <span className="text-gold font-bold text-xs tracking-[0.5em] mb-4 block">SERVICE 0{i + 1}</span>
                                <h3 className="text-5xl font-display mb-6 group-hover:text-gold transition-colors">{service.title}</h3>
                                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all">
                                    <span className="text-xs font-bold tracking-widest">EXPLORE</span>
                                    <ArrowRight className="w-4 h-4 text-gold" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-40 bg-[#050505]">
                <Testimonials />
            </section>

            {/* Contact CTA */}
            <section className="py-60 relative overflow-hidden flex items-center justify-center text-center px-4">
                <div className="editorial-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] opacity-[0.03]">CONTECT</div>
                <div className="relative z-10">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}>
                        <h2 className="text-7xl md:text-9xl mb-12">LET'S <span className="gold-glow">COLLABORATE</span></h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16 px-4 font-serif italic">
                            Your legacy deserves to be captured in the most exquisite way imaginable. Reach out to discuss your grand vision.
                        </p>
                        <Link to="/contact" className="luxury-btn px-20 text-2xl">
                            INITIATE JOURNEY
                        </Link>
                    </motion.div>
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

export default Home;
