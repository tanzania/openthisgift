
import React, { useState } from 'react';
import { THEMES } from '../../constants';
import type { Theme } from '../../types';
import { LinkIcon, ClipboardCheckIcon } from '../icons/UIIcons';

const ThemeSelector: React.FC<{ selectedTheme: string; onSelectTheme: (themeId: string) => void; }> = ({ selectedTheme, onSelectTheme }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
      {THEMES.map((theme) => {
        const isSelected = theme.id === selectedTheme;
        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => onSelectTheme(theme.id)}
            className={`flex flex-col items-center justify-center p-3 border-2 rounded-lg transition-all duration-200 ${
              isSelected ? 'border-indigo-500 bg-indigo-50 scale-105 shadow-lg' : 'border-gray-200 bg-white hover:border-indigo-300'
            }`}
          >
            <theme.icon className="w-8 h-8 mb-2 text-gray-600" />
            <span className="text-xs font-semibold text-gray-700">{theme.name}</span>
          </button>
        );
      })}
    </div>
  );
};

const HomePage: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string>(THEMES[0].id);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName) {
      alert('Please enter your name.');
      return;
    }
    
    const senderSlug = senderName.trim().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^a-z0-9-]/g, ''); // Remove invalid characters

    const params = new URLSearchParams({
      theme: selectedTheme,
    });
    if (receiverName) {
      params.set('to', receiverName);
    }
    
    const url = `${window.location.origin}/from/${senderSlug}?${params.toString()}`;
    setGeneratedUrl(url);
    setIsCopied(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-pacifico">
            🎁 Create a Surprise!
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Make someone smile today — in just 10 seconds!</p>
        </header>

        <main className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleGenerateLink}>
            <div className="space-y-6">
              <div>
                <label htmlFor="senderName" className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="senderName"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g., John Doe"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label htmlFor="receiverName" className="block text-sm font-semibold text-gray-700 mb-1">Receiver's Name (Optional)</label>
                <input
                  type="text"
                  id="receiverName"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  placeholder="e.g., Jane Smith"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Choose a Theme</label>
                <ThemeSelector selectedTheme={selectedTheme} onSelectTheme={setSelectedTheme} />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-transform transform hover:scale-105 duration-300 ease-in-out flex items-center justify-center space-x-2"
              >
                <LinkIcon className="w-5 h-5" />
                <span>Generate Your Link</span>
              </button>
            </div>
          </form>

          {generatedUrl && (
            <div className="mt-8 p-4 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-lg text-center">
              <p className="text-sm font-semibold text-indigo-800 mb-3">Your special link is ready!</p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={generatedUrl}
                  className="w-full bg-white px-3 py-2 border border-indigo-200 rounded-md text-sm text-gray-600 truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className={`w-full sm:w-auto flex-shrink-0 font-semibold py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isCopied ? 'bg-green-500 text-white' : 'bg-indigo-200 text-indigo-800 hover:bg-indigo-300'
                  }`}
                >
                  {isCopied ? <ClipboardCheckIcon className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                  <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
               <p className="text-xs text-gray-500 mt-3">Share this link via WhatsApp, Messenger, or any chat app!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
