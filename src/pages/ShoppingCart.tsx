import React, { useEffect, useState } from 'react';
import { ProductResultType } from '../types/queryTypes';

function ShoppingCart() {
  const [cartItems, setCartItems] = useState< ProductResultType[]>();

  useEffect(() => {
    const cartProductsStringfied = localStorage.getItem('cartProducts') as string;
    const cartProductsParsed = JSON.parse(cartProductsStringfied);
    setCartItems(cartProductsParsed);
  }, []);

  const handleDecreaseButton = (id: string) => {
    const existingProductsJSON = localStorage.getItem('cartProducts');
    const existingProducts: ProductResultType[] = existingProductsJSON
      ? JSON.parse(existingProductsJSON)
      : [];
    existingProducts.forEach((product: ProductResultType) => {
      if (product.id === id) {
        const newQuantity = product.quantidade > 1
          ? product.quantidade - 1 : product.quantidade;
        product.quantidade = newQuantity;
        localStorage.setItem('cartProducts', JSON.stringify(existingProducts));
        setCartItems(existingProducts);
      }
    });
  };

  const handleIncreaseButton = (id: string): void => {
    const existingProductsJSON: string | null = localStorage.getItem('cartProducts');
    const existingProducts: ProductResultType[] = existingProductsJSON
      ? JSON.parse(existingProductsJSON)
      : [];

    const updatedProducts = existingProducts.map((product: ProductResultType) => {
      if (product.id === id && product.quantidade < product.available_quantity) {
        const newQuantity: number = product.quantidade + 1;
        product.quantidade = newQuantity;
      }
      return product;
    });

    localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
    setCartItems(updatedProducts);
  };

  const handleDeleteButton = (id:string) => {
    const cartProductsStringfied = localStorage.getItem('cartProducts') as string;
    const cartProductsParsed = JSON.parse(cartProductsStringfied);
    const removeItem = cartProductsParsed
      .filter((product: ProductResultType) => product.id !== id);
    setCartItems(removeItem);
    localStorage.setItem('cartProducts', JSON.stringify(removeItem));
  };

  return (
    <div>
      {(cartItems === null
      || cartItems?.length === 0)
        && <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>}
      <ul className="product-list">
        {cartItems && cartItems.map((details:ProductResultType) => (
          <li key={ details.title }>
            <div className="product-card">

              <h4 data-testid="shopping-cart-product-name">{details.title}</h4>
              <img src={ details.thumbnail } alt={ `${details.title}` } />
              <p>{`R$ ${(details.price * details.quantidade).toFixed(2)}`}</p>

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
              <button
                onClick={ () => handleDeleteButton(details.id) }
                data-testid="remove-product"
              >
                Remover do carrinho

              </button>
            </div>
          </li>))}

      </ul>
    </div>
  );
}

export default ShoppingCart;
