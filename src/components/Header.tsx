import React, { useState, useEffect } from 'react';
import { LogOut, User, Lock, Settings, ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    setShowDropdown(false);
    setShowMobileMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#user-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const AuthenticatedMenu = () => (
    <div className="relative" id="user-dropdown">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-sm">
          {user?.username?.charAt(0).toUpperCase()}
        </div>
        <ChevronDown 
          size={20} 
          className={`transform transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} 
        />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 space-y-1">
            <button
              onClick={() => handleNavigation('/profile')}
              className="flex items-center w-full px-3 py-2 text-left text-gray-700 rounded-md hover:bg-gray-50"
            >
              <User size={18} className="mr-2" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => handleNavigation('/settings')}
              className="flex items-center w-full px-3 py-2 text-left text-gray-700 rounded-md hover:bg-gray-50"
            >
              <Settings size={18} className="mr-2" />
              <span>Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-left text-red-600 rounded-md hover:bg-red-50"
            >
              <LogOut size={18} className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const UnauthenticatedMenu = () => (
    <div className="hidden md:flex items-center space-x-4">
      <button 
        onClick={() => handleNavigation('/signin')}
        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        Sign In
      </button>
      <button 
        onClick={() => handleNavigation('/signup')}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
      >
        Sign Up
      </button>
    </div>
  );

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent cursor-pointer" 
              onClick={() => handleNavigation('/')}
            >
              MyApp
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            {isAuthenticated ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-gray-100 bg-white absolute w-full z-40 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="px-4 py-3 space-y-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigation('/profile')}
                  className="flex items-center w-full px-3 py-2 text-left text-gray-700 rounded-md hover:bg-gray-50"
                >
                  <User size={18} className="mr-2" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => handleNavigation('/settings')}
                  className="flex items-center w-full px-3 py-2 text-left text-gray-700 rounded-md hover:bg-gray-50"
                >
                  <Settings size={18} className="mr-2" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-left text-red-600 rounded-md hover:bg-red-50"
                >
                  <LogOut size={18} className="mr-2" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation('/signin')}
                  className="w-full px-3 py-2 text-left text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavigation('/signup')}
                  className="w-full px-3 py-2 text-left bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;