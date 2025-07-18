import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';

interface LoginForm {
  email: string;
  password: string;
}

export default function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending: loading, error } = useMutation({
    mutationFn: async (form: LoginForm) => {
      const res = await api.post('/auth/login', form);
      const { token } = res.data;
      localStorage.setItem('jwt', token);
      return token;
    },
    onSuccess: () => {
      toast.success('Login successful!');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || 'Login failed. Please try again.');
    },
  });

  return {
    login,
    loading,
    error: error ? (error as any)?.response?.data?.message || (error as Error).message : '',
  };
} 