import React from 'react';
import './App.css';
import Calculator from './components/Calculator';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PolynomialRootsCalculator from './components/PolynomialRootsCalculator';

function App() {
  return (
    <div className='App'>
      <Router>
      <Navbar/>
        <Routes>
        <Route path="/PolynomialRootsCalculator" element={<PolynomialRootsCalculator />} />z
          <Route path="/" element={<Calculator />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
