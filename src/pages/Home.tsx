import { useState } from 'react';
import {
  getProductsFromCategoryAndQuery,
} from '../services/api';
import { ProductResultType, CategoryType } from '../types/queryTypes';
import ProductsList from './ProductsList';
import Search from '../components/Search';

type HomeProps = {
  handleProductDetails: (product: ProductResultType) => void
  categories: CategoryType[]
};

function Home({ handleProductDetails, categories }:HomeProps) {
  const [searchedProducts, setSearchedProducts] = useState<string>('');
  const [returnedProducts, setReturnedProducts] = useState<ProductResultType[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<ProductResultType[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSearchedProducts(event.target.value);
  };

  const handleClick = async () => {
    const getSearchedProducts = await getProductsFromCategoryAndQuery(searchedProducts);
    setReturnedProducts(getSearchedProducts.results);
    setProductsByCategory([]);
    setSearchedProducts('');
  };

  const handleCategoryClick = async (categoryName: string) => {
    const getCategorizedProducts = await getProductsFromCategoryAndQuery(categoryName);
    setProductsByCategory(getCategorizedProducts.results);
    setReturnedProducts([]);
  };

  return (
    <div>
      <Search
        handleCategoryClick={ handleCategoryClick }
        categories={ categories }
      />
      <label>
        <input
          type="text"
          data-testid="query-input"
          value={ searchedProducts }
          onChange={ handleChange }
        />
        <button data-testid="query-button" onClick={ handleClick }>
          Pesquisar
        </button>
      </label>
      {!returnedProducts.length && !productsByCategory.length && (
        <h2>Nenhum produto foi encontrado</h2>
      )}
      {returnedProducts.length > 0 && (
        <div>
          <ProductsList
            returnedProducts={ returnedProducts }
            handleProductDetails={ handleProductDetails }
          />
        </div>
      )}
      {productsByCategory.length > 0 && (
        <div>
          <ProductsList
            returnedProducts={ productsByCategory }
            handleProductDetails={ handleProductDetails }
          />
        </div>
      )}

    </div>
  );
}

export default Home;
