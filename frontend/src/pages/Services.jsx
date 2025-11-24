import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Clock, DollarSign, Check } from 'lucide-react';
import api from '../services/api';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await api.get('/api/services');
            setServices(response.data.items || []);
        } catch (error) {
            console.error('Error fetching services:', error);
            // Use dummy data if API fails
            setServices([
                {
                    id: '1',
                    title: 'Wedding Photography',
                    slug: 'wedding-photography',
                    description: 'Capture your special day with our professional wedding photography services. We\'ll be there from the ceremony to the reception, documenting every precious moment.',
                    price_cents: 150000,
                    duration_minutes: 480,
                    image: '/images/wedding.png',
                    features: ['Full day coverage', '2 photographers', '500+ edited photos', 'Online gallery', 'Print rights']
                },
                {
                    id: '2',
                    title: 'Pre-Wedding Shoot',
                    slug: 'pre-wedding-shoot',
                    description: 'Celebrate your love story with a romantic pre-wedding photoshoot. Choose your favorite locations and let us capture your chemistry.',
                    price_cents: 50000,
                    duration_minutes: 180,
                    image: '/images/prewedding.png',
                    features: ['Location of choice', '100+ edited photos', 'Outfit changes', 'Online gallery']
                },
                {
                    id: '3',
                    title: 'Birthday Party',
                    slug: 'birthday-party',
                    description: 'Make birthday memories last forever with our fun and creative birthday photography packages.',
                    price_cents: 30000,
                    duration_minutes: 120,
                    image: '/images/birthday.png',
                    features: ['2 hour coverage', '50+ edited photos', 'Candid moments', 'Digital delivery']
                },
                {
                    id: '4',
                    title: 'Corporate Events',
                    slug: 'corporate-events',
                    description: 'Professional photography for your corporate events, conferences, and business gatherings.',
                    price_cents: 80000,
                    duration_minutes: 240,
                    image: '/images/corporate.png',
                    features: ['Event coverage', 'Professional editing', 'Same-day preview', 'High-resolution files']
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="gradient-primary text-white py-20">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                            Our Services
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                            Professional photography services tailored to capture your most precious moments
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="card overflow-hidden group"
                            >
                                {/* Image */}
                                <div className="h-64 bg-gradient-to-br from-primary-400 to-secondary-500 relative overflow-hidden">
                                    {service.image ? (
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Camera className="w-20 h-20 text-white/80 group-hover:scale-110 transition-transform" />
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-display font-bold mb-3">{service.title}</h3>
                                    <p className="text-gray-600 mb-4">{service.description}</p>

                                    {/* Features */}
                                    <div className="space-y-2 mb-6">
                                        {service.features?.slice(0, 4).map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                                <Check className="w-4 h-4 text-primary-600" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Price & Duration */}
                                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Clock className="w-5 h-5 text-primary-600" />
                                            <span>{Math.floor(service.duration_minutes / 60)} hours</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-5 h-5 text-primary-600" />
                                            <span className="text-2xl font-bold text-primary-600">
                                                ${(service.price_cents / 100).toFixed(0)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <Link
                                        to={`/services/${service.slug}`}
                                        className="btn-primary w-full text-center"
                                    >
                                        View Details & Book
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="card p-12 text-center gradient-primary text-white">
                        <h2 className="text-4xl font-display font-bold mb-4">
                            Can't Find What You're Looking For?
                        </h2>
                        <p className="text-xl mb-8 text-white/90">
                            We offer custom packages tailored to your specific needs
                        </p>
                        <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
