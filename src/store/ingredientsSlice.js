import { createId } from '../utils/id.js'
import { parseMeasure } from '../utils/measure.js'

// une ligne par ingr d'une recette planifiée.
// { id, planningId, name, quantity: number | null, unit, date: 'YYYY-MM-DD' }

// Fonction pure (sans set) : transforme les ingr d'une recette en lignes de la liste de courses.
// Exportée pour être réutilisée par planRecipe (ajout recette + ingr en un seul set).
export const buildIngredients = (planningId, date, list) =>
  list.map(({ name, measure }) => ({
    id: createId(),
    planningId,
    name,
    date,
    ...parseMeasure(measure), // → quantity + unit
  }))

export const createIngredientsSlice = (set) => ({
  ingredients: [],

  addIngredients: (planningId, date, list) =>
    set((state) => ({
      ingredients: [...state.ingredients, ...buildIngredients(planningId, date, list)],
    }), false, 'ingredients/addIngredients'), // 3ᵉ argument : nom affiché dans Redux DevTools

  // changes : champs à modifier, ex. { quantity: 2 }, { unit: 'g' }, { date: '2026-11-20' }
  updateIngredient: (id, changes) =>
    set((state) => ({
      ingredients: state.ingredients.map((item) => (item.id === id ? { ...item, ...changes } : item)),
    }), false, 'ingredients/updateIngredient'),

  removeIngredient: (id) =>
    set((state) => ({
      ingredients: state.ingredients.filter((item) => item.id !== id),
    }), false, 'ingredients/removeIngredient'),
})
