import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageServices from './pages/admin/ManageServices';
import ManageBookings from './pages/admin/ManageBookings';
import ManageGalleries from './pages/admin/ManageGalleries';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import NotFound from './pages/NotFound';

// Create React Query client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AuthProvider>
                    <Router>
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 3000,
                                style: {
                                    background: '#363636',
                                    color: '#fff',
                                },
                                success: {
                                    iconTheme: {
                                        primary: '#8b5cf6',
                                        secondary: '#fff',
                                    },
                                },
                            }}
                        />

                        <Routes>
                            {/* Public routes */}
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="services" element={<Services />} />
                                <Route path="services/:slug" element={<ServiceDetail />} />
                                <Route path="portfolio" element={<Portfolio />} />
                                <Route path="about" element={<About />} />
                                <Route path="contact" element={<Contact />} />
                                <Route path="login" element={<Login />} />
                                <Route path="register" element={<Register />} />

                                {/* Protected client routes */}
                                <Route
                                    path="dashboard"
                                    element={
                                        <ProtectedRoute>
                                            <Dashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="booking"
                                    element={
                                        <ProtectedRoute>
                                            <Booking />
                                        </ProtectedRoute>
                                    }
                                />

                                {/* Protected admin routes */}
                                <Route
                                    path="admin"
                                    element={
                                        <ProtectedRoute requiredRole="admin">
                                            <AdminDashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="admin/services"
                                    element={
                                        <ProtectedRoute requiredRole="admin">
                                            <ManageServices />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="admin/bookings"
                                    element={
                                        <ProtectedRoute requiredRole="admin">
                                            <ManageBookings />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="admin/galleries"
                                    element={
                                        <ProtectedRoute requiredRole="admin">
                                            <ManageGalleries />
                                        </ProtectedRoute>
                                    }
                                />

                                {/* 404 */}
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </Router>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
