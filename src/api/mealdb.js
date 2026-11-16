const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export const endpoints = {
  categories: () => `${BASE_URL}/categories.php`,
  byCategory: (category) => `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`,
  search: (name) => `${BASE_URL}/search.php?s=${encodeURIComponent(name)}`,
  recipe: (id) => `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`,
}

// TheMealDB stocke les ingrédients dans strIngredient1..20 / strMeasure1..20
export function getIngredients(meal) {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim()
    if (name) ingredients.push({ name, measure: meal[`strMeasure${i}`]?.trim() ?? '' })
  }
  return ingredients
}
