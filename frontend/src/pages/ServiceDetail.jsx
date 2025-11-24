import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Clock, DollarSign, Check, ArrowRight } from 'lucide-react';

const ServiceDetail = () => {
    const { slug } = useParams();

    // Dummy service data
    const service = {
        id: '1',
        title: 'Wedding Photography',
        slug: 'wedding-photography',
        description: 'Capture your special day with our professional wedding photography services. We\'ll be there from the ceremony to the reception, documenting every precious moment with artistic vision and technical excellence.',
        price_cents: 150000,
        duration_minutes: 480,
        features: [
            'Full day coverage (8 hours)',
            '2 professional photographers',
            '500+ professionally edited photos',
            'Online gallery for sharing',
            'Print rights included',
            'Engagement shoot included',
            '50 premium prints',
            'Custom photo album'
        ]
    };

    const packages = [
        {
            id: '1',
            title: 'Basic Package',
            price_cents: 150000,
            details: '8 hours coverage, 1 photographer, 300 edited photos'
        },
        {
            id: '2',
            title: 'Premium Package',
            price_cents: 250000,
            details: 'Full day coverage, 2 photographers, 500 edited photos, album included'
        },
        {
            id: '3',
            title: 'Luxury Package',
            price_cents: 400000,
            details: '2 day coverage, 3 photographers, unlimited photos, album + prints'
        }
    ];

    return (
        <div className="min-h-screen pt-20">
            {/* Hero */}
            <section className="gradient-primary text-white py-20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link to="/services" className="inline-flex items-center text-white/80 hover:text-white mb-6">
                            ← Back to Services
                        </Link>
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                            {service.title}
                        </h1>
                        <div className="flex flex-wrap gap-6 text-lg">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>{Math.floor(service.duration_minutes / 60)} hours</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-5 h-5" />
                                <span>Starting from ${(service.price_cents / 100).toFixed(0)}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description */}
                            <div className="card p-8">
                                <h2 className="text-3xl font-display font-bold mb-6">About This Service</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="card p-8">
                                <h2 className="text-3xl font-display font-bold mb-6">What's Included</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {service.features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Packages */}
                            <div className="card p-8">
                                <h2 className="text-3xl font-display font-bold mb-6">Choose Your Package</h2>
                                <div className="space-y-4">
                                    {packages.map((pkg) => (
                                        <div
                                            key={pkg.id}
                                            className="border-2 border-gray-200 rounded-lg p-6 hover:border-primary-500 transition-colors"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-xl font-semibold">{pkg.title}</h3>
                                                <div className="text-2xl font-bold text-primary-600">
                                                    ${(pkg.price_cents / 100).toFixed(0)}
                                                </div>
                                            </div>
                                            <p className="text-gray-600">{pkg.details}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Booking Card */}
                            <div className="card p-6 sticky top-24">
                                <div className="text-center mb-6">
                                    <div className="text-4xl font-bold text-primary-600 mb-2">
                                        ${(service.price_cents / 100).toFixed(0)}
                                    </div>
                                    <p className="text-gray-600">Starting price</p>
                                </div>

                                <Link to="/booking" className="btn-primary w-full text-center mb-4">
                                    Book This Service
                                    <ArrowRight className="w-5 h-5" />
                                </Link>

                                <Link to="/contact" className="btn-outline w-full text-center">
                                    Ask a Question
                                </Link>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h3 className="font-semibold mb-3">Quick Info</h3>
                                    <div className="space-y-3 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-primary-600" />
                                            <span>Duration: {Math.floor(service.duration_minutes / 60)} hours</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Camera className="w-4 h-4 text-primary-600" />
                                            <span>Professional equipment</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-primary-600" />
                                            <span>Satisfaction guaranteed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetail;
