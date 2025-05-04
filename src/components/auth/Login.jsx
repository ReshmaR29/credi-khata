import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../ui/Button';
import Cookies from 'js-cookie';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
   const token = Cookies.get('user');
   if(token !== undefined){
    navigate('/dashboard')
   }
  },[])

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                {...register('email', { required: 'Email is required' })}
                className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                {...register('password', { required: 'Password is required' })}
                className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </div>

          <div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}