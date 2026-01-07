import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        full_name: '',
        phone: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await signup(formData);

        if (result.success) {
            navigate('/', { replace: true });
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden font-sans selection:bg-gold/30 p-4 lg:p-6">
            {/* Centered App Card - Optimized for Visibility */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-6xl h-full lg:h-[85vh] max-h-[700px] bg-[#1A1C1E] rounded-[2rem] overflow-hidden flex shadow-2xl relative border border-white/5"
            >
                {/* Left Side: Form Section */}
                <div className="w-full lg:w-[45%] h-full flex flex-col p-6 lg:p-10 relative z-10 bg-[#1A1C1E]">
                    {/* Inner Navbar */}
                    <nav className="flex items-center justify-between mb-6 lg:mb-10">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gold shadow-lg shadow-gold/50" />
                            <span className="text-white font-bold tracking-tight text-base">Ashu.</span>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
                            <Link to="/" className="text-gray-500 hover:text-gold transition-colors">Home</Link>
                        </div>
                    </nav>

                    {/* Form Container */}
                    <div className="flex-1 flex flex-col justify-center max-w-[340px] mx-auto w-full">
                        <span className="text-gray-600 text-[8px] font-black uppercase tracking-[0.3em] mb-2 block">Inner Circle Registration</span>
                        <h1 className="text-white text-3xl font-bold mb-2 tracking-tight leading-none">Create profile<span className="text-gold">.</span></h1>
                        <p className="text-gray-500 text-[11px] mb-6 font-medium italic">Join the elite community of visual storytellers.</p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] uppercase font-bold tracking-widest rounded-xl text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-3.5">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-1">Name</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        required
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className="w-full bg-[#2A2D31] border border-white/5 p-3 rounded-xl text-white focus:border-gold outline-none transition-all placeholder:text-gray-600 text-[13px] font-medium"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-[#2A2D31] border border-white/5 p-3 rounded-xl text-white focus:border-gold outline-none transition-all placeholder:text-gray-600 text-[13px] font-medium"
                                        placeholder="+91..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-[#2A2D31] border border-white/5 p-3 rounded-xl text-white focus:border-gold outline-none transition-all placeholder:text-gray-600 text-[13px] font-medium"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-[#2A2D31] border border-white/5 p-3 rounded-xl text-white focus:border-gold outline-none transition-all placeholder:text-gray-600 text-[13px] font-medium"
                                    placeholder="Create password"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    className="flex-1 py-3.5 bg-[#2A2D31] text-gray-400 font-bold rounded-xl hover:bg-[#32363b] hover:text-white transition-all text-[10px] uppercase tracking-widest border border-white/5"
                                >
                                    Method
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-3.5 bg-gold text-charcoal-dark font-bold rounded-xl hover:bg-gold-light transition-all shadow-lg shadow-gold/20 disabled:opacity-50 text-[10px] uppercase tracking-widest"
                                >
                                    {loading ? 'Creating...' : 'Join now'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Bottom Branding */}
                    <div className="mt-auto pt-6 opacity-30">
                        <svg width="24" height="24" viewBox="0 0 100 100" fill="currentColor">
                            <path d="M20 80L50 20L80 80" stroke="currentColor" strokeWidth="8" fill="none" />
                            <circle cx="90" cy="80" r="5" />
                        </svg>
                    </div>
                </div>

                {/* Right Side: Nature Side Panel */}
                <div className="hidden lg:block lg:w-[55%] h-full relative overflow-hidden group">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: 'url("/auth-bg.png")' }}
                    />
                    <div className="absolute inset-0 bg-[#1A1C1E]/20" />

                    {/* Top Right Toggle Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="absolute top-8 right-8 z-20 flex items-center gap-4"
                    >
                        <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">A member?</span>
                        <Link
                            to="/login"
                            className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold rounded-lg hover:bg-gold hover:border-gold hover:text-charcoal-dark transition-all uppercase tracking-widest"
                        >
                            Log In
                        </Link>
                    </motion.div>

                    {/* Bottom Floating Content */}
                    <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col justify-end pointer-events-none bg-gradient-to-t from-[#1A1C1E] via-transparent to-transparent">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="space-y-4"
                        >
                            <div className="flex gap-1.5">
                                <div className="w-10 h-1 bg-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                                <div className="w-3 h-1 bg-white/20 rounded-full" />
                            </div>
                            <h3 className="text-white text-3xl font-bold tracking-tight max-w-sm leading-tight italic">
                                Where vision meets art.
                            </h3>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
