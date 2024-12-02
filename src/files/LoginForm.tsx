

import React, { useState } from 'react';
import { AlertCircle, Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginCredentials } from '../../types/auth';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    identifier: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(credentials);
      window.location.href = '/profile';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

      {error && (
        <div className="flex items-center p-4 mb-4 bg-red-50 text-red-600 rounded-md">
          <AlertCircle className="mr-2" size={20} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              id="identifier"
              name="identifier"
			  autoComplete="email"
              value={credentials.identifier}
              onChange={handleChange}
              className="pl-10 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              id="password"
              name="password"
			  autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
              className="pl-10 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:text-blue-600">
            Create Account
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;