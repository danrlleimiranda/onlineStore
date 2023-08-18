import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart';
import Home from './pages/Home';
// import ProductDisplayCard from './pages/ProductDisplayCard';
import ProductDetails from './pages/ProductDetails';
import { getProductsFromCategoryAndQuery } from './services/api';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsResponse = await getProductsFromCategoryAndQuery('');
        setProducts(productsResponse.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <Routes>
      <Route path="/shopping-cart" element={ <ShoppingCart /> } />
      <Route path="/" element={ <Home /> } />
      <Route
        path="/product-details/:productId"
        element={ <ProductDetails products={ products } /> }
      />
    </Routes>
  );
}

export default App;
