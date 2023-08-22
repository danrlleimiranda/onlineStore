import React from 'react';
import iconSearch from '../images/search.svg';

type InputSearchType = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement | HTMLTextAreaElement>) => void;
  searchedProducts: string
};

function InputSearch({ handleChange, handleClick, searchedProducts }: InputSearchType) {
  return (
    <div className="search-box">
      <form>

        <label data-testid="home-initial-message">

          <input
            type="text"
            data-testid="query-input"
            value={ searchedProducts }
            onChange={ handleChange }
            placeholder="Digite o que procura"
          />
        </label>
        <button data-testid="query-button" onClick={ (event) => handleClick(event) }>
          <img src={ iconSearch } alt="" />
        </button>
      </form>
      <p>
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>

    </div>
  );
}

export default InputSearch;
