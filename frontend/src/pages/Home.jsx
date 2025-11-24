import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Star, Users, Award, ArrowRight, Heart, Calendar } from 'lucide-react';

const Home = () => {
    const features = [
        {
            icon: Camera,
            title: 'Professional Photography',
            description: 'Experienced photographers capturing your special moments',
        },
        {
            icon: Star,
            title: 'Premium Quality',
            description: 'High-resolution images with expert editing',
        },
        {
            icon: Users,
            title: 'Personalized Service',
            description: 'Tailored packages to meet your unique needs',
        },
        {
            icon: Award,
            title: 'Award Winning',
            description: 'Recognized excellence in photography',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-purple-900 to-secondary-900">
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 container-custom text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                            Capture Your
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">
                                Precious Moments
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                            Professional photography services for weddings, events, and special occasions.
                            Let us tell your story through stunning visuals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/services" className="btn-primary text-lg px-8 py-4">
                                Explore Services
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/portfolio" className="btn glass text-lg px-8 py-4 text-white border-white/30 hover:bg-white/10">
                                View Portfolio
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-white/50 rounded-full"></div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Why Choose Us
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We combine creativity, professionalism, and cutting-edge technology
                            to deliver exceptional results.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card-hover p-6 text-center"
                            >
                                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Our Services
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            From weddings to corporate events, we've got you covered
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {['Wedding Photography', 'Pre-Wedding Shoot', 'Corporate Events'].map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card-hover overflow-hidden group"
                            >
                                <div className="h-64 bg-gradient-to-br from-primary-400 to-secondary-500 relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Camera className="w-16 h-16 text-white/80" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold mb-2">{service}</h3>
                                    <p className="text-gray-600 mb-4">
                                        Professional photography services tailored to your needs
                                    </p>
                                    <Link
                                        to="/services"
                                        className="text-primary-600 font-medium inline-flex items-center gap-2 hover:gap-3 transition-all"
                                    >
                                        Learn More
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/services" className="btn-primary">
                            View All Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding gradient-primary text-white">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Ready to Book Your Session?
                        </h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
                            Let's create beautiful memories together. Get in touch with us today!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/booking" className="btn bg-white text-primary-600 hover:bg-gray-100">
                                Book Now
                            </Link>
                            <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white/10">
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
