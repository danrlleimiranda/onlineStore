import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryType } from '../types/queryTypes';
import iconCart from '../images/cart3.svg';

type SearchProps = {
  handleCategoryClick: (categoryId: string) => void
  categories: CategoryType[]
  cartQuantity: number
};

function Search({ handleCategoryClick, categories, cartQuantity }: SearchProps) {
  return (
    <div>
      <Link to="/shopping-cart" data-testid="shopping-cart-button">
        <img src={ iconCart } alt="" />

      </Link>
      <span data-testid="shopping-cart-size">{cartQuantity}</span>
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
                { category.name }
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
