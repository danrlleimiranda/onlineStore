import { ProductResultType } from '../types/queryTypes';

type ProductsProps = {
  returnedProducts: ProductResultType[]
};

function ProductsList(props: ProductsProps) {
  const { returnedProducts } = props;

  return (
    returnedProducts.map((product) => (
      <div key={ product.id } data-testid="product">
        <h4>{product.title}</h4>
        <img src={ product.thumbnail } alt={ product.title } />
        <p>{`R$ ${product.price.toFixed(2)}`}</p>
      </div>
    ))
  );
}

export default ProductsList;
