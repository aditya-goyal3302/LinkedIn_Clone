import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Singup from './pages/Signup';
import Home from './pages/Home';
import MyNetwork from './pages/MyNetwork';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/feed"  element={<Home />} />
        <Route path="/card" element={<MyNetwork />} />
      </Routes>
    </div>
  );
}

export default App;
