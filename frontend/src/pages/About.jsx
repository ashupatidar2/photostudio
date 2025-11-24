import { motion } from 'framer-motion';
import { Camera, Award, Users, Heart } from 'lucide-react';

const About = () => {
    const team = [
        {
            name: 'John Smith',
            role: 'Lead Photographer',
            bio: 'With over 10 years of experience, John specializes in wedding and portrait photography.',
        },
        {
            name: 'Sarah Johnson',
            role: 'Event Photographer',
            bio: 'Sarah brings creativity and energy to every event she shoots.',
        },
        {
            name: 'Mike Chen',
            role: 'Photo Editor',
            bio: 'Mike ensures every photo looks perfect with his expert editing skills.',
        },
    ];

    const stats = [
        { icon: Camera, value: '500+', label: 'Events Covered' },
        { icon: Users, value: '1000+', label: 'Happy Clients' },
        { icon: Award, value: '15+', label: 'Awards Won' },
        { icon: Heart, value: '10+', label: 'Years Experience' },
    ];

    return (
        <div className="min-h-screen pt-20">
            {/* Hero */}
            <section className="gradient-primary text-white py-20">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                            About PhotoStudio
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                            Capturing life's precious moments with passion and creativity
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-display font-bold mb-6">Our Story</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Founded in 2014, PhotoStudio began with a simple mission: to capture the beauty and emotion of life's most important moments. What started as a small team of passionate photographers has grown into a full-service photography studio serving clients across the region.
                            </p>
                            <p className="text-lg text-gray-600 mb-6">
                                We believe that every moment tells a story, and our job is to preserve those stories in the most beautiful way possible. Whether it's a wedding, a corporate event, or a family portrait, we approach each project with the same level of dedication and creativity.
                            </p>
                            <p className="text-lg text-gray-600">
                                Today, we're proud to have captured over 500 events and created lasting memories for more than 1,000 happy clients. Our work has been recognized with numerous awards, but our greatest reward is seeing the joy on our clients' faces when they see their photos.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold mb-4">Meet Our Team</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Talented professionals dedicated to capturing your special moments
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card text-center"
                            >
                                {/* Photo Placeholder */}
                                <div className="w-32 h-32 gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <Camera className="w-16 h-16 text-white" />
                                </div>

                                <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                                <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                                <p className="text-gray-600">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold mb-4">Our Values</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Quality',
                                description: 'We never compromise on the quality of our work. Every photo is carefully edited to perfection.',
                            },
                            {
                                title: 'Creativity',
                                description: 'We bring fresh, creative perspectives to every shoot, ensuring unique and memorable photos.',
                            },
                            {
                                title: 'Professionalism',
                                description: 'From the first consultation to the final delivery, we maintain the highest standards of professionalism.',
                            },
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card p-8 text-center"
                            >
                                <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
