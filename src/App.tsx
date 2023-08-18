import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart';

import Search from './pages/Search';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Search /> } />
      <Route path="/shopping-cart" element={ <ShoppingCart /> } />
    </Routes>
  );
}

export default App;
