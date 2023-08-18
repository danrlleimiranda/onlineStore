import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/shopping-cart" element={ <ShoppingCart /> } />
      <Route path="/" element={ <Home /> } />
    </Routes>
  );
}

export default App;
