import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

// Mock users for demo
const MOCK_USERS = [
    {
        id: '1',
        email: 'admin@photostudio.com',
        password: 'admin123',
        full_name: 'Admin User',
        phone: '+1234567890',
        role: 'ADMIN',
    },
    {
        id: '2',
        email: 'client@example.com',
        password: 'client123',
        full_name: 'Jane Client',
        phone: '+1234567892',
        role: 'CLIENT',
    },
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            // Mock login - find user
            const foundUser = MOCK_USERS.find(
                u => u.email === credentials.email && u.password === credentials.password
            );

            if (!foundUser) {
                throw new Error('Invalid credentials');
            }

            const { password, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            localStorage.setItem('user', JSON.stringify(userWithoutPassword));
            localStorage.setItem('access_token', 'mock-token-' + foundUser.id);

            toast.success('Welcome back!');
            return { user: userWithoutPassword };
        } catch (error) {
            toast.error('Invalid email or password');
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            // Mock register - create new user
            const newUser = {
                id: Date.now().toString(),
                email: userData.email,
                full_name: userData.full_name,
                phone: userData.phone,
                role: 'CLIENT',
            };

            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            localStorage.setItem('access_token', 'mock-token-' + newUser.id);

            toast.success('Account created successfully!');
            return { user: newUser };
        } catch (error) {
            toast.error('Registration failed. Please try again.');
            throw error;
        }
    };

    const logout = async () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        toast.success('Logged out successfully');
    };

    const isAuthenticated = () => {
        return !!user && !!localStorage.getItem('access_token');
    };

    const hasRole = (roles) => {
        if (!user) return false;
        if (Array.isArray(roles)) {
            return roles.includes(user.role);
        }
        return user.role === roles;
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
        hasRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;
