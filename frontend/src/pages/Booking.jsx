import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, DollarSign, FileText, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const Booking = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        service_id: '',
        package_id: '',
        scheduled_date: '',
        scheduled_time: '',
        notes: '',
    });

    const services = [
        { id: '1', title: 'Wedding Photography', price: 1500 },
        { id: '2', title: 'Pre-Wedding Shoot', price: 500 },
        { id: '3', title: 'Birthday Party', price: 300 },
        { id: '4', title: 'Corporate Events', price: 800 },
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isAuthenticated()) {
            toast.error('Please login to create a booking');
            navigate('/login');
            return;
        }

        toast.success('Booking created successfully! We\'ll contact you soon.');
        navigate('/dashboard');
    };

    const nextStep = () => {
        if (step === 1 && !formData.service_id) {
            toast.error('Please select a service');
            return;
        }
        if (step === 2 && (!formData.scheduled_date || !formData.scheduled_time)) {
            toast.error('Please select date and time');
            return;
        }
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const selectedService = services.find(s => s.id === formData.service_id);

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="container-custom section-padding">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Book Your Session
                        </h1>
                        <p className="text-xl text-gray-600">
                            Follow the steps below to complete your booking
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className="flex items-center flex-1">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step >= s
                                                ? 'gradient-primary text-white'
                                                : 'bg-gray-200 text-gray-600'
                                            }`}
                                    >
                                        {step > s ? <Check className="w-6 h-6" /> : s}
                                    </div>
                                    {s < 3 && (
                                        <div
                                            className={`flex-1 h-1 mx-4 ${step > s ? 'bg-primary-500' : 'bg-gray-200'
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4">
                            <span className="text-sm font-medium">Select Service</span>
                            <span className="text-sm font-medium">Date & Time</span>
                            <span className="text-sm font-medium">Confirm</span>
                        </div>
                    </div>

                    {/* Form */}
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="card p-8"
                    >
                        <form onSubmit={handleSubmit}>
                            {/* Step 1: Select Service */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-semibold mb-6">Choose Your Service</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {services.map((service) => (
                                            <label
                                                key={service.id}
                                                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${formData.service_id === service.id
                                                        ? 'border-primary-500 bg-primary-50'
                                                        : 'border-gray-200 hover:border-primary-300'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="service_id"
                                                    value={service.id}
                                                    checked={formData.service_id === service.id}
                                                    onChange={handleChange}
                                                    className="sr-only"
                                                />
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-semibold text-lg">{service.title}</h3>
                                                    <div className="w-6 h-6 rounded-full border-2 border-primary-500 flex items-center justify-center">
                                                        {formData.service_id === service.id && (
                                                            <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-2xl font-bold text-primary-600">
                                                    ${service.price}
                                                </p>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Date & Time */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-semibold mb-6">Select Date & Time</h2>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Preferred Date
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="date"
                                                name="scheduled_date"
                                                value={formData.scheduled_date}
                                                onChange={handleChange}
                                                min={new Date().toISOString().split('T')[0]}
                                                className="input pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Preferred Time
                                        </label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="time"
                                                name="scheduled_time"
                                                value={formData.scheduled_time}
                                                onChange={handleChange}
                                                className="input pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Additional Notes (Optional)
                                        </label>
                                        <div className="relative">
                                            <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <textarea
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleChange}
                                                rows={4}
                                                className="input pl-10 resize-none"
                                                placeholder="Any special requirements or preferences..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Confirm */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-semibold mb-6">Confirm Your Booking</h2>

                                    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Service</span>
                                            <span className="font-semibold">{selectedService?.title}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Date</span>
                                            <span className="font-semibold">
                                                {new Date(formData.scheduled_date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Time</span>
                                            <span className="font-semibold">{formData.scheduled_time}</span>
                                        </div>
                                        {formData.notes && (
                                            <div className="pt-4 border-t border-gray-200">
                                                <span className="text-gray-600 block mb-2">Notes</span>
                                                <p className="text-gray-800">{formData.notes}</p>
                                            </div>
                                        )}
                                        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                                            <span className="text-lg font-semibold">Total</span>
                                            <span className="text-3xl font-bold text-primary-600">
                                                ${selectedService?.price}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <p className="text-sm text-blue-800">
                                            <strong>Note:</strong> Your booking will be pending until confirmed by our team.
                                            We'll contact you within 24 hours to finalize the details.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="btn-secondary"
                                    >
                                        Previous
                                    </button>
                                )}
                                {step < 3 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="btn-primary ml-auto"
                                    >
                                        Next Step
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="btn-primary ml-auto"
                                    >
                                        Confirm Booking
                                    </button>
                                )}
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
