import React from 'react';
import './App.css';
import Calculator from './components/Calculator';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Polynomial from './components/Polynomial';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
        <Route path="/P" element={<Polynomial />} />z
          <Route path="/" element={<Calculator />} />
        </Routes>
      <Navbar/>
      </Router>
    </div>
  );
}

export default App;
