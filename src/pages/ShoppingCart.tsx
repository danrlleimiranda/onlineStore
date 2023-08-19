import React, { useState } from 'react';
import { ProductResultType } from '../types/queryTypes';

type ShoppingCartProps = {
  productDetails: ProductResultType[];
  setProductDetails: (product: ProductResultType[]) => void
};

function ShoppingCart({ productDetails, setProductDetails }: ShoppingCartProps) {
  const cartProductsStringfied = localStorage.getItem('cartProducts') as string;
  const cartProductsParsed = JSON.parse(cartProductsStringfied);

  const handleDecreaseButton = (id: string) => {
    const findItem = cartProductsParsed
      .find((product: ProductResultType) => product.id === id);
    const index = productDetails.findIndex((product) => product.id === id);

    if (findItem.quantidade > 1) {
      productDetails[index] = { ...findItem,
        quantidade: findItem.quantidade -= 1 };
      setProductDetails([...productDetails]);
    }
  };

  const handleIncreaseButton = (id: string) => {
    const findItem = cartProductsParsed
      .find((parsed: ProductResultType) => parsed.id === id);
    const index = productDetails.findIndex((product) => product.id === id);

    productDetails[index] = { ...findItem,
      quantidade: findItem.quantidade += 1 };
    setProductDetails([...productDetails]);
  };

  const handleDeleteButton = (id:string) => {
    const removeItem = cartProductsParsed
      .filter((product: ProductResultType) => product.id !== id);
    setProductDetails(removeItem);
  };

  return (
    <div>
      {(productDetails.length < 1 || cartProductsParsed === null)
        && <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>}
      <ul>
        {cartProductsParsed && cartProductsParsed.map((details:ProductResultType) => (
          <li key={ details.title }>
            <h3 data-testid="shopping-cart-product-name">{details.title}</h3>
            <img src={ details.thumbnail } alt={ `${details.title}` } />
            <p>{`R$ ${(details.price * details.quantidade).toFixed(2)}`}</p>
            <button
              onClick={ () => handleDeleteButton(details.id) }
              data-testid="remove-product"
            >
              Remover do carrinho

            </button>
            <div>
              <button
                onClick={ () => handleDecreaseButton(details.id) }
                data-testid="product-decrease-quantity"
              >
                -

              </button>
              <span data-testid="shopping-cart-product-quantity">
                {details.quantidade}
              </span>
              <button
                onClick={ () => handleIncreaseButton(details.id) }
                data-testid="product-increase-quantity"
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
