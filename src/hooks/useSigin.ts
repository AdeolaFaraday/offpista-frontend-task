import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useSignin() {
    const navigate = useNavigate();
    const { mutate: login, isPending, error } = useMutation({
        mutationFn: async (form: any) => {
            const res = await api.post('/auth/login', form);
            console.log({ res });
            const { token } = res.data;
            localStorage.setItem('jwt', token);
            return token;
        },
        onSuccess: () => {
            toast.success('Signin successful!');
            navigate('/dashboard');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || error?.message || 'Signin failed. Please try again.');
        },
    });

    return { login, isPending, error };
}       