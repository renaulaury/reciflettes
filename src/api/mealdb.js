import { queryOptions } from '@tanstack/react-query'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

// urls
export const endpoints = {
  categories: () => `${BASE_URL}/categories.php`,
  byCategory: (category) => `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`,
  search: (name) => `${BASE_URL}/search.php?s=${encodeURIComponent(name)}`,
  recipe: (id) => `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`,
}

// fetch + vérif du statut HTTP. annulation requête si elle n'est plus utile (via tanstack)
async function fetchJson(url, signal) {
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`Erreur ${res.status}`)
  return res.json()
}

// Fabrique de clés de cache pour tanstack (identif en cascade)
export const mealKeys = {
  categories: () => ['categories'],
  recipes: () => ['recipes'],
  byCategory: (category) => ['recipes', 'category', category],
  search: (name) => ['recipes', 'search', name],
  recipe: (id) => ['recipe', id],
}

// queryKey : étiquette - queryFn : function qui fait l'appel

// req de category non rechargées 
export const categoriesQuery = () =>
  queryOptions({
    queryKey: mealKeys.categories(), 
    queryFn: ({ signal }) => fetchJson(endpoints.categories(), signal).then((data) => data.categories ?? []),
    staleTime: Infinity, // catégories inchangées
  })

export const byCategoryQuery = (category) =>
  queryOptions({
    queryKey: mealKeys.byCategory(category),
    queryFn: ({ signal }) => fetchJson(endpoints.byCategory(category), signal).then((data) => data.meals ?? []),
  })

export const searchQuery = (name) =>
  queryOptions({
    queryKey: mealKeys.search(name),
    queryFn: ({ signal }) => fetchJson(endpoints.search(name), signal).then((data) => data.meals ?? []),
  })

// lookup.php renvoie { meals: [recette] }, ou { meals: null } si l'id n'existe pas
export const recipeQuery = (id) =>
  queryOptions({
    queryKey: mealKeys.recipe(id),
    queryFn: ({ signal }) => fetchJson(endpoints.recipe(id), signal).then((data) => data.meals?.[0] ?? null),
  })

// TheMealDB stocke les ingr ds strName1..20
export function getIngredients(meal) {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim()
    if (name) ingredients.push({ name, measure: meal[`strMeasure${i}`]?.trim() ?? '' })
  }
  return ingredients
}
