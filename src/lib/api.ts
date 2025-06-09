import axios from 'axios';
import { User, Consent, Template, ApiResponse, PaginatedResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post<ApiResponse<{ token: string; user: User }>>('/auth/login', { email, password }),
  
  register: (userData: { name: string; email: string; password: string; role: string }) =>
    api.post<ApiResponse<{ token: string; user: User }>>('/auth/register', userData),
  
  getCurrentUser: () =>
    api.get<ApiResponse<User>>('/auth/me'),
};

export const usersAPI = {
  getCreators: (params?: { role?: string; sort?: string; page?: number; limit?: number }) =>
    api.get<ApiResponse<PaginatedResponse<User>>>('/creators', { params }),
  
  searchUsers: (query: string, filters?: { role?: string; industry?: string }) =>
    api.get<ApiResponse<User[]>>('/search', { params: { query, ...filters } }),
  
  getUserProfile: (id: string) =>
    api.get<ApiResponse<User>>(`/user/${id}`),
  
  getUserDashboard: (id: string) =>
    api.get<ApiResponse<{
      ongoingContracts: Consent[];
      onHoldContracts: Consent[];
      waitingForAcceptance: Consent[];
      completedContracts: Consent[];
      contractsToAccept: Consent[];
    }>>(`/user/${id}/dashboard`),
};

export const consentsAPI = {
  acceptConsent: (id: string, data: { userId: string }) =>
    api.post<ApiResponse<Consent>>(`/consent/${id}/accept`, data),
  
  rejectConsent: (id: string, data: { userId: string }) =>
    api.post<ApiResponse<Consent>>(`/consent/${id}/reject`, data),
  
  createConsent: (consentData: Partial<Consent>) =>
    api.post<ApiResponse<Consent>>('/consent', consentData),
  
  getConsent: (id: string) =>
    api.get<ApiResponse<Consent>>(`/consent/${id}`),
  
  deleteConsent: (id: string) =>
    api.delete<ApiResponse<void>>(`/consent/${id}`),
  
  getPendingConsentsForUser: (userId: string) =>
    api.get<ApiResponse<Consent[]>>(`/consent/user/${userId}?status=pending`),
  
  getSentInvitations: (creatorId: string) =>
    api.get<ApiResponse<Consent[]>>(`/consent/creator/${creatorId}`),
};

export const templatesAPI = {
  getTemplates: (params?: { category?: string; page?: number; limit?: number }) =>
    api.get<ApiResponse<PaginatedResponse<Template>>>('/templates', { params }),
  
  getTemplate: (id: string) =>
    api.get<ApiResponse<Template>>(`/templates/${id}`),
  
  cloneTemplate: (id: string, title: string) =>
    api.post<ApiResponse<Consent>>(`/templates/${id}/clone`, { title }),
};

export default api;
