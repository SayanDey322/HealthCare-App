import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (name: string, email: string, password: string) =>
    apiClient.post('/auth/register', { name, email, password }),
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  getProfile: () => apiClient.get('/auth/profile'),
};

export const childrenAPI = {
  create: (data: any) => apiClient.post('/children', data),
  getAll: () => apiClient.get('/children'),
  getById: (id: string) => apiClient.get(`/children/${id}`),
  update: (id: string, data: any) => apiClient.put(`/children/${id}`, data),
  delete: (id: string) => apiClient.delete(`/children/${id}`),
};

export const healthAPI = {
  addRecord: (data: any) => apiClient.post('/health', data),
  getRecords: (childId: string, recordType?: string) =>
    apiClient.get(`/health/${childId}`, { params: { recordType } }),
  getStats: (childId: string, days?: number) =>
    apiClient.get(`/health/${childId}/stats`, { params: { days } }),
  deleteRecord: (id: string) => apiClient.delete(`/health/${id}`),
};

export const appointmentAPI = {
  create: (data: any) => apiClient.post('/appointments', data),
  getAll: (childId: string) => apiClient.get(`/appointments/${childId}`),
  update: (id: string, data: any) => apiClient.put(`/appointments/${id}`, data),
  delete: (id: string) => apiClient.delete(`/appointments/${id}`),
};

export default apiClient;
