import { createId } from '../utils/id.js'
import { parseMeasure } from '../utils/measure.js'

// Slice « ingrédients » : une ligne par ingrédient d'une recette planifiée.
//
// Forme d'une ligne :
// { id, planningId, name, quantity: number | null, unit, date: 'YYYY-MM-DD' }
//
// `planningId` pointe vers l'entrée de plannedRecipes d'où vient l'ingrédient.
// La date est copiée sur chaque ligne pour pouvoir la modifier ligne par ligne
// depuis la liste de courses.
export const createIngredientsSlice = (set) => ({
  ingredients: [],

  addIngredients: (planningId, date, list) =>
    set((state) => ({
      ingredients: [
        ...state.ingredients,
        ...list.map(({ name, measure }) => ({
          id: createId(),
          planningId,
          name,
          date,
          ...parseMeasure(measure), // → quantity + unit
        })),
      ],
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
