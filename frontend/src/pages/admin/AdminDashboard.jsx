import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users, Calendar, DollarSign, Camera, TrendingUp,
    CheckCircle, Clock, AlertCircle, XCircle, Image as ImageIcon,
    Star, Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalBookings: 45,
        totalRevenue: 125000,
        totalClients: 32,
        totalGalleries: 18,
        pendingBookings: 8,
        confirmedBookings: 12,
        completedBookings: 20,
        cancelledBookings: 5,
    });

    const [recentBookings, setRecentBookings] = useState([
        {
            id: '1',
            client: 'Sarah Johnson',
            service: 'Wedding Photography',
            date: '2024-12-15',
            status: 'confirmed',
            amount: 1500,
            image: '/images/wedding.png'
        },
        {
            id: '2',
            client: 'Mike Chen',
            service: 'Pre-Wedding Shoot',
            date: '2024-12-10',
            status: 'pending',
            amount: 500,
            image: '/images/prewedding.png'
        },
        {
            id: '3',
            client: 'Emma Wilson',
            service: 'Birthday Party',
            date: '2024-12-05',
            status: 'completed',
            amount: 300,
            image: '/images/birthday.png'
        },
    ]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'pending':
                return <AlertCircle className="w-5 h-5 text-yellow-500" />;
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-blue-500" />;
            default:
                return <XCircle className="w-5 h-5 text-red-500" />;
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
            confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
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
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 dark:text-white">
                                Admin Dashboard 👨‍💼
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400">
                                Manage your photography business
                            </p>
                        </div>
                        <Link to="/admin/settings" className="btn-primary">
                            <Settings className="w-5 h-5" />
                            Settings
                        </Link>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        {
                            label: 'Total Revenue',
                            value: `$${stats.totalRevenue.toLocaleString()}`,
                            icon: DollarSign,
                            color: 'from-green-500 to-emerald-600',
                            change: '+12.5%'
                        },
                        {
                            label: 'Total Bookings',
                            value: stats.totalBookings,
                            icon: Calendar,
                            color: 'from-blue-500 to-blue-600',
                            change: '+8.2%'
                        },
                        {
                            label: 'Total Clients',
                            value: stats.totalClients,
                            icon: Users,
                            color: 'from-purple-500 to-purple-600',
                            change: '+15.3%'
                        },
                        {
                            label: 'Galleries',
                            value: stats.totalGalleries,
                            icon: ImageIcon,
                            color: 'from-pink-500 to-rose-600',
                            change: '+5.7%'
                        },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card p-6 hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                    <stat.icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
                                    <TrendingUp className="w-4 h-4" />
                                    {stat.change}
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                {stat.value}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Booking Status Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                    {[
                        { label: 'Pending', value: stats.pendingBookings, color: 'bg-yellow-500' },
                        { label: 'Confirmed', value: stats.confirmedBookings, color: 'bg-green-500' },
                        { label: 'Completed', value: stats.completedBookings, color: 'bg-blue-500' },
                        { label: 'Cancelled', value: stats.cancelledBookings, color: 'bg-red-500' },
                    ].map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                            className="card p-6 text-center"
                        >
                            <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                                <span className="text-2xl font-bold text-white">{item.value}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.label}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Bookings */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card p-8"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-semibold dark:text-white flex items-center gap-2">
                                    <Calendar className="w-6 h-6 text-primary-600" />
                                    Recent Bookings
                                </h2>
                                <Link to="/admin/bookings" className="text-primary-600 hover:text-primary-700 font-medium">
                                    View All →
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {recentBookings.map((booking, index) => (
                                    <motion.div
                                        key={booking.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        className="border-2 border-gray-100 dark:border-gray-700 rounded-xl p-5 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Service Image */}
                                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary-400 to-secondary-500">
                                                {booking.image ? (
                                                    <img
                                                        src={booking.image}
                                                        alt={booking.service}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Camera className="w-8 h-8 text-white/80" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Booking Info */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-semibold text-lg dark:text-white">{booking.client}</h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">{booking.service}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
                                                            ${booking.amount}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(booking.date).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(booking.status)}
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card p-6"
                        >
                            <h2 className="text-xl font-semibold mb-6 dark:text-white">Quick Actions</h2>
                            <div className="space-y-3">
                                <Link to="/admin/bookings" className="btn-primary w-full text-center">
                                    <Calendar className="w-5 h-5" />
                                    Manage Bookings
                                </Link>
                                <Link to="/admin/services" className="btn-secondary w-full text-center">
                                    <Camera className="w-5 h-5" />
                                    Manage Services
                                </Link>
                                <Link to="/admin/galleries" className="btn-secondary w-full text-center">
                                    <ImageIcon className="w-5 h-5" />
                                    Manage Galleries
                                </Link>
                                <Link to="/admin/users" className="btn-secondary w-full text-center">
                                    <Users className="w-5 h-5" />
                                    Manage Users
                                </Link>
                            </div>
                        </motion.div>

                        {/* Top Services */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card p-6"
                        >
                            <h2 className="text-xl font-semibold mb-6 dark:text-white">Top Services</h2>
                            <div className="space-y-4">
                                {[
                                    { name: 'Wedding Photography', bookings: 18, revenue: 27000, image: '/images/wedding.png' },
                                    { name: 'Pre-Wedding Shoot', bookings: 12, revenue: 6000, image: '/images/prewedding.png' },
                                    { name: 'Corporate Events', bookings: 8, revenue: 6400, image: '/images/corporate.png' },
                                ].map((service, index) => (
                                    <div key={index} className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium dark:text-white text-sm">{service.name}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{service.bookings} bookings</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-primary-600 dark:text-primary-400 text-sm">
                                                ${service.revenue.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
