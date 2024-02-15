import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </div>
  );
}

export default App;
