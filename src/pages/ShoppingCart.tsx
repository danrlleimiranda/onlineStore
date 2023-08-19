import React, { useState } from 'react';
import { ProductResultType } from '../types/queryTypes';

type ShoppingCartProps = {
  productDetails: ProductResultType[];
};

function ShoppingCart({ productDetails }: ShoppingCartProps) {
  const [productQuantity, setProductQuantity] = useState(1);

  const handleClickLess = () => {
    if (productQuantity > 1) { setProductQuantity(productQuantity - 1); }
  };

  return (
    <div>
      {productDetails.length === 0
        && <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>}
      <ul>
        {productDetails.map((details) => (
          <li key={ details.title }>
            <h3 data-testid="shopping-cart-product-name">{details.title}</h3>
            <img src={ details.thumbnail } alt="" />
            <p>{`R$ ${details.price * productQuantity}`}</p>
            <div>
              <button
                onClick={ handleClickLess }
              >
                -

              </button>
              <span data-testid="shopping-cart-product-quantity">
                {productQuantity}
              </span>
              <button
                onClick={ () => setProductQuantity(productQuantity + 1) }
              >
                +

              </button>
            </div>
          </li>))}

      </ul>
    </div>
  );
}

export default ShoppingCart;
