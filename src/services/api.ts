export async function getCategories() {
  const fetchCategories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await fetchCategories.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(
  query: string,
  categoryId = '',
) {
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  return fetch(API_URL).then((response) => response.json());
}

export async function getProductById(productId: string) {
  const API_URL = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(API_URL);
  const data = response.json();

  return data;
}
