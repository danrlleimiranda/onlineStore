import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  dataTestid: string;
  onAddToCart: (id: string) => void;
}

function ProductDisplayCard({
  id,
  thumbnail,
  title,
  price,
  dataTestid,
  onAddToCart,
}: CardProps) {
  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  return (
    <section>
      <Link to={ `/product/${id}` } data-testid="product-detail-link">
        <div data-testid={ dataTestid }>
          <hr />
          <img src={ thumbnail } alt={ title } />
          <h2>{title}</h2>
          <h3>{priceFormatted}</h3>
        </div>
      </Link>
      <button
        type="button"
        onClick={ () => onAddToCart(id) }
        data-testid="product-add-to-cart"
        name={ id }
      >
        Adicionar ao Carrinho
      </button>
    </section>
  );
}

export default ProductDisplayCard;
