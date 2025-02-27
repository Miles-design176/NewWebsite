
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface FlashcardDeck {
  id: string;
  name: string;
  description: string;
  cardCount: number;
}

const FlashcardSelection: React.FC = () => {
  const navigate = useNavigate();
  
  // State for dark mode with localStorage persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme === 'true';
  });

  // Toggle dark mode function with localStorage saving
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  // Effect to apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Sample flashcard decks
  const flashcardDecks: FlashcardDeck[] = [
    {
      id: 'all',
      name: 'All Flashcards',
      description: 'Review all available flashcards across all topics.',
      cardCount: 30
    },
    {
      id: 'Biology',
      name: 'Biology',
      description: 'Flashcards covering cell biology, DNA, reproduction, and other key biological concepts.',
      cardCount: 20
    },
    {
      id: 'Chemistry',
      name: 'Chemistry',
      description: 'Chemistry concepts including matter, atoms, periodic table, and chemical bonding.',
      cardCount: 10
    }
  ];

  // Navigation functions
  const navigateToStudy = () => {
    navigate('/studypage');
  };
  
  const navigateToQuiz = () => {
    navigate('/quiz-selection');
  };
  
  const startFlashcards = (deckId: string) => {
    if (deckId === 'all') {
      navigate('/flashcards');
    } else {
      navigate(`/flashcards?category=${deckId}`);
    }
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Flashcard Decks</h1>
          
          <div className="flex space-x-4 items-center">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            {/* Navigation Buttons */}
            <button 
              onClick={navigateToStudy}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center ${darkMode ? 'text-gray-200' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              Study Notes
            </button>
            <button 
              onClick={navigateToQuiz}
              className={`bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center ${darkMode ? 'text-gray-200' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Quiz
            </button>
          </div>
        </div>
        
        {/* Flashcard Decks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcardDecks.map(deck => (
            <div 
              key={deck.id} 
              className={`rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              onClick={() => startFlashcards(deck.id)}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {deck.name}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    darkMode ? 'bg-gray-700 text-green-400' : 'bg-green-100 text-green-800'
                  }`}>
                    {deck.cardCount} {deck.cardCount === 1 ? 'card' : 'cards'}
                  </span>
                </div>
                <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {deck.description}
                </p>
                <button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    <path d="M10 10a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  Start Flashcards
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashcardSelection;
