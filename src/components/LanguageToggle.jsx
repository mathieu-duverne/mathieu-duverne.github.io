import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      title={`Switch to ${language === 'en' ? 'French' : 'English'}`}
    >
      <Languages className="w-5 h-5" />
    </button>
  );
};

export default LanguageToggle;
