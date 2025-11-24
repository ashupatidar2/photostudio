import { Link } from 'react-router-dom';
import { Camera, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-display font-bold text-white">
                                PhotoStudio
                            </span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Capturing your precious moments with creativity and professionalism.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/services" className="hover:text-primary-400 transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/portfolio" className="hover:text-primary-400 transition-colors">
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-primary-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-primary-400 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/services/wedding-photography" className="hover:text-primary-400 transition-colors">
                                    Wedding Photography
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/pre-wedding-shoot" className="hover:text-primary-400 transition-colors">
                                    Pre-Wedding Shoot
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/birthday-party" className="hover:text-primary-400 transition-colors">
                                    Birthday Party
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/corporate-events" className="hover:text-primary-400 transition-colors">
                                    Corporate Events
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-1" />
                                <span>123 Photography Lane, Creative City, CC 12345</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                <a href="tel:+1234567890" className="hover:text-primary-400 transition-colors">
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                <a href="mailto:info@photostudio.com" className="hover:text-primary-400 transition-colors">
                                    info@photostudio.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {currentYear} PhotoStudio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
