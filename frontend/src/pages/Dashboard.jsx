import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Calendar, Clock, Camera, CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        upcoming: 0,
        pending: 0
    });

    // Dummy bookings data - Only for this client
    const dummyBookings = [
        {
            id: '1',
            service: { title: 'Wedding Photography', image: '/images/wedding.png' },
            scheduled_at: '2024-12-15T14:00:00',
            status: 'confirmed',
            price_cents: 150000,
            duration_minutes: 480,
        },
        {
            id: '2',
            service: { title: 'Pre-Wedding Shoot', image: '/images/prewedding.png' },
            scheduled_at: '2024-12-01T10:00:00',
            status: 'pending',
            price_cents: 50000,
            duration_minutes: 180,
        },
    ];

    useEffect(() => {
        setBookings(dummyBookings);
        setStats({
            total: dummyBookings.length,
            completed: dummyBookings.filter(b => b.status === 'completed').length,
            upcoming: dummyBookings.filter(b => b.status === 'confirmed').length,
            pending: dummyBookings.filter(b => b.status === 'pending').length,
        });
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'pending':
                return <AlertCircle className="w-5 h-5 text-yellow-500" />;
            case 'cancelled':
            case 'rejected':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <CheckCircle className="w-5 h-5 text-blue-500" />;
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
            confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
            rejected: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
            <div className="container-custom section-padding">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 dark:text-white">
                        Welcome back, {user?.full_name}! 👋
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">Here are your bookings and upcoming sessions</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Bookings', value: stats.total, icon: Calendar, color: 'from-blue-500 to-blue-600' },
                        { label: 'Upcoming', value: stats.upcoming, icon: Clock, color: 'from-green-500 to-green-600' },
                        { label: 'Pending', value: stats.pending, icon: AlertCircle, color: 'from-yellow-500 to-yellow-600' },
                        { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'from-purple-500 to-purple-600' },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card p-6 hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - My Bookings */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Action */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card p-8 bg-gradient-to-br from-primary-500 to-secondary-600 text-white"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold mb-2">Ready to book a session?</h2>
                                    <p className="text-white/90 mb-4">Choose from our professional photography services</p>
                                </div>
                                <Link
                                    to="/booking"
                                    className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    New Booking
                                </Link>
                            </div>
                        </motion.div>

                        {/* Bookings List */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card p-8"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-semibold dark:text-white">My Bookings</h2>
                                <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                                    {bookings.length} total
                                </span>
                            </div>

                            <div className="space-y-6">
                                {bookings.length === 0 ? (
                                    <div className="text-center py-16">
                                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Calendar className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">No bookings yet</p>
                                        <Link to="/booking" className="btn-primary inline-flex">
                                            <Plus className="w-5 h-5" />
                                            Create Your First Booking
                                        </Link>
                                    </div>
                                ) : (
                                    bookings.map((booking, index) => (
                                        <motion.div
                                            key={booking.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="border-2 border-gray-100 dark:border-gray-700 rounded-xl p-6 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg transition-all"
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Service Image */}
                                                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary-400 to-secondary-500">
                                                    {booking.service.image ? (
                                                        <img
                                                            src={booking.service.image}
                                                            alt={booking.service.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Camera className="w-10 h-10 text-white/80" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Booking Details */}
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <h3 className="text-xl font-semibold mb-2 dark:text-white">
                                                                {booking.service.title}
                                                            </h3>
                                                            <div className="flex items-center gap-2">
                                                                {getStatusIcon(booking.status)}
                                                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                                                                ${(booking.price_cents / 100).toFixed(0)}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4 text-primary-600" />
                                                            <span>
                                                                {new Date(booking.scheduled_at).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                })}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4 text-primary-600" />
                                                            <span>
                                                                {new Date(booking.scheduled_at).toLocaleTimeString('en-US', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Browse Services */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card overflow-hidden"
                        >
                            <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-600 relative">
                                <img
                                    src="/images/wedding.png"
                                    alt="Services"
                                    className="w-full h-full object-cover opacity-30"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Camera className="w-16 h-16 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 dark:text-white">Explore Our Services</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Discover our professional photography packages
                                </p>
                                <Link to="/services" className="btn-primary w-full text-center">
                                    Browse Services
                                </Link>
                            </div>
                        </motion.div>

                        {/* Portfolio */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card overflow-hidden"
                        >
                            <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 relative">
                                <img
                                    src="/images/prewedding.png"
                                    alt="Portfolio"
                                    className="w-full h-full object-cover opacity-30"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Camera className="w-16 h-16 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 dark:text-white">View Our Portfolio</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Check out our previous work and get inspired
                                </p>
                                <Link to="/portfolio" className="btn-secondary w-full text-center">
                                    View Portfolio
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
