import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Designer from './pages/Designer';


function App() {
  return (
    <div className="App">
        <Router>
      <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/designer" element={<Designer/>} />
      </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;