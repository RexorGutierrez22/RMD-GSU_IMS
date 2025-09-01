import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

// Create axios instance for admin API calls
const adminAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
adminAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Admin authentication services
export const adminAuth = {
  // Login admin user
  login: async (credentials) => {
    try {
      const response = await adminAPI.post('/login', {
        email: credentials.email, // Use email field correctly
        password: credentials.password
      });
      
      // Store token on successful login
      if (response.data.token) {
        localStorage.setItem('admin_token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Logout admin user
  logout: async () => {
    const response = await adminAPI.post('/logout');
    localStorage.removeItem('admin_token');
    return response.data;
  },

  // Check if admin is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('admin_token');
  },

  // Get admin token
  getToken: () => {
    return localStorage.getItem('admin_token');
  },

  // Set admin token
  setToken: (token) => {
    localStorage.setItem('admin_token', token);
  }
};

// Admin dashboard services
export const adminDashboard = {
  // Get dashboard statistics
  getStats: async () => {
    const response = await adminAPI.get('/dashboard/stats');
    return response.data;
  },

  // Get recent activity
  getRecentActivity: async () => {
    const response = await adminAPI.get('/dashboard/activity');
    return response.data;
  }
};

// Admin user management services
export const adminUsers = {
  // Get all students
  getStudents: async () => {
    const response = await adminAPI.get('/students');
    return response.data;
  },

  // Get all employees
  getEmployees: async () => {
    const response = await adminAPI.get('/employees');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id, type) => {
    const response = await adminAPI.get(`/${type}s/${id}`);
    return response.data;
  },

  // Update user
  updateUser: async (id, type, userData) => {
    const response = await adminAPI.put(`/${type}s/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id, type) => {
    const response = await adminAPI.delete(`/${type}s/${id}`);
    return response.data;
  }
};

export default adminAPI;
