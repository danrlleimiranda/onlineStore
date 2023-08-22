import { CategoryType, ProductResultType } from '../../types/queryTypes';
import ProductsList from '../../components/ProductsList';
import Search from '../../components/Search';
import './home.css';

type HomeProps = {
  handleProductDetails: (product: ProductResultType) => void
  returnedProducts: ProductResultType[]
  productsByCategory: ProductResultType[]
  handleCategoryClick: (categoryName: string) => void;
  categories: CategoryType[];
};

function Home({ handleProductDetails,
  returnedProducts,
  productsByCategory, categories, handleCategoryClick }:HomeProps) {
  return (
    <div className="container">
      <Search
        handleCategoryClick={ handleCategoryClick }
        categories={ categories }
      />
      {!returnedProducts.length && !productsByCategory.length && (
        <h2>Nenhum produto foi encontrado</h2>
      )}
      {returnedProducts.length > 0 && (
        <div className="product-container">
          <ProductsList
            returnedProducts={ returnedProducts }
            handleProductDetails={ handleProductDetails }
          />
        </div>
      )}
      {productsByCategory.length > 0 && (
        <div className="product-container">
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
