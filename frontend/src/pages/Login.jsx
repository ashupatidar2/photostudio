import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate(from, { replace: true });
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
                    {/* Inner Navbar (Compact Spacing) */}
                    <nav className="flex items-center justify-between mb-8 lg:mb-12">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gold shadow-lg shadow-gold/50" />
                            <span className="text-white font-bold tracking-tight text-base">Ashu.</span>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
                            <Link to="/" className="text-gray-500 hover:text-gold transition-colors">Home</Link>
                        </div>
                    </nav>

                    {/* Form Container (Optimized Spacing) */}
                    <div className="flex-1 flex flex-col justify-center max-w-[320px] mx-auto w-full">
                        <span className="text-gray-600 text-[8px] font-black uppercase tracking-[0.3em] mb-2 block">Personal Studio Access</span>
                        <h1 className="text-white text-3xl font-bold mb-3 tracking-tight leading-none">Log in to account<span className="text-gold">.</span></h1>
                        <p className="text-gray-500 text-xs mb-8 font-medium">Please enter your details to enter the studio.</p>

                        {error && (
                            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] uppercase font-bold tracking-widest rounded-xl text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#2A2D31] border border-white/5 p-3.5 rounded-xl text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-gray-600 text-sm font-medium"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#2A2D31] border border-white/5 p-3.5 pr-12 rounded-xl text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-gray-600 text-sm font-medium"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
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
                                    {loading ? 'Entering...' : 'Log in'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Bottom Branding (Compact) */}
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
                        className="w-full h-full bg-cover bg-center transition-transform duration-[2000ms] ease-out scale-105"
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
                        <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">No account?</span>
                        <Link
                            to="/signup"
                            className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold rounded-lg hover:bg-gold hover:border-gold hover:text-charcoal-dark transition-all uppercase tracking-widest"
                        >
                            Sign Up
                        </Link>
                    </motion.div>

                    {/* Bottom Floating Content (Compact) */}
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
                                Capturing your essence.
                            </h3>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
