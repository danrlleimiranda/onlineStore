import { Query, Products } from '../types/queryTypes';

export async function getCategories() {
  const fetchCategories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await fetchCategories.json();
  return data;
}

getCategories();

export async function getProductsFromCategoryAndQuery(
  query: string,
  categoryId?: string,
) {
  if (categoryId) {
    const API_URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
    return fetch(API_URL).then((response) => response.json());
  }
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  return fetch(API_URL).then((response) => response.json());
}
export async function getProductById(categoryId: string) {
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  return fetch(API_URL).then((response) => response.json());
}

// export async function getProductDetails(productId: Products) {
//   const fetchProductDetails = await fetch(`https://api.mercadolibre.com/items/${productId}`)
//     .catch((erro) => erro);
//   const data = await fetchProductDetails.json();
//   return data;
// }
