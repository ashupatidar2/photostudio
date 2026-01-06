import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Priya & Rahul',
            event: 'Wedding',
            rating: 5,
            text: 'Ashu Patidar Photography captured our wedding beautifully! Every moment was perfect. The team was professional and made us feel comfortable throughout the day. Highly recommended!',
            image: '/images/bride-1.png',
        },
        {
            id: 2,
            name: 'Sneha & Amit',
            event: 'Pre-Wedding',
            rating: 5,
            text: 'Our pre-wedding shoot was amazing! The locations, poses, and final photos exceeded our expectations. Thank you for making our special day memorable!',
            image: '/images/bride-2.png',
        },
        {
            id: 3,
            name: 'Anjali Sharma',
            event: 'Maternity Shoot',
            rating: 5,
            text: 'The maternity photoshoot was a wonderful experience. The photographer made me feel beautiful and comfortable. The photos are stunning!',
            image: '/images/services/portrait.png',
        },
        {
            id: 4,
            name: 'Vikram & Divya',
            event: 'Wedding',
            rating: 5,
            text: 'Best decision we made for our wedding! The candid shots are absolutely beautiful. Every emotion was captured perfectly. Thank you!',
            image: '/images/services/wedding.png',
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-charcoal to-charcoal-dark text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
                        What Clients Say About Us
                    </h2>
                    <p className="text-xl text-gray-300">
                        Hear from our happy clients
                    </p>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    navigation={true}
                    loop={true}
                    className="testimonials-swiper pb-16"
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 h-full border border-gold/20 hover:border-gold/40 transition-all">
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gold"
                                    />
                                    <div>
                                        <h3 className="font-heading text-xl font-semibold">{testimonial.name}</h3>
                                        <p className="text-gold text-sm">{testimonial.event}</p>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                                    ))}
                                </div>

                                <p className="text-gray-300 leading-relaxed italic">
                                    "{testimonial.text}"
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx>{`
                .testimonials-swiper {
                    padding-bottom: 60px !important;
                }
                .testimonials-swiper :global(.swiper-pagination-bullet) {
                    background: #D4AF37;
                    opacity: 0.5;
                }
                .testimonials-swiper :global(.swiper-pagination-bullet-active) {
                    opacity: 1;
                }
                .testimonials-swiper :global(.swiper-button-next),
                .testimonials-swiper :global(.swiper-button-prev) {
                    color: #D4AF37;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
