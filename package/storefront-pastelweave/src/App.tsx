import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import CollectionPage from './Pages/Collections'; // This will handle /collections/:slug

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/:slug" element={<CollectionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
