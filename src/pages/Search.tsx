import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

type CategoryType = {
  id: string,
  name: string
};

function Search() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getCategories();
      console.log(data);
      setCategories(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Link to="/shopping-cart" data-testid="shopping-cart-button">
        Carrinho de compras

      </Link>
      <aside>
        {categories.map((category: CategoryType) => (
          <label htmlFor={ category.id } key={ category.id } data-testid="category">
            <input type="radio" id={ category.id } />
            {category.name}
          </label>
        ))}

      </aside>
      <h1 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h1>
    </div>
  );
}

export default Search;
