import React from 'react';
import Navbar from './components/navBar';
import './App.css';
import Home from './components/imagePage';
import Chat from './components/chatPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
    <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/chat' element={<Chat/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;