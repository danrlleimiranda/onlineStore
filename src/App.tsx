import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductResultType, CategoryType } from './types/queryTypes';
import * as api from './services/api';
import ShoppingCart from './pages/ShoppingCart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

function App() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  const handleProductDetails = (product: ProductResultType) => {
    // Recuperar os produtos existentes do localStorage
    const existingProductsJSON = localStorage.getItem('cartProducts');
    const existingProducts: ProductResultType[] = existingProductsJSON
      ? JSON.parse(existingProductsJSON)
      : [];

    // Adicionar o novo produto à lista de produtos existente
    const updatedProducts = [...existingProducts, { ...product, quantidade: 1 }];

    // Atualizar o estado local e o localStorage com a lista atualizada de produtos
    localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
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
        /> }
      />

      <Route
        path="/product/:id"
        element={ <ProductDetails
          handleProductDetails={ handleProductDetails }
        /> }
      />
    </Routes>
  );
}

export default App;
