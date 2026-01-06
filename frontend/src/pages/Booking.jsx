import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Check, ArrowRight, ArrowLeft, Calendar as CalendarIcon, Clock, User, Mail, Phone, MapPin } from 'lucide-react';
import gsap from 'gsap';

const Booking = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [formData, setFormData] = useState({
        service: searchParams.get('service') || '',
        package: '',
        name: '',
        email: '',
        phone: '',
        location: '',
        message: '',
    });

    const services = [
        { id: 'wedding', name: 'Wedding Photography' },
        { id: 'prewedding', name: 'Pre-Wedding Photography' },
        { id: 'maternity', name: 'Maternity Photography' },
        { id: 'baby', name: 'Baby Photography' },
    ];

    const packages = {
        wedding: [
            { id: 'basic', name: 'Basic Package', price: 25000 },
            { id: 'premium', name: 'Premium Package', price: 50000 },
            { id: 'luxury', name: 'Luxury Package', price: 100000 },
        ],
        prewedding: [
            { id: 'basic', name: 'Basic Package', price: 15000 },
            { id: 'premium', name: 'Premium Package', price: 30000 },
        ],
        maternity: [
            { id: 'basic', name: 'Basic Package', price: 10000 },
            { id: 'premium', name: 'Premium Package', price: 20000 },
        ],
        baby: [
            { id: 'basic', name: 'Basic Package', price: 8000 },
            { id: 'premium', name: 'Premium Package', price: 15000 },
        ],
    };

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
        '05:00 PM', '06:00 PM',
    ];

    useEffect(() => {
        gsap.fromTo('.booking-reveal',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power4.out" }
        );
    }, [currentStep]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle booking submission
        alert('Booking request submitted! We will contact you soon.');
        navigate('/');
    };

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.service && formData.package;
            case 2:
                return selectedDate && selectedTime;
            case 3:
                return formData.name && formData.email && formData.phone;
            default:
                return true;
        }
    };

    const getSelectedPackagePrice = () => {
        if (!formData.service || !formData.package) return 0;
        const pkg = packages[formData.service]?.find(p => p.id === formData.package);
        return pkg ? pkg.price : 0;
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-[#050505] text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-20 booking-reveal">
                        <span className="text-gold tracking-[0.3em] text-sm font-medium mb-4 block">INQUIRE NOW</span>
                        <h1 className="text-5xl md:text-7xl font-serif italic mb-6">Book Your Session</h1>
                        <p className="text-gray-400 font-sans tracking-wide max-w-2xl mx-auto">
                            Let's capture your most precious moments. Complete the form below to begin your journey with us.
                        </p>
                    </div>

                    {/* Progress Stepper */}
                    <div className="flex items-center justify-between mb-16 px-4 md:px-20 booking-reveal">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="relative flex flex-col items-center group">
                                <div
                                    className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-xl border transition-all duration-500 ${currentStep >= step
                                        ? 'border-gold text-gold bg-gold/10'
                                        : 'border-white/10 text-white/30'
                                        }`}
                                >
                                    {currentStep > step ? <Check className="w-6 h-6" /> : step}
                                </div>
                                {step < 4 && (
                                    <div className={`absolute top-7 left-[calc(100%+0.5rem)] w-[40px] md:w-[100px] h-[1px] transition-colors duration-500 ${currentStep > step ? 'bg-gold' : 'bg-white/10'}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Booking Form Card */}
                    <div className="luxury-card booking-reveal">
                        <form onSubmit={handleSubmit} ref={formRef}>
                            <AnimatePresence mode="wait">
                                {/* Step 1: Service & Package Selection */}
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <h2 className="text-3xl font-serif italic text-gold mb-8">Select Service & Package</h2>
                                        <div className="space-y-8">
                                            <div>
                                                <label className="block text-sm tracking-widest text-gray-400 mb-4">SERVICE TYPE</label>
                                                <select
                                                    name="service"
                                                    value={formData.service}
                                                    onChange={handleInputChange}
                                                    className="luxury-select"
                                                    required
                                                >
                                                    <option value="">Select a service</option>
                                                    {services.map((service) => (
                                                        <option key={service.id} value={service.id}>
                                                            {service.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {formData.service && (
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    {packages[formData.service]?.map((pkg) => (
                                                        <div
                                                            key={pkg.id}
                                                            onClick={() => setFormData({ ...formData, package: pkg.id })}
                                                            className={`p-8 border rounded-[2rem] cursor-pointer transition-all duration-500 group ${formData.package === pkg.id
                                                                ? 'border-gold bg-gold/5'
                                                                : 'border-white/5 hover:border-gold/30 bg-white/[0.02]'
                                                                }`}
                                                        >
                                                            <h3 className={`text-xl font-serif mb-2 transition-colors ${formData.package === pkg.id ? 'text-gold' : 'text-white'}`}>
                                                                {pkg.name}
                                                            </h3>
                                                            <p className="text-3xl font-display text-gold">
                                                                ₹{pkg.price.toLocaleString()}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Date & Time Selection */}
                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <h2 className="text-3xl font-serif italic text-gold mb-8">Select Date & Time</h2>
                                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                                            <div className="luxury-card !p-6 bg-white/[0.02] border-white/5">
                                                <Calendar
                                                    onChange={setSelectedDate}
                                                    value={selectedDate}
                                                    minDate={new Date()}
                                                    className="w-full !bg-transparent !border-none !font-sans !text-white"
                                                />
                                            </div>

                                            <div className="space-y-6">
                                                <label className="block text-sm tracking-widest text-gray-400 mb-4">AVAILABLE SLOTS</label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {timeSlots.map((time) => (
                                                        <button
                                                            key={time}
                                                            type="button"
                                                            onClick={() => setSelectedTime(time)}
                                                            className={`py-4 px-6 rounded-full font-sans text-sm transition-all duration-500 border ${selectedTime === time
                                                                ? 'bg-gold text-black border-gold'
                                                                : 'border-white/10 text-gray-400 hover:border-gold/50 hover:text-white'
                                                                }`}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Personal Details */}
                                {currentStep === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <h2 className="text-3xl font-serif italic text-gold mb-8">Your Precious Details</h2>
                                        <div className="grid md:grid-cols-2 gap-10">
                                            <div className="col-span-2">
                                                <label className="block text-xs tracking-[0.3em] text-gray-500 mb-2 uppercase">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="luxury-input"
                                                    placeholder="Enter your name"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs tracking-[0.3em] text-gray-500 mb-2 uppercase">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="luxury-input"
                                                    placeholder="you@example.com"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs tracking-[0.3em] text-gray-500 mb-2 uppercase">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="luxury-input"
                                                    placeholder="+91"
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-xs tracking-[0.3em] text-gray-500 mb-2 uppercase">Event Location</label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    className="luxury-input"
                                                    placeholder="City, State"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-xs tracking-[0.3em] text-gray-500 mb-2 uppercase">Special Notes</label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    rows="4"
                                                    className="luxury-input"
                                                    placeholder="Tell us more about your vision..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Summary */}
                                {currentStep === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <h2 className="text-3xl font-serif italic text-gold mb-8">Confirm Your Vision</h2>
                                        <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] space-y-6">
                                            <div className="grid grid-cols-2 gap-y-4 text-sm font-sans">
                                                <span className="text-gray-500 uppercase tracking-widest">Service</span>
                                                <span className="text-white text-right font-serif italic text-xl">
                                                    {services.find(s => s.id === formData.service)?.name}
                                                </span>

                                                <span className="text-gray-500 uppercase tracking-widest">Package</span>
                                                <span className="text-white text-right font-serif italic text-xl">
                                                    {packages[formData.service]?.find(p => p.id === formData.package)?.name}
                                                </span>

                                                <span className="text-gray-500 uppercase tracking-widest">Date & Time</span>
                                                <span className="text-white text-right">
                                                    {selectedDate.toLocaleDateString('en-IN', {
                                                        day: 'numeric', month: 'long', year: 'numeric'
                                                    })} at {selectedTime}
                                                </span>

                                                <span className="text-gray-500 uppercase tracking-widest">Contact Info</span>
                                                <span className="text-white text-right">
                                                    {formData.name} <br /> {formData.email} <br /> {formData.phone}
                                                </span>
                                            </div>

                                            <div className="border-t border-white/10 pt-8 mt-8 flex justify-between items-center">
                                                <span className="text-gray-500 uppercase tracking-[0.3em]">Total Value</span>
                                                <span className="text-4xl font-display text-gold">
                                                    ₹{getSelectedPackagePrice().toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-16 pt-10 border-t border-white/5">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="flex items-center gap-3 text-gold hover:text-white transition-colors tracking-widest uppercase text-xs"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Previous
                                    </button>
                                )}
                                {currentStep < 4 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!isStepValid()}
                                        className="luxury-btn !py-4 !px-12 ml-auto disabled:opacity-30 disabled:pointer-events-none"
                                    >
                                        <span className="flex items-center gap-3">
                                            NEXT STEP <ArrowRight className="w-5 h-5" />
                                        </span>
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="luxury-btn !py-4 !px-12 ml-auto"
                                    >
                                        <span className="flex items-center gap-3">
                                            CONFIRM VISION <Check className="w-5 h-5" />
                                        </span>
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;

