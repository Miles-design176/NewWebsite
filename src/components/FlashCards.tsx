import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Flashcard {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

const FlashcardComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = window.location;
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Get saved theme from localStorage, default to false (light mode) if not found
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme === 'true';
  });

  // Sample flashcard data and decks
  const flashcards: Flashcard[] = [
    {
      id: '1',
      title: 'DNA Structure',
      content: 'The materials that make up the sides and the steps of the ladder are alternating sugar and phosphate. An example of a DNA sequence with 4 base pairs are Adenine, Thymine, Guanine, and Cytosine.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '2',
      title: 'Chromatin and DNA',
      content: 'Chromatin is a substance that contains DNA and proteins and it exists in the nucleus as chromatin. Chromatin is a singular strand of DNA.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '3',
      title: 'Chromosome',
      content: 'A chromosome is DNA coiled around a protein. It usually is in an X shape.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '4',
      title: 'Nuclear Membrane Function',
      content: 'The function of a nuclear membrane is to separate the chromatin from the cytoplasm in the cell. It also contains the spindle fibers.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '5',
      title: 'Genes',
      content: 'Genes are the arrangement of bases in DNA that make up a sequence. Depending on the sequence, it will code for different traits.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '6',
      title: 'DNA',
      content: 'DNA is Deoxyribonucleic Acid, it is the \'code\' of a cell.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '7',
      title: 'RNA',
      content: 'RNA is Ribonucleic Acid. Its role is to act as a messenger carrying instruction from DNA for controlling the synthesis of proteins.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '8',
      title: 'Golgi Body',
      content: 'The purpose of the Golgi body is to help process and package protein and lipid molecules, especially proteins destined to be exported from the cell.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '9',
      title: 'Vesicles',
      content: 'Vesicles can help transport materials that an organism needs to survive and recycle waste materials.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '10',
      title: 'Nuclear Pores',
      content: 'Nuclear pores allow small molecules and ions to freely pass, or diffuse, into or out of the nucleus.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '11',
      title: 'Ribosome',
      content: 'The Ribosome is responsible for making proteins based on RNA.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '12',
      title: 'Endoplasmic Reticulum',
      content: 'The purpose of the ER (Endoplasmic Reticulum) is to produce proteins for the rest of the cell to function.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '13',
      title: 'Cell Membrane',
      content: 'Cell membrane provides protection for a cell, and is necessary to complete cell separation.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '14',
      title: 'Mutation Effects',
      content: 'Three different effects of mutations are: Deletion (when a base is missing from the strand), Addition/Insertion (when an extra base is added to a strand), and Substitution (when a base is replaced with a different one).',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '15',
      title: 'Cell Reproduction Purpose',
      content: 'The body cells must be able to reproduce so that cells that die are able to repair/heal themselves. It also is required for reproduction of offspring.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '16',
      title: 'Interphase',
      content: 'Interphase is important for cell reproduction because it is the time during which both cell growth and DNA replication occur in an orderly manner in preparation for cell division.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '17',
      title: 'Mitosis',
      content: 'Mitosis is important for cell reproduction because it is how the contents of the nucleus (chromosomes) are replicated. There are 4 different checkpoints in Mitosis: Prophase, Metaphase, Anaphase, and Telophase.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '18',
      title: 'Cytokinesis',
      content: 'Cytokinesis is important for cell reproduction because its job is to separate the cell in half and ensure that one nucleus ends up in each daughter cell.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '19',
      title: 'Cell Reproduction Control',
      content: 'Cell reproduction is controlled by the nucleus. There are three checkpoints that check to make sure the parent cell\'s DNA is copied to the daughter cell. The daughter cell will not divide if there are not enough nutrients, DNA is not replicated, or if DNA is damaged.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '20',
      title: 'Visible Nucleus Stage',
      content: 'The stage of the cell cycle where the nucleus is always visible is Anaphase.',
      category: 'Biology',
      createdAt: 'Feb 27, 2025'
    },
    {
      id: '1',
      title: 'What is matter?',
      content: 'Matter is anything that takes up volume and has mass. It can be described by its physical and chemical properties and is found in states such as solid, liquid, and gas.',
      category: 'Chemistry',
      createdAt: '2024-10-26'
    },
    {
      id: '2',
      title: 'What is a pure substance?',
      content: 'A pure substance is matter that contains only one type of molecule and cannot be separated by physical means. Pure substances can be elements or compounds.',
      category: 'Chemistry',
      createdAt: '2024-10-26'
    },
    {
      id: '3',
      title: 'What is the difference between homogeneous and heterogeneous mixtures?',
      content: 'Homogeneous mixtures are mixed uniformly throughout and you cannot see their components (e.g., hot chocolate). Heterogeneous mixtures are not mixed uniformly and you can visibly see the different components (e.g., peas mixed with water).',
      category: 'Chemistry',
      createdAt: '2024-10-26'
    },
    {
      id: '4',
      title: 'What is the difference between chemical and physical changes?',
      content: 'Chemical changes cause matter to change and produce one or more new types of matter. They may involve smells, light, gas release, or heat transfer. Physical changes alter a substance without changing its chemical identity or composition.',
      category: 'Chemistry',
      createdAt: '2024-10-26'
    },
    {
      id: '5',
      title: 'What are the maximum number of electrons in the first three electron shells?',
      content: 'First shell: maximum of 2 electrons. Second and third shells: maximum of 8 electrons each. Fourth and fifth shells: maximum of 18 electrons each.',
      category: 'Chemistry',
      createdAt: '2024-10-26'
    },
    {
      id: '6',
      title: 'What are valence electrons?',
      content: 'Valence electrons are the electrons on the outermost shell of an atom. They determine the chemical properties of the atom and its bonding behavior.',
      category: 'Chemistry',
      createdAt: '2024-10-26'
    },
    {
      id: '7',
      title: 'What is the difference between an atom and an ion?',
      content: 'An atom has the same number of protons and electrons, giving it a neutral charge. An ion has different numbers of protons and electrons, giving it a positive or negative charge.',
      category: 'Chemistry',
      createdAt: '2024-10-26'
    },
    {
      id: '8',
      title: 'What is the difference between ionic and covalent bonds?',
      content: 'In ionic bonds, one atom donates electrons to another atom. In covalent bonds, two atoms share electrons.',
      category: 'Chemistry',
      createdAt: '2024-10-26'
    },
    {
      id: '9',
      title: 'What is a polyatomic ion?',
      content: 'A polyatomic ion is an ion that contains more than one atom, compared to a monoatomic ion which contains only one atom. Examples of polyatomic ions include NO3-, CO32-, and SO42-.',
      category: 'Chemistry',
      createdAt: '2024-10-26'
    },
    {
      id: '10',
      title: 'What is a chemical formula?',
      content: 'A chemical formula tells you the number of atoms of each element in a compound and which atoms are present.',
      category: 'Chemistry',
      createdAt: '2024-10-26'
    },
  ]

  // Filter cards based on selected category
  const filteredCards = selectedCategory === 'All' 
    ? flashcards 
    : flashcards.filter(card => card.category === selectedCategory);

  // Handle card navigation
  const nextCard = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setFlipped(false);
    }
  };

  // Reset current card index when filters change
  useEffect(() => {
    setCurrentCardIndex(0);
    setFlipped(false);
  }, [selectedCategory]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  // Apply dark mode to body when darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(flashcards.map(card => card.category)))];

  // Go back to flashcard selection page
  const handleBackClick = () => {
    navigate('/flashcards-selection');
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Study Notes</h1>
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
              onClick={handleBackClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Study Page
            </button>
          </div>
        </div>

        {/* Card display - larger on desktop */}
        {filteredCards.length > 0 ? (
          <div className="w-full">
            <div 
              className={`rounded-lg shadow-lg overflow-hidden transition-all duration-500 transform cursor-pointer mx-auto max-w-4xl h-80 md:h-[28rem] ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } ${
                flipped ? 'rotate-y-180' : ''
              }`}
              onClick={() => setFlipped(!flipped)}
            >
              <div className={`relative w-full h-full transition-all duration-500 ${
                flipped ? 'hidden' : 'block'
              }`}>
                <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-lg ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}>
                  <span className="font-medium">{filteredCards[currentCardIndex].category}</span>
                </div>
                
                <div className="px-10 py-12 flex flex-col justify-between h-full">
                  <div>
                    <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {filteredCards[currentCardIndex].title}
                    </h2>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Created on {filteredCards[currentCardIndex].createdAt}
                    </p>
                  </div>
                  <div className={`${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  } text-base mt-4`}>
                    <span className="flex items-center">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                      </svg>
                      Tap to reveal content
                    </span>
                  </div>
                </div>
              </div>
              
              <div className={`px-10 py-12 w-full h-full ${
                flipped ? 'block' : 'hidden'
              } ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <p className={`text-lg leading-relaxed whitespace-pre-line ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {filteredCards[currentCardIndex].content}
                </p>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between mt-8 px-4">
              <button 
                onClick={prevCard}
                disabled={currentCardIndex === 0}
                className={`px-6 py-2 rounded-lg font-medium ${
                  currentCardIndex === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Previous
                </div>
              </button>
              <span className={`self-center font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {currentCardIndex + 1} of {filteredCards.length}
              </span>
              <button 
                onClick={nextCard}
                disabled={currentCardIndex === filteredCards.length - 1}
                className={`px-6 py-2 rounded-lg font-medium ${
                  currentCardIndex === filteredCards.length - 1 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <div className="flex items-center">
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className={`text-center py-16 rounded-lg shadow-lg ${
            darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'
          }`}>
            <p className="text-xl font-medium">No flashcards found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardComponent;