import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const services = [
        'Wedding Photography',
        'Pre-Wedding Shoots',
        'Candid Photography',
        'Event Coverage',
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* About */}
                    <div>
                        <h3 className="text-2xl font-display font-bold text-white mb-4">
                            Ashu Patidar
                            <br />
                            Photography
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Capturing beautiful moments and telling wonderful stories through the art of photography.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 flex items-center justify-center transition-all"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 flex items-center justify-center transition-all"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 flex items-center justify-center transition-all"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 flex items-center justify-center transition-all"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-display font-semibold mb-4 text-gold">Quick Links</h4>
                        <ul className="space-y-2 font-body">
                            <li><Link to="/" className="text-gray-400 hover:text-gold transition-colors">Home</Link></li>
                            <li><Link to="/portfolio" className="text-gray-400 hover:text-gold transition-colors">Portfolio</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-gold transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-gold transition-colors">Contact</Link></li>
                            <li><Link to="/booking" className="text-gray-400 hover:text-gold transition-colors">Book Now</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-display font-semibold mb-4 text-gold">Services</h4>
                        <ul className="space-y-2 font-body">
                            <li><Link to="/services/wedding" className="text-gray-400 hover:text-gold transition-colors">Wedding Photography</Link></li>
                            <li><Link to="/services/prewedding" className="text-gray-400 hover:text-gold transition-colors">Pre-Wedding Shoot</Link></li>
                            <li><Link to="/services/maternity" className="text-gray-400 hover:text-gold transition-colors">Maternity Photography</Link></li>
                            <li><Link to="/services/baby" className="text-gray-400 hover:text-gold transition-colors">Baby Photography</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                                <div>
                                    <p>+91 98765 43210</p>
                                    <p>+91 98765 43211</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                                <p>contact@ashupatidar.com</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                                <p>Indore, Madhya Pradesh, India</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Ashu Patidar Photography. All rights reserved.
                        </p>
                        <p className="text-gray-400 text-sm">
                            Crafted with ❤️ for capturing beautiful moments
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
