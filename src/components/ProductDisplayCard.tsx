import React from 'react';
import { Link } from 'react-router-dom';
import { ProductResultType } from '../types/queryTypes';

interface CardProps {
  product: ProductResultType
  handleProductDetails: (id: string) => void;
}

function ProductDisplayCard({
  product,
  handleProductDetails,
}: CardProps) {
  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  return (
    <section>

      <div data-testid="product">
        <hr />
        <img
          src={ product.thumbnail }
          alt={ product.title }
          data-testid="product-detail-image"
        />
        <h2 data-testid="product-detail-name">{product.title}</h2>
        <h3 data-testid="product-detail-price">{priceFormatted}</h3>
      </div>

      <button
        type="button"
        onClick={ () => handleProductDetails(product.id) }
        data-testid="product-add-to-cart"
        name={ product.id }
      >
        Adicionar ao Carrinho
      </button>
      <Link
        to="/shopping-cart"
        data-testid="shopping-cart-button"
      >
        Ir para o carrinho

      </Link>
    </section>
  );
}

export default ProductDisplayCard;
