import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import Home from './pages/home/Home';
import * as api from './services/api';
import { CategoryType, ProductResultType } from './types/queryTypes';

function App() {
  const existingProductsJSON = localStorage.getItem('cartProducts');
  const existingProducts: ProductResultType[] = existingProductsJSON
    ? JSON.parse(existingProductsJSON)
    : [];

  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [cartQuantity, setCartQuantity] = useState<number>(existingProducts.length);
  const [searchedProducts, setSearchedProducts] = useState<string>('');
  const [returnedProducts, setReturnedProducts] = useState<ProductResultType[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<ProductResultType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  const handleProductDetails = (product: ProductResultType) => {

    const updatedProducts = [...existingProducts, { ...product, quantidade: 1 }];
    localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
    setCartQuantity(updatedProducts
      .reduce((totalQuantity: number, products: ProductResultType): any | number => {
        if (products.quantidade) return totalQuantity + products.quantidade;
        return totalQuantity + 1;
      }, 0));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSearchedProducts(event.target.value);
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const getSearchedProducts = await
    api.getProductsFromCategoryAndQuery(searchedProducts);
    setReturnedProducts(getSearchedProducts.results);

    setProductsByCategory([]);
    setSearchedProducts('');
    navigate('/');
  };

  const handleCategoryClick = async (categoryName: string) => {
    const getCategorizedProducts = await
    api.getProductsFromCategoryAndQuery(categoryName);

    setProductsByCategory(getCategorizedProducts.results);
    setReturnedProducts([]);
    navigate('/');
  };

  return (
    <Routes>

      <Route
        path="/"
        element={ <Layout
          cartQuantity={ cartQuantity }
          handleChange={ handleChange }
          handleClick={ (event:
          React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick(event) }
          searchedProducts={ searchedProducts }
        /> }
      >
        <Route
          index
          element={ <Home
            handleCategoryClick={ handleCategoryClick }
            categories={ categories }
            handleProductDetails={ handleProductDetails }
            productsByCategory={ productsByCategory }
            returnedProducts={ returnedProducts }
          /> }
        />
        <Route
          path="/shopping-cart"
          element={ <ShoppingCart /> }
        />

        <Route
          path="/product/:id"
          element={ <ProductDetails
            handleProductDetails={ handleProductDetails }
          /> }
        />
      </Route>
    </Routes>
  );
}

export default App;
