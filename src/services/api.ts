import { Query } from '../types/queryTypes';

export async function getCategories() {
  // Implemente aqui
  const fetchCategories = await fetch('https://api.mercadolibre.com/sites/MLB/categories')
    .catch((erro) => erro);
  const data = fetchCategories.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(query: Query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const fetchResult = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=$QUERY}`)
    .then((element) => element.json())
    .then((dados) => dados)
    .catch((erro) => erro);
  return fetchResult;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
