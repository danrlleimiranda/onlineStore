import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart';
import Home from './pages/Home';
import { ProductResultType, CategoryType } from './types/queryTypes';
import * as api from './services/api';

function App() {
  const [productDetails, setProductDetails] = useState<ProductResultType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  const localStorageProducts = JSON.stringify(productDetails);
  const handleProductDetails = (product: ProductResultType) => {
    setProductDetails([...productDetails, { ...product, quantidade: 1 }]);
  };
  localStorage.setItem('cartProducts', localStorageProducts);
  return (
    <Routes>
      <Route
        path="/shopping-cart"
        element={ <ShoppingCart
          productDetails={ productDetails }
          setProductDetails={ setProductDetails }
        /> }
      />
      <Route
        path="/"
        element={ <Home
          handleProductDetails={ handleProductDetails }
          categories={ categories }
        /> }
      />
    </Routes>
  );
}

export default App;
