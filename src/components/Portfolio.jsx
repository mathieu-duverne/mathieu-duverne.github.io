import React, { useState } from 'react';
import { 
  Linkedin, 
  Mail, 
  MapPin, 
  Moon, 
  Sun, 
  Globe,
  Smartphone,
  Gamepad,
  Newspaper,
  Copy, 
  Check,
  FileText,
  Download,
  X,
  Youtube
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

const getProjectIcon = (url) => {
  if (url.includes('clubtop20')) return <Globe className="w-4 h-4 text-blue-500" />;
  if (url.includes('instant-sport')) return <Smartphone className="w-4 h-4 text-blue-500" />;
  if (url.includes('quiz')) return <Gamepad className="w-4 h-4 text-blue-500" />;
  return <Globe className="w-4 h-4 text-blue-500" />;
};

const getArticleIcon = () => {
  return <Newspaper className="w-4 h-4 text-blue-500" />;
};

const Portfolio = () => {
  const [isDark, setIsDark] = useState(true);
  const [copied, setCopied] = useState(false);
  const { translations } = useLanguage();
  const content = translations.portfolio; // Utilise directement les traductions du portfolio

  const copyEmail = async () => {
    await navigator.clipboard.writeText('mat.duverne@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = {
    linkedin: 'https://www.linkedin.com/in/mathieu-duverne-8b55961ab/',
    x: 'https://x.com/mathieu_duverne',
    youtube: 'https://www.youtube.com/@mathieuduverne'
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'
    }`}>
      {/* Header Controls */}
      <div className="fixed top-0 right-0 p-4 flex gap-4 z-10">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <LanguageToggle />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - About */}
        <div className={`w-full lg:w-1/3 p-4 md:p-8 backdrop-blur-sm relative ${
          isDark ? 'bg-gray-800/90' : 'bg-white/70'
        }`}>
          <div className="lg:sticky lg:top-8 flex flex-col h-[calc(100vh-4rem)]">
            <div className="flex-grow">
              <div className="mb-8 pt-12 lg:pt-0">
                {/* <div className="mb-8 relative w-24 h-24 md:w-32 md:h-32 mx-auto lg:mx-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse opacity-75 blur-md"></div>
                  <img
                    src="/mathieu-duverne.jpg"
                    alt={content.title}
                    className="relative rounded-full object-cover w-full h-full border-4 border-white dark:border-gray-800 shadow-xl"
                  />
                </div> */}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                      {content.title}
                    </h1>
                    <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300">
                      {content.headline}
                    </p>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <a 
                      href={socialLinks.linkedin}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 rounded-lg bg-white dark:bg-gray-800/50 hover:bg-blue-500 dark:hover:bg-blue-500 transition-all duration-300"
                    >
                      <Linkedin className="w-5 h-5 text-black" />
                    </a>
                    <a 
                      href={socialLinks.x}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 rounded-lg bg-white dark:bg-gray-800/50 hover:bg-black dark:hover:bg-black transition-all duration-300"
                    >
                      <X className="w-5 h-5 text-black" />
                    </a>
                    <a 
                      href={socialLinks.youtube}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 rounded-lg bg-white dark:bg-gray-800/50 hover:bg-red-500 dark:hover:bg-red-500 transition-all duration-300"
                    >
                      <Youtube className="w-5 h-5 text-black" />
                    </a>
                  </div>

                  <div className="space-y-3 bg-white dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-blue-500" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">{content.location}</p>
                    </div>
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-blue-500" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">mat.duverne@gmail.com</p>
                      </div>
                      <button
                        onClick={copyEmail}
                        className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-blue-500/10 transition-all duration-300"
                        title="Copy email"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-blue-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CV Section - Maintenant en bas */}
            <div className="w-full py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center gap-4">
                {/* Bouton Visualiser */}
                <a
                  href="/cv0.1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  {content.cv.view}
                </a>
                
                {/* Bouton Télécharger */}
                <a
                  href="/cv0.1.pdf"
                  download
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {content.cv.download}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Projects & Articles */}
        <div className={`w-full lg:w-2/3 p-4 md:p-8 ${
          isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-white'
        }`}>
          {/* Projects Section */}
          <div className="max-w-2xl mx-auto pt-4 lg:pt-12">
            <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {content.projects.title}
            </h2>
            <div className="space-y-4 md:space-y-6">
              {content.projects.items.map((project, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-4 md:p-6 transition-all ${
                    isDark 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-blue-50/50 hover:bg-blue-100/30'
                  }`}
                >
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="block relative">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        {getProjectIcon(project.url)}
                        <h3 className="text-sm font-medium">{project.title}</h3>
                      </div>
                      <div className="flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          project.isOnline ? 'bg-green-500' : 'bg-gray-400'
                        }`}></span>
                        <span className="text-xs opacity-75">
                          {project.isOnline 
                            ? content.status.online 
                            : content.status.offline}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed opacity-80">
                      {project.description}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Articles Section */}
          <div className="max-w-2xl mx-auto pt-12">
            <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {content.articles.title}
            </h2>
            <div className="space-y-4 md:space-y-6">
              {content.articles.items.map((article, index) => (
                <article
                  key={index}
                  className={`p-4 md:p-6 rounded-lg transition-shadow ${
                    isDark
                      ? 'bg-gray-800 hover:bg-gray-700'
                      : 'bg-white hover:shadow-md'
                  }`}
                >
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {getArticleIcon()}
                      <h3 className="text-lg md:text-xl font-medium">{article.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed opacity-80">
                      {article.description}
                    </p>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
