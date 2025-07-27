import axios from 'axios';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL, // Replace with your API base URL
});

api.interceptors.request.use(
    async config => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;