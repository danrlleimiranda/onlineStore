import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductResultType, CategoryType } from './types/queryTypes';
import * as api from './services/api';
import ShoppingCart from './pages/ShoppingCart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import './App.css';

function App() {
  // adiciona um estado inicial para cartQuantity
  const existingProductsJSON = localStorage.getItem('cartProducts');
  const existingProducts: ProductResultType[] = existingProductsJSON
    ? JSON.parse(existingProductsJSON)
    : [];

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [cartQuantity, setCartQuantity] = useState<number>(existingProducts.length);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  const handleProductDetails = (product: ProductResultType) => {
    // Recuperar os produtos existentes do localStorage

    // Adicionar o novo produto à lista de produtos existente
    const updatedProducts = [...existingProducts, { ...product, quantidade: 1 }];
    // Atualizar o estado local e o localStorage com a lista atualizada de produtos
    localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
    setCartQuantity(updatedProducts
      .reduce((totalQuantity: number, products: ProductResultType): any | number => {
        if (products.quantidade) return totalQuantity + products.quantidade;
        return totalQuantity + 1;
      }, 0));
  };

  return (
    <Routes>
      <Route
        path="/shopping-cart"
        element={ <ShoppingCart /> }
      />
      <Route
        path="/"
        element={ <Home
          handleProductDetails={ handleProductDetails }
          categories={ categories }
          cartQuantity={ cartQuantity }
        /> }
      />

      <Route
        path="/product/:id"
        element={ <ProductDetails
          cartQuantity={ cartQuantity }
          handleProductDetails={ handleProductDetails }
        /> }
      />
    </Routes>
  );
}

export default App;
