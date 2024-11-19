import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';
import { AuthService } from '../services/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Initialize state from localStorage
    const token = localStorage.getItem('jwt');
    const userStr = localStorage.getItem('user');
    let user = null;
    
    try {
      user = userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
    }

    return {
      isAuthenticated: Boolean(token && user),
      user,
      token,
    };
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Function to clear auth state and storage
  const clearAuth = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  // Function to validate token and user data
  const checkAuthStatus = async () => {
    const token = localStorage.getItem('jwt');
    
    if (!token) {
      clearAuth();
      return;
    }

    try {
      const userData = await AuthService.getCurrentUser();
      setAuthState({
        isAuthenticated: true,
        user: userData,
        token,
      });
    } catch (error) {
      console.error('Token validation failed:', error);
      clearAuth();
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      if (authState.token) {
        await checkAuthStatus();
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const { jwt, user } = await AuthService.login(credentials);

      localStorage.setItem('jwt', jwt);
      localStorage.setItem('user', JSON.stringify(user));

      setAuthState({
        isAuthenticated: true,
        user,
        token: jwt,
      });
    } catch (error) {
      clearAuth();
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      await AuthService.register(credentials);
      window.location.href = '/signin';
    } catch (error) {
      throw error;
    }
  };

  const logout = (): void => {
    clearAuth();
    window.location.href = '/signin';
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      checkAuthStatus,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};