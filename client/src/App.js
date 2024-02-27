import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Singup from './pages/Signup';
import Home from './pages/Home';
import UserCard from './components/UserCard/index.Card';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path={"/feed"}  element={<Home />} />
        <Route path="/card" element={<UserCard />} />
      </Routes>
    </div>
  );
}

export default App;
