import React from 'react';
import CreativePortfolioChat from "./components/CreativePortfolioChat";
import Portfolio from "./components/Portfolio";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <div className="relative">
        <Portfolio />
        <div className="fixed bottom-0 right-0 z-50">
          {/* <CreativePortfolioChat /> */}
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
