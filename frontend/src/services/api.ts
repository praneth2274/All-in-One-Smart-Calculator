import axios from 'axios';

const API = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem('calchub_token');
  const geminiKey = localStorage.getItem('calchub_gemini_key');
  if (config.headers) {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (geminiKey) config.headers['x-gemini-api-key'] = geminiKey;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('calchub_token');
      localStorage.removeItem('calchub_user');
    }
    return Promise.reject(error);
  }
);

export default API;

