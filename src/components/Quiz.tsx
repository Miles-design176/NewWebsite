import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './darkMode.css';

// Quiz question interface
interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
}

interface QuizPageProps {
  initialQuestions?: QuizQuestion[];
}

const QuizPage: React.FC<QuizPageProps> = ({ initialQuestions }) => {
  const navigate = useNavigate();
  const { noteId } = useParams<{ noteId?: string }>();
  const location = window.location;
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  // Fix category param to match what we have in data
  const fixCategoryParam = () => {
    if (categoryParam === 'react') return 'React';
    if (categoryParam === 'typescript') return 'TypeScript';
    if (categoryParam === 'css') return 'CSS';
    return categoryParam;
  };

  // State for dark mode with localStorage persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Get saved theme from localStorage, default to false (light mode) if not found
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

  // Sample quiz questions
  const [questions] = useState<QuizQuestion[]>(initialQuestions || [
    {
        id: '6',
        question: 'What materials make up the sides and steps of the DNA ladder?',
        options: [
          'Nucleotides and proteins',
          'Alternating sugar and phosphate',
          'RNA and ribosomes',
          'Adenine and thymine only'
        ],
        correctAnswer: 'Alternating sugar and phosphate',
        category: 'Biology'
      },
      {
        id: '7',
        question: 'What is the relationship between chromatin and DNA?',
        options: [
          'Chromatin is produced by DNA during replication',
          'Chromatin is a substance that contains DNA and proteins',
          'DNA is a component of the nuclear membrane, while chromatin is in the cytoplasm',
          'Chromatin controls the expression of DNA through methylation'
        ],
        correctAnswer: 'Chromatin is a substance that contains DNA and proteins',
        category: 'Biology'
      },
      {
        id: '8',
        question: 'What is the function of the nuclear membrane?',
        options: [
          'To produce proteins based on DNA',
          'To separate the chromatin from the cytoplasm in the cell',
          'To transport materials through vesicles',
          'To process and package proteins'
        ],
        correctAnswer: 'To separate the chromatin from the cytoplasm in the cell',
        category: 'Biology'
      },
      {
        id: '9',
        question: 'What is the difference between DNA and RNA?',
        options: [
          'DNA is in the nucleus, RNA is only in the cytoplasm',
          'DNA uses deoxyribose sugar, RNA uses ribose sugar',
          'DNA is the cell code, RNA is a messenger carrying instructions for protein synthesis',
          'DNA is double-stranded, RNA is always circular'
        ],
        correctAnswer: 'DNA is the cell code, RNA is a messenger carrying instructions for protein synthesis',
        category: 'Biology'
      },
      {
        id: '10',
        question: 'What is the purpose of the Golgi body?',
        options: [
          'To make proteins based on RNA',
          'To help process and package proteins and lipids',
          'To produce energy for the cell',
          'To store genetic information'
        ],
        correctAnswer: 'To help process and package proteins and lipids',
        category: 'Biology'
      },
      {
        id: '11',
        question: 'Which of the following is NOT a type of mutation?',
        options: [
          'Deletion',
          'Addition/Insertion',
          'Substitution',
          'Replication'
        ],
        correctAnswer: 'Replication',
        category: 'Biology'
      },
      {
        id: '12',
        question: 'Why is the interphase important for cell reproduction?',
        options: [
          'It is when the cell begins to die',
          'It is when both cell growth and DNA replication occur',
          'It is when the chromosomes split apart',
          'It is when cytokinesis occurs'
        ],
        correctAnswer: 'It is when both cell growth and DNA replication occur',
        category: 'Biology'
      },
      {
        id: '13',
        question: 'What are the four phases of mitosis in order?',
        options: [
          'Metaphase, Anaphase, Prophase, Telophase',
          'Prophase, Metaphase, Anaphase, Telophase',
          'Anaphase, Telophase, Prophase, Metaphase',
          'Prophase, Anaphase, Metaphase, Telophase'
        ],
        correctAnswer: 'Prophase, Metaphase, Anaphase, Telophase',
        category: 'Biology'
      },
      {
        id: '14',
        question: 'What is matter?',
        options: [
          'Anything that has color',
          'Anything that takes up volume and has mass',
          'Substances that are only in solid form',
          'Elements found on the periodic table'
        ],
        correctAnswer: 'Anything that takes up volume and has mass',
        category: 'Chemistry'
      },
      {
        id: '15',
        question: 'What is a pure substance?',
        options: [
          'Matter that contains only one type of molecule',
          'Any element on the periodic table',
          'A mixture that appears uniform',
          'Substances without chemical properties'
        ],
        correctAnswer: 'Matter that contains only one type of molecule',
        category: 'Chemistry'
      },
      {
        id: '16',
        question: 'What is the difference between a chemical change and a physical change?',
        options: [
          'Physical changes alter color, chemical changes alter weight',
          'Chemical changes produce one or more new types of matter, physical changes don\'t change chemical identity',
          'Physical changes are permanent, chemical changes are temporary',
          'There is no difference between them'
        ],
        correctAnswer: 'Chemical changes produce one or more new types of matter, physical changes don\'t change chemical identity',
        category: 'Chemistry'
      },
      {
        id: '17',
        question: 'Which of the following is a chemical property?',
        options: [
          'Melting point',
          'Color',
          'Flammability',
          'Density'
        ],
        correctAnswer: 'Flammability',
        category: 'Chemistry'
      },
      {
        id: '18',
        question: 'What is a vertical column on the periodic table called?',
        options: [
          'Period',
          'Group/Family',
          'Series',
          'Block'
        ],
        correctAnswer: 'Group/Family',
        category: 'Chemistry'
      },
      {
        id: '19',
        question: 'How many electrons can the second electron shell hold?',
        options: [
          '2',
          '8',
          '18',
          '32'
        ],
        correctAnswer: '8',
        category: 'Chemistry'
      },
      {
        id: '20',
        question: 'What is the difference between an atom and an ion?',
        options: [
          'An atom is smaller than an ion',
          'An atom has a neutral charge, an ion has a positive or negative charge',
          'Atoms contain neutrons, ions do not',
          'Atoms are elements, ions are compounds'
        ],
        correctAnswer: 'An atom has a neutral charge, an ion has a positive or negative charge',
        category: 'Chemistry'
      }
    ]);

  // Filter questions by noteId if provided
  const filteredQuestions = noteId 
    ? questions.filter(q => q.id === noteId)
    : questions;

  // States for quiz functionality
  const [activeCategory, setActiveCategory] = useState<string | null>(fixCategoryParam());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  
  // Get unique categories from questions
  const categories: string[] = Array.from(new Set(questions.map(question => question.category)));
  
  // Filter questions by category
  const categoryFilteredQuestions = activeCategory 
    ? filteredQuestions.filter(question => question.category.toLowerCase() === activeCategory.toLowerCase())
    : filteredQuestions;
    
  // Reset quiz state when needed (without category selection UI)
  const resetQuizState = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setQuizComplete(false);
    setScore(0);
  };
  
  // Function to handle option selection
  const handleOptionSelect = (option: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(option);
    }
  };
  
  // Function to submit answer
  const handleSubmitAnswer = () => {
    if (selectedAnswer && !isAnswerSubmitted) {
      setIsAnswerSubmitted(true);
      
      // Check if answer is correct and update score
      if (selectedAnswer === categoryFilteredQuestions[currentQuestionIndex].correctAnswer) {
        setScore(prevScore => prevScore + 1);
      }
    }
  };
  
  // Function to move to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < categoryFilteredQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizComplete(true);
    }
  };
  
  // Function to restart quiz
  const handleRestartQuiz = () => {
    resetQuizState();
  };
  
  // Navigation functions
  const navigateToStudy = () => {
    navigate('/studypage');
  };
  
  const navigateToFlashcards = () => {
    navigate('/flashcards');
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Quiz Page</h1>
          
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
              onClick={navigateToFlashcards}
              className={`bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center ${darkMode ? 'text-gray-200' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                <path d="M10 10a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              Flashcards
            </button>
          </div>
        </div>
        
        {/* Quiz content starts here */}
        
        {/* Quiz Content */}
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : ''}`}>
          {categoryFilteredQuestions.length > 0 ? (
            quizComplete ? (
              <div className="p-8">
                <div className={`text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
                  <p className="text-xl mb-8">Your Score: {score} out of {categoryFilteredQuestions.length}</p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                    <div 
                      className="bg-green-600 h-4 rounded-full" 
                      style={{ width: `${(score / categoryFilteredQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                  
                  <button
                    onClick={handleRestartQuiz}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg"
                  >
                    Restart Quiz
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Question {currentQuestionIndex + 1} of {categoryFilteredQuestions.length}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {categoryFilteredQuestions[currentQuestionIndex].category}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${((currentQuestionIndex) / (categoryFilteredQuestions.length - 1)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-right text-gray-500">
                    {Math.round(((currentQuestionIndex) / (categoryFilteredQuestions.length - 1)) * 100) || 0}% complete
                  </div>
                </div>
                
                <div className={`border-t mb-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
                
                <div className="mb-8">
                  <h3 className={`text-xl font-medium mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    {categoryFilteredQuestions[currentQuestionIndex].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {categoryFilteredQuestions[currentQuestionIndex].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(option)}
                        className={`w-full text-left p-4 rounded-lg border transition-colors duration-200 
                          ${selectedAnswer === option 
                            ? isAnswerSubmitted 
                              ? option === categoryFilteredQuestions[currentQuestionIndex].correctAnswer
                                ? 'bg-green-100 border-green-500 text-green-800'
                                : 'bg-red-100 border-red-500 text-red-800'
                              : 'bg-blue-100 border-blue-500 text-blue-800'
                            : isAnswerSubmitted && option === categoryFilteredQuestions[currentQuestionIndex].correctAnswer
                              ? 'bg-green-100 border-green-500 text-green-800'
                              : darkMode
                                ? 'border-gray-600 text-gray-200 hover:bg-gray-700'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                          }`}
                        disabled={isAnswerSubmitted}
                      >
                        <div className="flex items-center">
                          <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 
                            ${selectedAnswer === option 
                              ? isAnswerSubmitted 
                                ? option === categoryFilteredQuestions[currentQuestionIndex].correctAnswer
                                  ? 'bg-green-500 text-white'
                                  : 'bg-red-500 text-white'
                                : 'bg-blue-500 text-white'
                              : isAnswerSubmitted && option === categoryFilteredQuestions[currentQuestionIndex].correctAnswer
                                ? 'bg-green-500 text-white'
                                : darkMode
                                  ? 'bg-gray-700 text-gray-300'
                                  : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Show correct answer when user selects a wrong answer */}
                {isAnswerSubmitted && selectedAnswer !== categoryFilteredQuestions[currentQuestionIndex].correctAnswer && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                      <span className="font-bold">Correct Answer:</span> {categoryFilteredQuestions[currentQuestionIndex].correctAnswer}
                    </p>
                  </div>
                )}
                
                <div className={`border-t pt-6 flex items-center justify-between ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Score: {score} / {categoryFilteredQuestions.length}
                  </div>
                  
                  <div className="flex gap-4">
                    {!isAnswerSubmitted ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={!selectedAnswer}
                        className={`px-6 py-2 rounded-lg font-medium 
                          ${selectedAnswer 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                            : darkMode
                              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg"
                      >
                        {currentQuestionIndex < categoryFilteredQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className={`p-8 h-64 flex items-center justify-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <p>No questions available for the selected category. Please select a different category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;