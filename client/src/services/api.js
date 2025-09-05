import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8001/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

// Add a request interceptor for handling tokens if needed
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin_token') || localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('admin_token');
            localStorage.removeItem('token');
            window.location.href = '/admin';
        }
        return Promise.reject(error);
    }
);

// Dashboard API endpoints
export const dashboardApi = {
    getStats: () => api.get('/dashboard/stats'),
    getStudentsCount: () => api.get('/dashboard/students-count'),
    getEmployeesCount: () => api.get('/dashboard/employees-count'),
    getInventoryStats: () => api.get('/dashboard/inventory-stats'),
    getActivity: () => api.get('/dashboard/activity')
};

// Admin API endpoints
export const adminApi = {
    login: (credentials) => api.post('/admin/login', credentials),
    validateToken: () => api.get('/admin/validate-token'),
    logout: () => api.post('/admin/logout')
};

export default api;
