import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Singup from './pages/Signup';
import Post from './components/Posts/Post';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/post" element={<Post />} />
        <Route path="/feed" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
