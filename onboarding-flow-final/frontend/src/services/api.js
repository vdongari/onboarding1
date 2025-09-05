import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL 
  ? `${process.env.REACT_APP_API_URL}/api`
  : 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const userAPI = {
  register: (userData) => api.post('/users/register', userData),
  getUser: (email) => api.get(`/users/${email}`),
  updateUser: (email, userData) => api.put(`/users/${email}`, userData),
  getAllUsers: () => api.get('/users'),
};

// Onboarding Configuration API
export const configAPI = {
  getConfiguration: () => api.get('/onboarding-config'),
  updateConfiguration: (configData) => api.put('/onboarding-config', configData),
  getComponentsForPage: (pageNumber) => api.get(`/onboarding-config/page/${pageNumber}`),
};

export default api;
