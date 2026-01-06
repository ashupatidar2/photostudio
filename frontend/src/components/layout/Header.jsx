import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'PORTFOLIO', path: '/portfolio' },
        {
            name: 'SERVICES',
            path: '#',
            dropdown: [
                { name: 'Wedding Photography', path: '/services/wedding' },
                { name: 'Pre-Wedding Photography', path: '/services/prewedding' },
                { name: 'Maternity Photography', path: '/services/maternity' },
                { name: 'Baby Photography', path: '/services/baby' },
            ]
        },
        { name: 'ABOUT US', path: '/about' },
        { name: 'CONTACT', path: '/contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled
                ? 'bg-white/95 dark:bg-charcoal/95 backdrop-blur-md shadow-lg border-b border-gold/20'
                : 'bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm'
                }`}
        >
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-14 h-14 rounded-full border-2 border-gold p-1 bg-white dark:bg-gray-800 group-hover:scale-110 transition-transform">
                            <img
                                src="/images/logo.png"
                                alt="Ashu Patidar Photography"
                                className="w-full h-full object-contain rounded-full"
                            />
                        </div>
                        <div className="hidden md:block">
                            <h1 className="text-xl font-display font-black tracking-tighter text-gray-900 dark:text-white group-hover:text-gold transition-colors">
                                ASHU PATIDAR
                            </h1>
                            <p className="text-[10px] text-gray-500 tracking-[0.4em] font-sans uppercase">Photography</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            link.dropdown ? (
                                <div
                                    key={link.name}
                                    className="relative group h-20 flex items-center"
                                    onMouseEnter={() => setIsServicesOpen(true)}
                                    onMouseLeave={() => setIsServicesOpen(false)}
                                >
                                    <button
                                        className="text-[11px] font-bold tracking-[0.3em] transition-colors text-gray-600 dark:text-gray-400 hover:text-gold dark:hover:text-gold flex items-center gap-1 uppercase"
                                    >
                                        {link.name}
                                        <ChevronDown className="w-3 h-3" />
                                    </button>
                                    {isServicesOpen && (
                                        <div className="absolute top-full left-0 w-64 pt-2">
                                            <div className="bg-[#0A0A0A] shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-2xl py-4 border border-white/5 overflow-hidden">
                                                {link.dropdown.map((item) => (
                                                    <Link
                                                        key={item.path}
                                                        to={item.path}
                                                        className="block px-6 py-4 text-xs font-bold tracking-widest text-gray-400 hover:text-gold hover:bg-white/5 transition-all uppercase"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-[11px] font-bold tracking-[0.3em] transition-colors relative group uppercase ${location.pathname === link.path
                                        ? 'text-gold'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gold'
                                        }`}
                                >
                                    {link.name}
                                    <span
                                        className={`absolute -bottom-2 left-0 h-0.5 bg-gold transition-all duration-500 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}
                                    ></span>
                                </Link>
                            )
                        ))}
                        <Link
                            to="/booking"
                            className="luxury-btn !px-8 !py-3 !text-[10px] !tracking-[0.2em]"
                        >
                            INQUIRE NOW
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-gray-700 dark:text-gray-300"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
                    >
                        <div className="container mx-auto px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block text-sm font-medium tracking-wider transition-colors ${location.pathname === link.path
                                        ? 'text-primary-600 dark:text-primary-400'
                                        : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
