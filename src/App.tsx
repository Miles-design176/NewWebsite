import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BestWebsite from './components/BestWebsite';
import InfoPage from './components/InfoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BestWebsite />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
