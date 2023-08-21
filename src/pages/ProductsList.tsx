import {Link} from 'react-router-dom';
import {ProductResultType} from '../types/queryTypes';

type ProductsProps = {
    returnedProducts: ProductResultType[];
    handleProductDetails: (product: ProductResultType) => void;
};

//data-testid="free-shipping"
function ProductsList({
                          returnedProducts,
                          handleProductDetails
                      }: ProductsProps) {
    return (
        returnedProducts.map((product: ProductResultType) => (
            <div key={product.id}>
                <div data-testid="product">
                    <Link to={`/product/${product.id}`} data-testid="product-detail-link">
                        <h4>{product.title}</h4>
                        <img src={product.thumbnail} alt={product.title}/>
                        <p>{`R$ ${product.price && product.price.toFixed(2)}`}</p>
                        {product.shipping.free_shipping && (
                            <p data-testid="free-shipping">Frete Grátis</p>
                        )}

                    </Link>
                    <button
                        data-testid="product-add-to-cart"
                        onClick={() => handleProductDetails(product)}
                    >
                        Adicionar ao carrinho

                    </button>
                </div>
            </div>
        ))
    );
}

export default ProductsList;
