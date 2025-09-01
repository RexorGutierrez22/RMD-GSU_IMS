import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

// Create axios instance for user API calls
const userAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User registration services
export const userRegistration = {
  // Register a new student
  registerStudent: async (studentData) => {
    const response = await userAPI.post('/students', studentData);
    return response.data;
  },

  // Register a new employee
  registerEmployee: async (employeeData) => {
    const response = await userAPI.post('/employees', employeeData);
    return response.data;
  },

  // Check if email/ID already exists
  checkExistence: async (field, value, type) => {
    const response = await userAPI.get(`/check-existence`, {
      params: { field, value, type }
    });
    return response.data;
  }
};

// User data services
export const userData = {
  // Get user profile by ID and type
  getProfile: async (id, type) => {
    const response = await userAPI.get(`/${type}s/${id}`);
    return response.data;
  },

  // Update user profile
  updateProfile: async (id, type, profileData) => {
    const response = await userAPI.put(`/${type}s/${id}`, profileData);
    return response.data;
  }
};

// QR Code services
export const qrServices = {
  // Generate QR code for user
  generateQR: async (id, type) => {
    const response = await userAPI.get(`/generate-qr/${type}/${id}`);
    return response.data;
  },

  // Download QR code
  downloadQR: async (filename) => {
    const response = await userAPI.get(`/download-qr/${filename}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};

export default userAPI;
