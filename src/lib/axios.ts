import axios from 'axios';

const JWTERRORMESSAGE = 'JWT signature does not match locally computed signature. JWT validity cannot be asserted and should not be trusted.';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8081/v1',
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
        if (error.response.data && error.response.data.message === JWTERRORMESSAGE && error.response.status === 500) {
            localStorage.removeItem('auth-token');
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default api;