import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

interface Product {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
}

function Header() {
  const [searchItem, setSearchItem] = useState<any>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isCheckedInput] = useState<boolean>(true);

  const handleSearch = () => {
    if (searchItem) {
      getProductsFromCategoryAndQuery('', searchItem)
        .then((productsData) => {
          setProducts(productsData.results);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  };

  return (
    <>
      <header>
        <section>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            value={ searchItem }
            onChange={ (e) => setSearchItem(e.target.value) }
            data-testid="query-input"
          />
          <button onClick={ handleSearch } data-testid="query-button">
            Buscar
          </button>
          <Link to="/cart" data-testid="shopping-cart-button">
            <img src="https://cdn-icons-png.flaticon.com/512/126/126510.png" alt="link do carrinho de compras" width="35px" />
          </Link>
        </section>

        {isCheckedInput && (
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>)}
      </header>
      <div>
        <h2>Produtos</h2>
        {products.length === 0 ? (
          <p>Nenhum produto foi encontrado</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={ product.id } data-testid="product">
                <img src={ product.thumbnail } alt={ product.title } />
                <p>{product.title}</p>
                <p>
                  Preço: R$
                  {' '}
                  {product.price}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Header;
