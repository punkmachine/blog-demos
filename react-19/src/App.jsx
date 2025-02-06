import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';

import { UseActionStateDemo } from './pages/UseActionStateDemo/UseActionStateDemo';
import { UseFormStatusDemo } from './pages/useFormStatus/UseFormStatus';
import { UseOptimisticDemo } from './pages/UseOptimistic/UseOptimistic';
import { UseFormStatusDemo2 } from './pages/useFormStatusTS/UseFormStatus';
import { UseComponent } from './pages/use/UseComponent';
import { MetaTags } from './pages/metatags/MetaTags';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigation />} />
          <Route path="/use-action-state" element={<UseActionStateDemo />} />
          <Route path="/use-form-status" element={<UseFormStatusDemo />} />
          <Route path="/use-form-status-2" element={<UseFormStatusDemo2 />} />
          <Route path="/use-optimistic" element={<UseOptimisticDemo />} />
          <Route path="/use" element={<UseComponent />} />
          <Route path="/meta" element={<MetaTags />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;