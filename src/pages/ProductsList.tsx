import { ProductResultType } from '../types/queryTypes';

type ProductsProps = {
  returnedProducts: ProductResultType[];
  handleProductDetails: (product:ProductResultType) => void;
};

function ProductsList({ returnedProducts,
  handleProductDetails }: ProductsProps) {
  return (
    returnedProducts.map((product:ProductResultType) => (
      <div key={ product.id } data-testid="product">
        <h4>{product.title}</h4>
        <img src={ product.thumbnail } alt={ product.title } />
        <p>{`R$ ${product.price && product.price.toFixed(2)}`}</p>
        <button
          data-testid="product-add-to-cart"
          onClick={ () => handleProductDetails(product) }
        >
          Adicionar ao carrinho

        </button>
      </div>
    ))
  );
}

export default ProductsList;
