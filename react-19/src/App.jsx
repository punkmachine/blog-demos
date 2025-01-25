import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';

import { UseActionStateDemo } from './pages/UseActionStateDemo/UseActionStateDemo';
import { UseFormStatusDemo } from './pages/useFormStatus/UseFormStatus';
import { UseOptimisticDemo } from './pages/UseOptimistic/UseOptimistic';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigation />} />
          <Route path="/use-action-state" element={<UseActionStateDemo />} />
          <Route path="/use-form-status" element={<UseFormStatusDemo />} />
          <Route path="/use-optimistic" element={<UseOptimisticDemo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;