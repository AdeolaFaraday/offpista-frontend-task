import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import Input from '../components/common/input';
import Button from '../components/common/button';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { login, isPending, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full mx-auto mt-10 flex flex-col gap-y-6"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">Login</h2>
        <Input label="Email" name="email" type="email" placeholder="you@email.com" register={register} error={errors.email?.message} />
        <Input label="Password" name="password" type="password" placeholder="Password" register={register} error={errors.password?.message} />
        <Button type="submit" disabled={isPending} loading={isPending}>Login</Button>
        
        {/* Sign up link */}
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
} 