import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import { UseTransitionDemo } from './pages/UseTransitionDemo';
import { UseActionStateDemo } from './pages/UseActionStateDemo/UseActionStateDemo';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigation />} />
          <Route path="/use-transition" element={<UseTransitionDemo />} />
          <Route path="/use-action-state" element={<UseActionStateDemo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;