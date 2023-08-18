import React from 'react';
import { Link } from 'react-router-dom';

function Search() {
  return (
    <div>
      <Link to="/shopping-cart" data-testid="shopping-cart-button">
        Carrinho de compras

      </Link>
      <h1 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h1>
    </div>
  );
}

export default Search;
