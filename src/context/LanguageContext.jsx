// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  const translations = {
    fr: {
      chat: {
        title: "Chat In",
        subtitle: "Questionne ma vie professionnelle",
        placeholder: "Posez-moi une question...",
        clearHistory: "Effacer l'historique",
        minimize: "Réduire",
        close: "Fermer",
        suggestions: {
          services: "Quels services proposez-vous ?",
          experience: "Pouvez-vous me parler de vos expériences professionnelles ?",
          projects: "Quels sont vos projets les plus récents ?",
          skills: "Quelles sont vos compétences techniques ?",
          availability: "Êtes-vous disponible pour une mission freelance ?",
        },
        errors: {
          failed: "Une erreur s'est produite",
          loadHistory: "Impossible de charger l'historique",
        },
      },
      portfolio: {
        title: 'Mathieu Duverne',
        headline: 'Ingénieur Logiciel',
        location: 'Marseille, France',
        status: {
          online: 'En ligne',
          offline: 'En développement'
        },
        projects: {
          title: 'Projets',
          items: [
            {
              title: 'Instant Sport',
              description: 'Carte dynamique regroupant tous les équipements sportifs en France',
              isOnline: true,
              url: 'https://instant-sport.everyappswhere.me/'
            },
            {
              title: 'Quiz App',
              description: 'Application web éducative innovante générant des quiz à partir de transcription de vos video youtube',
              isOnline: true,
              url: 'https://quiz.everyappswhere.me/'
            },
            {
              title: 'Club du top 20 Aix-Marseille',
              description: 'Vitrine d\'une organisation regroupant les dirigeants des plus grandes entreprises de la Métropole Aix-Marseille Provence',
              isOnline: true,
              url: 'https://clubtop20.com/'
            }
          ]
        },
        articles: {
          title: 'Articles',
          items: [
            {
              title: 'Microplastic detection',
              description: 'Vision par Ordinateur, spécialisé dans la détection d\'objets et l\'analyse environnementale',
              url: 'https://medium.com/@mat.duverne/microplastic-detection-d341fa4bd96e'
            },
            {
              title: 'Record motion detection',
              description: 'Système de surveillance intelligent utilisant Raspberry Pi et vision par ordinateur',
              url: 'https://medium.com/@mat.duverne/record-motion-detection-dfb5e587e8cb'
            },
            {
              title: 'Predicting the price of a used car',
              description: 'Développement d\'un modèle de prédiction de prix pour le marché automobile d\'occasion',
              url: 'https://medium.com/@mat.duverne/predicting-the-price-of-a-used-car-c9318fa53c49'
            }
          ]
        },
        cv: {
          title: 'cv',
        },
      }
    },
    en: {
      chat: {
        title: "Chat In",
        subtitle: "Ask about my professional journey",
        placeholder: "Ask me a question...",
        clearHistory: "Clear History",
        minimize: "Minimize",
        close: "Close",
        suggestions: {
          services: "What services do you offer?",
          experience: "Can you tell me about your professional experience?",
          projects: "What are your most recent projects?",
          skills: "What are your technical skills?",
          availability: "Are you available for freelance work?",
        },
        errors: {
          failed: "An error occurred",
          loadHistory: "Failed to load history",
        },
      },
      portfolio: {
        title: 'Mathieu Duverne',
        headline: 'Software Engineer',
        location: 'Marseille, France',
        status: {
          online: 'Online',
          offline: 'In Development'
        },
        projects: {
          title: 'Projects',
          items: [
            {
              title: 'Instant Sport',
              description: 'Dynamic map gathering all sports facilities in France',
              isOnline: true,
              url: 'https://instant-sport.everyappswhere.me/'
            },
            {
              title: 'Quiz App',
              description: 'Innovative educational web application generating quizzes from your YouTube video transcriptions',
              isOnline: true,
              url: 'https://quiz.everyappswhere.me/'
            },
            {
              title: 'Club du top 20 Aix-Marseille',
              description: 'Showcase website for an organization bringing together leaders of the largest companies in the Aix-Marseille Provence Metropolitan area',
              isOnline: true,
              url: 'https://clubtop20.com/'
            }
          ]
        },
        articles: {
          title: 'Articles',
          items: [
            {
              title: 'Microplastic detection',
              description: 'Computer Vision, specialized in object detection and environmental analysis',
              url: 'https://medium.com/@mat.duverne/microplastic-detection-d341fa4bd96e'
            },
            {
              title: 'Record motion detection',
              description: 'Intelligent surveillance system using Raspberry Pi and computer vision',
              url: 'https://medium.com/@mat.duverne/record-motion-detection-dfb5e587e8cb'
            },
            {
              title: 'Predicting the price of a used car',
              description: 'Development of a price prediction model for the used car market',
              url: 'https://medium.com/@mat.duverne/predicting-the-price-of-a-used-car-c9318fa53c49'
            }
          ]
        },
        cv: {
          title: 'Resume',
        },
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language,                    // Ajout de la langue actuelle
      toggleLanguage, 
      translations: translations[language] 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
