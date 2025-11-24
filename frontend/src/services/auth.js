import api from './api';

export const authService = {
    // Register new user
    register: async (userData) => {
        try {
            const response = await api.post('/api/auth/register', userData);
            const { access_token, refresh_token, user } = response.data;

            // Store tokens and user data
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('user', JSON.stringify(user));

            return response.data;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    },

    // Login
    login: async (credentials) => {
        try {
            // Format for OAuth2 password flow
            const formData = new URLSearchParams();
            formData.append('username', credentials.email);
            formData.append('password', credentials.password);

            const response = await api.post('/api/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const { access_token, refresh_token, user } = response.data;

            // Store tokens and user data
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('user', JSON.stringify(user));

            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    // Logout
    logout: async () => {
        try {
            await api.post('/api/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
        }
    },

    // Get current user
    getCurrentUser: async () => {
        try {
            const response = await api.get('/api/auth/me');
            return response.data;
        } catch (error) {
            console.error('Get current user error:', error);
            throw error;
        }
    },

    // Refresh token
    refreshToken: async (refreshToken) => {
        try {
            const response = await api.post('/api/auth/refresh', {
                refresh_token: refreshToken,
            });
            return response.data;
        } catch (error) {
            console.error('Refresh token error:', error);
            throw error;
        }
    },
};

export default authService;
