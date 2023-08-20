import { Link } from 'react-router-dom';
import { ProductResultType } from '../types/queryTypes';
import './productList.css';

type ProductsProps = {
  returnedProducts: ProductResultType[];
  handleProductDetails: (product:ProductResultType) => void;
};

function ProductsList({ returnedProducts,
  handleProductDetails }: ProductsProps) {
  return (
    <ul className="product-list">
      {returnedProducts.map((product:ProductResultType) => (
        <li key={ product.id }>
          <div data-testid="product" className="product-card">
            <Link to={ `/product/${product.id}` } data-testid="product-detail-link">
              <img src={ product.thumbnail } alt={ product.title } />
              <h4>{product.title}</h4>
              <p>{`R$ ${product.price && product.price.toFixed(2)}`}</p>
            </Link>
            <button
              data-testid="product-add-to-cart"
              onClick={ () => handleProductDetails(product) }
            >
              Adicionar ao carrinho

            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductsList;
