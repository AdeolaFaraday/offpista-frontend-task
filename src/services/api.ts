import axios from 'axios';

const api = axios.create({
  baseURL: 'https://offpista-backend-task.onrender.com',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api; 