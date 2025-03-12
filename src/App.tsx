import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StudyPage from'./components/StudyPage';
import FlashcardSelection from './components/FlashcardSelection';
import FlashCards from './components/FlashCards';
import QuizSelection from './components/QuizSelection';
import Quiz from './components/Quiz';
import StudyStats from './StudyStats';
import NotFound from './components/NotFound';
import FastFoodNutrition from "./components/FastFoodNutrition";
import FAQ from "./components/FAQ";
import Home from "./components/Home";
import Login from "./components/login";
import SignUp from "./components/signup";
import ForgotPassword from "./components/forgot-password";
import Info from "./components/Info";

function App() {
  return (
    <Router>
      <Analytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/StudyPage" element={<StudyPage />} />
        <Route path="/flashcards-selection" element={<FlashcardSelection />} />
        <Route path="/flashcards" element={<FlashCards />} />
        <Route path="/quiz-selection" element={<QuizSelection />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/:noteId" element={<Quiz />} />
        <Route path="/stats" element={<StudyStats />} />
        <Route path="*" element={<NotFound />} />
        <Route path="Nutrition" element={<FastFoodNutrition />} />
        <Route path="FAQ" element={<FAQ />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
