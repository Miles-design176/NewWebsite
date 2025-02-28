import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudyStats = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme === 'true';
  });

  // Apply dark mode class to document body when component mounts or darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  // Load stats from localStorage or initialize with empty values
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem('flashcardStats');
    return savedStats ? JSON.parse(savedStats) : {
      totalStudied: 0,
      cardsFlipped: 0,
      quizQuestions: 0,
      correctAnswers: 0,
      categoriesStudied: {},
      studyDates: [],
      streak: 0
    };
  });

  // Calculate some derived stats
  const categoriesArray = Object.entries(stats.categoriesStudied || {})
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  // Calculate daily streak
  const lastStudied = stats.studyDates && stats.studyDates.length > 0 
    ? new Date(stats.studyDates[stats.studyDates.length - 1]) 
    : null;
  
  const daysSinceLastStudy = lastStudied 
    ? Math.floor((new Date() - lastStudied) / (1000 * 60 * 60 * 24)) 
    : null;
    
  // Calculate quiz accuracy if available
  const quizAccuracy = stats.quizQuestions && stats.quizQuestions > 0
    ? Math.round((stats.correctAnswers / stats.quizQuestions) * 100)
    : 0;

  return (
    <div className={`min-h-screen p-4 md:p-8 ${darkMode ? 'dark-mode bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Study Statistics</h1>
          <div className="flex items-center gap-2">
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
            <button 
              onClick={() => navigate('/studypage')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Home
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Items Studied */}
          <div className={darkMode ? 'bg-gray-800 text-white rounded-lg shadow-lg p-6' : 'bg-white text-gray-800 rounded-lg shadow-lg p-6'}>
            <h2 className="text-xl font-bold mb-2">Total Items Studied</h2>
            <p className="text-4xl font-bold text-blue-600">{stats.totalStudied}</p>
            <p className={`text-sm mt-2 ${darkMode ? 'opacity-70' : 'text-gray-600'}`}>Combined flashcards and quiz questions</p>
          </div>
          
          {/* Cards Flipped / Quiz Stats */}
          <div className={darkMode ? 'bg-gray-800 text-white rounded-lg shadow-lg p-6' : 'bg-white text-gray-800 rounded-lg shadow-lg p-6'}>
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Cards Flipped</h2>
                <p className="text-3xl font-bold text-green-600">{stats.cardsFlipped || 0}</p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold mb-2">Quiz Accuracy</h2>
                <p className="text-3xl font-bold text-purple-600">{quizAccuracy}%</p>
              </div>
            </div>
            <p className={`text-sm mt-2 ${darkMode ? 'opacity-70' : 'text-gray-600'}`}>Flashcard reveals & quiz performance</p>
          </div>
          
          {/* Study Streak */}
          <div className={darkMode ? 'bg-gray-800 text-white rounded-lg shadow-lg p-6' : 'bg-white text-gray-800 rounded-lg shadow-lg p-6'}>
            <h2 className="text-xl font-bold mb-2">Study Streak</h2>
            <p className="text-4xl font-bold text-purple-600">{stats.streak} days</p>
            <p className={`text-sm mt-2 ${darkMode ? 'opacity-70' : 'text-gray-600'}`}>
              {daysSinceLastStudy === 0 ? "You've studied today!" : 
               daysSinceLastStudy === 1 ? "Last studied yesterday" :
               lastStudied ? `Last studied ${daysSinceLastStudy} days ago` : 
               "Start studying to build a streak!"}
            </p>
          </div>
        </div>
        
        {/* Quiz Specific Stats */}
        {stats.quizQuestions > 0 && (
          <div className={darkMode ? 'bg-gray-800 text-white rounded-lg shadow-lg p-6 mb-8' : 'bg-white text-gray-800 rounded-lg shadow-lg p-6 mb-8'}>
            <h2 className="text-xl font-bold mb-4">Quiz Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className={`text-sm ${darkMode ? 'opacity-70' : 'text-gray-600'}`}>Questions Answered</p>
                <p className="text-2xl font-bold text-blue-600">{stats.quizQuestions || 0}</p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'opacity-70' : 'text-gray-600'}`}>Correct Answers</p>
                <p className="text-2xl font-bold text-green-600">{stats.correctAnswers || 0}</p>
              </div>
              <div className="md:col-span-2">
                <p className={`text-sm ${darkMode ? 'opacity-70' : 'text-gray-600'} mb-2`}>Accuracy Rate</p>
                <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full h-2.5`}>
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${quizAccuracy}%` }}
                  ></div>
                </div>
                <p className="text-right text-sm mt-1">{quizAccuracy}%</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Categories Stats */}
        <div className={darkMode ? 'bg-gray-800 text-white rounded-lg shadow-lg p-6 mb-8' : 'bg-white text-gray-800 rounded-lg shadow-lg p-6 mb-8'}>
          <h2 className="text-xl font-bold mb-4">Categories Studied</h2>
          
          {categoriesArray.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoriesArray.map(({ category, count }) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="font-medium">{category}</span>
                  <div className="flex items-center">
                    <div className={`w-32 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full h-2.5 mr-2`}>
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${Math.min(100, (count / stats.totalStudied) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No category data available yet</p>
          )}
        </div>
        
        {/* Activity Calendar */}
        {stats.studyDates && stats.studyDates.length > 0 && (
          <div className={darkMode ? 'bg-gray-800 text-white rounded-lg shadow-lg p-6 mb-8' : 'bg-white text-gray-800 rounded-lg shadow-lg p-6 mb-8'}>
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 30 }).map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - 29 + i);
                const dateStr = date.toISOString().split('T')[0];
                const hasStudied = stats.studyDates.includes(dateStr);
                return (
                  <div 
                    key={i}
                    className={`w-7 h-7 rounded-md flex items-center justify-center text-xs
                      ${hasStudied 
                        ? 'bg-green-500 text-white' 
                        : darkMode 
                          ? 'bg-gray-700 text-gray-400' 
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    title={`${dateStr}: ${hasStudied ? 'Studied' : 'No activity'}`}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Study Tips */}
        <div className={darkMode ? 'bg-gray-800 text-white rounded-lg shadow-lg p-6' : 'bg-white text-gray-800 rounded-lg shadow-lg p-6'}>
          <h2 className="text-xl font-bold mb-4">Study Tips</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Study regularly to build knowledge over time</li>
            <li>Review difficult cards more frequently</li>
            <li>Try to recall before flipping the card</li>
            <li>Study different categories to broaden knowledge</li>
            <li>Take short breaks between study sessions</li>
            <li>Test yourself with quizzes after reviewing flashcards</li>
            <li>Explain concepts in your own words to reinforce learning</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudyStats;