import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryType } from '../types/queryTypes';

type SearchProps = {
  handleCategoryClick: (categoryId: string) => void
  categories: CategoryType[]
};

function Search({ handleCategoryClick, categories }: SearchProps) {
  return (
    <div>
      <Link to="/shopping-cart" data-testid="shopping-cart-button">
        Carrinho de compras

      </Link>
      <aside>
        <ul>
          {categories.map((category: CategoryType) => (
            <li key={ category.id }>
              <label htmlFor={ category.id } data-testid="category">
                <input
                  type="radio"
                  id={ category.id }
                  name="categoria"
                  value={ category.id }
                  onChange={ () => handleCategoryClick(category.name.trim()) }
                />
                {category.name}
              </label>
            </li>
          ))}

        </ul>

      </aside>
      <h1 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h1>
    </div>
  );
}

export default Search;
