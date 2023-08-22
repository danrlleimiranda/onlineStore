import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import iconCart from '../images/cart3.svg';
import InputSearch from './InputSearch';
import './Layout.css';

type LayoutProps = {
  cartQuantity: number;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement | HTMLTextAreaElement>) => void;
  searchedProducts: string

};

function Layout({ cartQuantity,
  searchedProducts, handleClick, handleChange }: LayoutProps) {
  return (
    <>
      <header>
        <InputSearch
          searchedProducts={ searchedProducts }
          handleClick={ handleClick }
          handleChange={ handleChange }
        />
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink
            to="/shopping-cart"
            data-testid="shopping-cart-button"
          >
            <img src={ iconCart } alt="" />
            <span data-testid="shopping-cart-size">{cartQuantity}</span>

          </NavLink>
        </nav>

      </header>

      <Outlet />

      <footer>
        Todos os direitos reservados.
      </footer>
    </>

  );
}

export default Layout;
