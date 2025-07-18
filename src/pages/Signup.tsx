import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useSignup from '../hooks/useSignup';
import Input from '../components/common/input';

const signupSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
  const { signup, isPending, error } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupForm) => {
    signup(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full mx-auto mt-10 flex flex-col gap-y-6"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">Sign Up</h2>
        <Input label="Name" name="name" type="text" placeholder="Your Name" register={register} error={errors.name?.message} />
        <Input label="Email" name="email" type="email" placeholder="you@email.com" register={register} error={errors.email?.message} />
        <Input label="Password" name="password" type="password" placeholder="Password" register={register} error={errors.password?.message} />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold shadow-md hover:bg-blue-700 transition"
          disabled={isPending}
        >
          {isPending ? 'Signing up...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
} 