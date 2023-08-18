import React from 'react';
import { Link, useParams } from 'react-router-dom';

function ProductDetails({ products }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  return (
    <div>
      <h2 data-testid="product-detail-name">{product.title}</h2>
      <img
        src={ product.thumbnail }
        alt={ product.title }
        data-testid="product-detail-image"
      />
      <p data-testid="product-detail-price">{`R$ ${product.price.toFixed(2)}`}</p>
      <Link to="/cart" data-testid="shopping-cart-button">
        Ir para o Carrinho
      </Link>
    </div>
  );
}

export default ProductDetails;
