import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

export default function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isPending, error } = useMutation({
    mutationFn: async (form: SignupForm) => {
      const res = await api.post('/auth/signup', form);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Signup successful!');
      navigate('/login');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || 'Signup failed. Please try again.');
    },
  });

  return {
    signup,
    isPending,
    error: error ? (error as any)?.response?.data?.message || (error as Error).message : '',
  };
} 