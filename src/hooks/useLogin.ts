import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function useSignin() {
    const navigate = useNavigate();
    const { login: loginAuth } = useAuth();
    const { mutate: login, isPending, error } = useMutation({
        mutationFn: async (form: any) => {
            const res = await api.post('/auth/login', form);
            console.log({ res });
            const { token } = res.data;
            localStorage.setItem('jwt', token);
            return { token, user: res.data.user };
        },
        onSuccess: (data) => {
            loginAuth(data.user);
            toast.success('Signin successful!');
            navigate('/dashboard');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || error?.message || 'Signin failed. Please try again.');
        },
    });

    return { login, isPending, error };
}       