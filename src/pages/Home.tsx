import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import { CategoryType, ProductResultType } from '../types/queryTypes';
import ProductsList from './ProductsList';
import ProductDisplayCard from './ProductDisplayCard';

function Home() {
  const [categoriesData, setCategoriesData] = useState<CategoryType[]>();
  const [searchedProducts, setSearchedProducts] = useState<string>('');
  const [returnedProducts, setReturnedProducts] = useState<ProductResultType[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<ProductResultType[]>([]);

  useEffect(() => {
    const getCategoriesData = async () => {
      const categoriesFetch = await getCategories();
      setCategoriesData(categoriesFetch);
    };
    getCategoriesData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSearchedProducts(event.target.value);
  };

  const handleClick = async () => {
    const getSearchedProducts = await getProductsFromCategoryAndQuery(searchedProducts);
    setReturnedProducts(getSearchedProducts.results);
  };

  const handleCategoryClick = async (categoryName: string) => {
    const getCategorizedProducts = await getProductsFromCategoryAndQuery(categoryName);
    setProductsByCategory(getCategorizedProducts.results);
  };

  return (
    <div>
      <button>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
      </button>
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
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
          <ProductsList returnedProducts={ returnedProducts } />
        </div>
      )}
      {productsByCategory.length > 0 && (
        <div>
          <ProductsList returnedProducts={ productsByCategory } />
        </div>
      )}
      <ul className="category-list">
        {categoriesData?.map((category) => (
          <li key={ category.id }>
            <button
              data-testid="category"
              className="category-btn"
              onClick={ () => handleCategoryClick(category.name) }
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
      <div>
        {returnedProducts.map((product) => (
          <ProductDisplayCard
            key={ product.id }
            product={ product }
            // history={ history }
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
