

import React, { useState, useEffect } from 'react';
import { LogOut, User, Lock, Settings, ChevronDown, LogIn, UserPlus } from 'lucide-react';
import { User as UserType } from '../types/auth';
import { AuthService } from '../services/auth';

interface DropdownItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ icon, label, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 ${className}`}
  >
    {icon}
    {label}
  </button>
);

const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    const { user, token } = AuthService.getCurrentUser();
    if (token && user) {
      setIsAuthenticated(true);
      setUser(user);
    }
  }, []);

  const handleLogout = (): void => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setShowDropdown(false);
    window.location.href = '/';
  };

  const handleNavigation = (path: string): void => {
    window.location.href = path;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('user-dropdown');
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">MyApp</h1>
          </div>

          <nav className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <button 
                  onClick={() => handleNavigation('/signin')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <LogIn size={20} />
                  <span>Sign In</span>
                </button>
                <button 
                  onClick={() => handleNavigation('/signup')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  <UserPlus size={20} />
                  <span>Sign Up</span>
                </button>
              </>
            ) : (
              <div className="relative" id="user-dropdown">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={20} className={`transform transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border animate-fade-in-down">
                    <div className="py-1">
                      <DropdownItem
                        icon={<User size={16} className="mr-2" />}
                        label="Profile"
                        onClick={() => handleNavigation('/profile')}
                      />
                      <DropdownItem
                        icon={<Lock size={16} className="mr-2" />}
                        label="Change Password"
                        onClick={() => handleNavigation('/change-password')}
                      />
                      <DropdownItem
                        icon={<Settings size={16} className="mr-2" />}
                        label="Settings"
                        onClick={() => handleNavigation('/settings')}
                      />
                      <DropdownItem
                        icon={<LogOut size={16} className="mr-2" />}
                        label="Logout"
                        onClick={handleLogout}
                        className="text-red-600"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;