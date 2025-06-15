
import React, { useState } from 'react';
import { Veo3PromptGenerator } from './components/Veo3PromptGenerator';
import { ImageToPromptGenerator } from './components/ImageToPromptGenerator';
import { PromptToImageGenerator } from './components/PromptToImageGenerator';
import { Footer } from './components/Footer';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Veo3);

  const renderActiveTab = () => {
    switch (activeTab) {
      case Tab.Veo3:
        return <Veo3PromptGenerator />;
      case Tab.ImageToPrompt:
        return <ImageToPromptGenerator />;
      case Tab.PromptToImage:
        return <PromptToImageGenerator />;
      default:
        return <Veo3PromptGenerator />;
    }
  };

  const getTabClass = (tabName: Tab) => {
    return `py-3 px-6 rounded-t-lg cursor-pointer transition-all duration-300 ease-in-out text-sm sm:text-base font-medium focus:outline-none ${
      activeTab === tabName
        ? 'bg-white/20 backdrop-blur-sm text-sky-100 border-b-2 border-sky-300'
        : 'bg-white/5 hover:bg-white/10 text-sky-200 hover:text-sky-100'
    }`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 pt-8 sm:p-6">
      <main className="w-full max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-300">
            AI Prompt Studio
          </h1>
          <p className="mt-2 text-sky-200 text-sm sm:text-base">
            Craft perfect prompts for Veo 3, images from text, and text from images.
          </p>
        </header>

        <div className="mb-6 sm:mb-8 border-b border-sky-500/30 flex justify-center space-x-1 sm:space-x-2">
          <button onClick={() => setActiveTab(Tab.Veo3)} className={getTabClass(Tab.Veo3)}>
            Veo 3 Prompt
          </button>
          <button onClick={() => setActiveTab(Tab.ImageToPrompt)} className={getTabClass(Tab.ImageToPrompt)}>
            Image to Prompt
          </button>
          <button onClick={() => setActiveTab(Tab.PromptToImage)} className={getTabClass(Tab.PromptToImage)}>
            Image Prompt Gen
          </button>
        </div>

        <div className="w-full">
          {renderActiveTab()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
    