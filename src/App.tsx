import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart';
import * as api from './services/api';
import Search from './pages/Search';

function App() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getCategories();
      setCategories(data);
    };
    fetchData();
  }, []);
  return (
    <Routes>
      <Route path="/" element={ <Search /> } />
      <Route path="/shopping-cart" element={ <ShoppingCart /> } />
    </Routes>
  );
}

export default App;
