import React from 'react';
import { CategoryType } from '../types/queryTypes';
import './search.css';

type SearchProps = {
  handleCategoryClick: (categoryId: string) => void
  categories: CategoryType[]
};

function Search({ handleCategoryClick, categories }: SearchProps) {
  return (
    <aside>
      <h3>Categorias:</h3>
      <ul className="category-list">
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
  );
}

export default Search;
