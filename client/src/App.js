import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Singup from './pages/Signup';
import Home from './pages/Home';
import MyNetwork from './pages/MyNetwork';
import Chat from './pages/Chat/index.Chat';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/"  element={<Home />} />
        <Route path="/mynetwork" element={<MyNetwork />} />
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/chat" element={<Chat/>} />
      </Routes>
    </div>
  );
}

export default App;
