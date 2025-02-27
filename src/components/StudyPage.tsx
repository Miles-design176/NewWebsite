import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './darkMode.css'; // Import the dark mode CSS

// Define types
export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt?: Date;
}

export interface StudyPageProps {
  initialNotes?: Note[];
  onNoteSelect?: (note: Note) => void;
  onCategoryChange?: (category: string | null) => void;
  onUpdateNotes?: (notes: Note[]) => void; // Added prop for handling note updates
}

/**
 * StudyPage component for displaying and interacting with study notes
 * @param {StudyPageProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const StudyPage: React.FC<StudyPageProps> = ({ 
  initialNotes,
  onNoteSelect,
  onCategoryChange,
  onUpdateNotes
}) => {
  // Router navigation hook
  const navigate = useNavigate();

  // Sample notes data or use provided initialNotes
  const [notes] = useState<Note[]>(initialNotes || [
          {
            id: '1',
            title: 'Biology Unit Exam Review',
            content: `The materials that make up the sides and the steps of the ladder are alternating sugar and phosphate. An example of a DNA sequence with 4 base pairs are Adenine, Thymine, Guanine, and Cytosine.

      The relationship between chromatin and DNA is chromatin is a substance that contains DNA and proteins and it exists in the nucleus as chromatin. Chromatin is a singular strand of DNA.

      A chromosome is DNA coiled around a protein, It usually is in a X shape.

      The function of a nuclear membrane is to separate the chromatin from the cytoplasm in the cell. It also contains the spindle fibers.

      Genes is the arrangement of bases in DNA makes up a sequence. Depending on the sequence, it will code for different traits.

      DNA is Deoxyribonucleic Acid, it is the ‘code’ of a cell.

      RNA is Ribonucleic Acid, its role is to act as a messenger carrying instruction from DNA for controlling the synthesis of proteins.

      The purpose of the Golgi body is to help process and package protein and lipid molecules, especially proteins destined to be exported from the cell.

      Vesicles can help transport materials that an organism needs to survive and recycle waste materials.

      Nuclear pores allow small molecules and ions to freely pass, or diffuse, into or out of the nucleus.

      The Ribosome is responsible for making proteins based on RNA.

      The purpose of the ER (Endoplasmic Reticulum) is to produce proteins for the rest of the cell to function.

      Cell membrane provides protection for a cell, and is necessary to complete cell separation.

      Mutations include Deletion (missing base), Addition/Insertion (extra base), and Substitution (replaced base).

      The body cells must be able to reproduce so that cells that die are able to repair/heal themselves. It is also required for reproduction of offspring.

      Interphase is important for cell reproduction because it is the time during which both cell growth and DNA replication occur in an orderly manner in preparation for cell division.

      Mitosis is important for cell reproduction because it is how the contents of the nucleus (chromosomes) are replicated. There are 4 different checkpoints in Mitosis: Prophase, Metaphase, Anaphase, and Telophase.

      Cytokinesis is important for cell reproduction because its job is to separate the cell in half and ensure that one nucleus ends up in each daughter cell.

      Cell reproduction is controlled by the nucleus. There are three checkpoints that check to make sure the parent cell's DNA is copied to the daughter cell. The daughter cell will not divide if there are not enough nutrients, DNA is not replicated, or if DNA is damaged.

      The stage of the cell cycle where the nucleus is always visible is Anaphase.

      The phase the sister chromatids move to the opposite poles of the cell is Anaphase.

      Humans assist plant reproduction through cloning and grafting.

      The benefits of plant grafting include better resistance to pathogens, drought, and other environmental stresses, more vigorous growth, and higher yield.

      Current uses for reproductive cloning are:
      - Conservation: Cloning endangered or extinct species to preserve biodiversity.
      - Agriculture: Producing genetically identical animals with desirable traits, such as high milk production.
      - Medical Research: Creating cloned animals to study diseases and develop treatments.
      - Therapeutic Cloning: Generating tissues or organs for transplantation.

      The purpose of Meiosis is to produce gametes (sperm and egg cells). It results in four genetically unique haploid cells.

      Mitosis produces two genetically identical daughter cells from a single parent cell, whereas Meiosis produces cells that are genetically unique and contain only half as much DNA.

      Meiosis I separates homologous chromosomes and reduces the chromosome number by half and includes crossing over. Meiosis II separates sister chromatids, maintains the chromosome number, and resembles Mitosis.

      Homologous chromosomes are pairs of chromosomes, one from each parent, that have the same genes in the same order but may have different alleles.

      The stage that homologous chromosomes separate is Anaphase I of Meiosis.

      Differences in gamete formation:
      - Sperm: Made continuously in males after puberty, one cell makes four sperm.
      - Egg: Made before birth in females and released one at a time, one cell makes one egg and 3 small unused cells called polar bodies.

      Differences in gamete appearance:
      - Sperm: Tiny, has a tail to swim, shaped like a tadpole.
      - Egg: Big, round, does not move, and has nutrients to support early development.

      Gene mutations affect a single gene, while chromosome mutations affect entire chromosomes. Example: Down Syndrome.

      Animals aid plant reproduction through:
      - Pollen Transport: Example - Hummingbirds transfer pollen while feeding on nectar.
      - Seed Transport: Animals eat fruits containing seeds, then excrete seeds in a different location.

      Fertilization types:
      - External Fertilization: Sperm and egg combine outside the bodies of the parents.
      - Internal Fertilization: Sperm and egg combine inside the body of the parent and the zygote develops inside.

      Stem cells are undifferentiated cells found in bone marrow capable of developing into various cell types.

      Embryonic development occurs in the first two months after fertilization. The zygote undergoes mitosis and rapid cell divisions.
      - After 1 week, the zygote develops into a morula.
      - After 2 weeks, a hollow ball of cells called a blastula forms.
      - The gastrula stage consists of three layers: Ectoderm, Mesoderm, and Endoderm.`,
            category: 'Biology',
            createdAt: new Date('2025-02-26')
          },
            {
              id: '2',
              title: 'Chemistry 9 Notes',
              content: `Matter is anything that takes up volume and has mass. It can be described by its physical and chemical properties. 
        It exists in states such as solid, liquid, and gas.
        
        Matter can be classified as either a pure substance or a mixture.
        - Pure Substance: Contains only one type of molecule and cannot be separated by physical means.
          - Example: All elements.
          - Elements contain only one type of atom and cannot be changed into anything else. Example: Sulfur.
          - Compounds contain two or more types of atoms but cannot be separated by physical means. Example: Water.
        - Mixture: Contains a blend of two or more pure substances that can be separated by physical means.
          - Homogeneous Mixtures: Mixed uniformly, appearing as one substance. Example: Hot chocolate.
          - Heterogeneous Mixtures: Not mixed uniformly, different components are visible. Example: Peas in water.
        
        Chemical vs. Physical Change:
        - Chemical changes cause matter to change and produce one or more new substances. Indications include:
          - Smell production, light emission, gas release, heat change.
        - Physical changes alter a substance without changing its composition. Examples:
          - Crumpling aluminum foil, freezing/boiling water, ice melting.
        
        Particle Theory:
        - All matter is made up of small particles in constant motion.
        - More energy causes particles to move faster and farther apart.
        - Solids expand when heated due to increased kinetic energy.
        - Liquids expand more than solids as particles move more freely.
        - Gases expand indefinitely but are limited by their container.
        
        Physical vs. Chemical Properties:
        - Physical properties can be observed without changing a substance's identity.
        - Chemical properties describe a substance’s ability to react with another substance. Examples:
          - Flammability, toxicity, acidity, reactivity.
        
        Periodic Table:
        - Vertical columns are groups/families; elements in the same group have the same number of valence electrons.
        - Horizontal rows increase in valence electrons from left to right.
        - Important groups: 
          - Alkali metals (Group 1), Alkaline earth metals (Group 2), Halogens (Group 17), Noble gases (Group 18).
        
        Atomic Structure (Bohr Model):
        - First shell holds up to 2 electrons, second and third up to 8, fourth and fifth up to 18.
        - Valence electrons are found in the outermost shell.
        
        Definitions:
        - Atom: The smallest unit of a substance that retains its chemical identity.
        - Nucleus: Central part of an atom containing protons and neutrons.
        - Proton: Positively charged particle in the nucleus determining the element.
        - Neutron: Neutral particle in the nucleus with mass similar to a proton.
        - Electron: Negatively charged particle with much smaller mass than protons or neutrons, surrounds the nucleus.
        
        Atoms vs. Ions:
        - Atoms have equal protons and electrons, making them neutral.
        - Ions form when atoms gain or lose electrons to become stable.
        
        Chemical Bonds:
        - Ionic bonds: One atom donates electrons to another.
        - Covalent bonds: Atoms share electrons.
        
        Polyatomic vs. Monatomic Ions:
        - Monatomic ion: Single atom with a charge (e.g., Na+, Cl-).
        - Polyatomic ion: Multiple atoms bonded together with a charge (e.g., NO3-, CO32-).
        
        Chemical Equations:
        - Reactants: Substances at the start of a reaction.
        - Products: Substances formed from a reaction.
        - Example: 
          - Zinc + sulfur → zinc sulfide (Zinc and sulfur are reactants; zinc sulfide is the product).
          - Calcium carbonate → calcium oxide + carbon dioxide (Calcium carbonate is the reactant; calcium oxide and carbon dioxide are products).`,
              category: 'Chemistry',
              createdAt: new Date('2025-02-26')
            }
  ]);

  // State for the currently selected note
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  
  // State for active category filter
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

  // Get unique categories from notes
  const categories: string[] = Array.from(new Set(notes.map(note => note.category)));

  // Filter notes by category if a category is selected
  const filteredNotes: Note[] = activeCategory 
    ? notes.filter(note => note.category === activeCategory) 
    : notes;

  // Handle note selection - converted to useCallback to be used in dependencies
  const handleNoteSelect = useCallback((note: Note): void => {
    setSelectedNote(note);
    if (onNoteSelect) {
      onNoteSelect(note);
    }
  }, [onNoteSelect]);

  // Handle category change
  const handleCategoryChange = (category: string | null): void => {
    setActiveCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  // Navigation handlers for flashcards and quizzes
  const navigateToFlashcards = (): void => {
    // Navigate to flashcards selection page
    navigate('/flashcards-selection');
  };

  const navigateToQuiz = (): void => {
    // Navigate to quiz selection page
    navigate('/quiz-selection');
  };

  // Example of a function that uses setNotes to fix the unused variable warning
  

  // Effect to select the first note when filtered notes change
  useEffect(() => {
    if (filteredNotes.length > 0 && !selectedNote) {
      handleNoteSelect(filteredNotes[0]);
    } else if (filteredNotes.length > 0 && selectedNote && !filteredNotes.some(note => note.id === selectedNote.id)) {
      // If the currently selected note is no longer in the filtered list, select the first filtered note
      handleNoteSelect(filteredNotes[0]);
    }
  }, [filteredNotes, selectedNote, handleNoteSelect]); // Added handleNoteSelect to dependencies

  // Function to format date
  const formatDate = (date?: Date): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Study Notes</h1>
          
          {/* Study Tools Buttons */}
          <div className="flex gap-3 items-center">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg mr-2 ${
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
              onClick={navigateToFlashcards}
              className={`bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center ${darkMode ? 'text-gray-200' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                <path d="M10 10a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              Flashcards
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
        
        {/* Category filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button 
            className={`px-4 py-2 rounded-lg font-medium ${
              activeCategory === null 
                ? 'bg-blue-600 text-white' 
                : darkMode 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handleCategoryChange(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button 
              key={category}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : darkMode 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Notes list */}
          <div className="w-full md:w-1/3">
            <div className={`rounded-lg shadow-lg p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Notes ({filteredNotes.length})</h2>
              {filteredNotes.length > 0 ? (
                <div className="space-y-2">
                  {filteredNotes.map(note => (
                    <div 
                      key={note.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                        selectedNote?.id === note.id 
                          ? darkMode ? 'bg-blue-900 border-l-4 border-blue-500' : 'bg-blue-100 border-l-4 border-blue-600' 
                          : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleNoteSelect(note)}
                    >
                      <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{note.title}</h3>
                      <div className="flex justify-between mt-1">
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{note.category}</p>
                        {note.createdAt && (
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{formatDate(note.createdAt)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`p-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No notes found in this category
                </div>
              )}
            </div>
          </div>
          
          {/* Note content */}
          <div className="w-full md:w-2/3">
            <div className={`rounded-lg shadow-lg p-6 min-h-64 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {selectedNote ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{selectedNote.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {selectedNote.category}
                    </span>
                  </div>
                  {selectedNote.createdAt && (
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Created on {formatDate(selectedNote.createdAt)}</p>
                  )}
                  <div className={`border-t my-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
                  <p className={`whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedNote.content}
                  </p>
                  
                  {/* Study Actions for Current Note */}
                  <div className={`mt-6 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex gap-3">
                      <button 
                        onClick={navigateToQuiz}
                        className={`font-medium flex items-center ${
                          darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        Test Knowledge
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`h-full flex items-center justify-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <p>Select a note to view its content</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add action creators for adding/editing/deleting notes
export const addNote = (notes: Note[], newNote: Omit<Note, 'id'>): Note[] => {
  const id = Math.random().toString(36).substring(2, 9);
  return [...notes, { ...newNote, id }];
};

export const updateNote = (notes: Note[], updatedNote: Note): Note[] => {
  return notes.map(note => note.id === updatedNote.id ? updatedNote : note);
};

export const deleteNote = (notes: Note[], noteId: string): Note[] => {
  return notes.filter(note => note.id !== noteId);
};

export default StudyPage;