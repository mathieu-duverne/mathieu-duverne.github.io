import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import AlertMessage from '../common/AlertMessage';
import LoginForm from './auth/LoginForm';
import RegistrationForm from './auth/RegistrationForm';
import Profile from './profile/Profile';
import Header from './Header';

// Loading component to avoid repetition
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
  </div>
);

// Route wrapper components
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/signin';
    }
    setIsLoading(false);
  }, [isAuthenticated]);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <AlertMessage 
          type="error" 
          message={error}
          onClose={() => window.location.href = '/signin'} 
        />
      </div>
    );
  }

  return isAuthenticated ? (
    <div className="container mx-auto p-4">{children}</div>
  ) : null;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        window.location.href = '/profile';
      }
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  if (isLoading) return <LoadingSpinner />;

  return !isAuthenticated ? children : null;
};

// Main Router component
const Router = () => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle root path redirection
    if (window.location.pathname === '/') {
      window.location.href = isAuthenticated ? '/profile' : '/signin';
      return;
    }
    setIsLoading(false);
  }, [isAuthenticated]);

  if (isLoading) return <LoadingSpinner />;

  const renderRouteContent = () => {
    switch (window.location.pathname) {
      case '/signin':
        return (
          <PublicRoute>
            <LoginForm />
          </PublicRoute>
        );
      case '/signup':
        return (
          <PublicRoute>
            <RegistrationForm />
          </PublicRoute>
        );
      case '/profile':
        return (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        );
      default:
        return <LoadingSpinner />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {renderRouteContent()}
    </div>
  );
};

export default Router;