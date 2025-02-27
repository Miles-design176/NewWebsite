import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BestWebsite from './components/BestWebsite';
import InfoPage from './components/InfoPage';
import StudyPage from'./components/StudyPage';
import FlashcardSelection from './components/FlashcardSelection';
import FlashCards from './components/FlashCards';
import QuizSelection from './components/QuizSelection';
import Quiz from './components/Quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BestWebsite />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/StudyPage" element={<StudyPage />} />
        <Route path="/flashcards-selection" element={<FlashcardSelection />} />
        <Route path="/flashcards" element={<FlashCards />} />
        <Route path="/quiz-selection" element={<QuizSelection />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/:noteId" element={<Quiz />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
