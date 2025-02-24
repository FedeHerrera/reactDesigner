import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectSelection from './views/projectSelection';
import ProjectView from './views/projectView';
import './App.module.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectSelection />} />
        <Route path="/project/:projectName" element={<ProjectView />} />
      </Routes>
    </Router>
  );
}

export default App;
