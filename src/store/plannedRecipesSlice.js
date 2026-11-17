import { createId } from '../utils/id.js'

// Slice « recettes planifiées ».
// Une entrée = une planification : la même recette TheMealDB peut être planifiée
// plusieurs fois, chaque planification a donc son propre `id`.
//
// Forme d'une entrée :
// { id, mealId, name, date: 'YYYY-MM-DD', meal: 'Midi' | 'Soir' }
export const createPlannedRecipesSlice = (set, get) => ({
  plannedRecipes: [],

  // Planifie une recette et enregistre ses ingrédients dans l'autre slice.
  // `ingredients` : tableau { name, measure } tel que renvoyé par getIngredients().
  planRecipe: ({ mealId, name, date, meal, ingredients }) => {
    const planningId = createId()

    set((state) => ({
      plannedRecipes: [...state.plannedRecipes, { id: planningId, mealId, name, date, meal }],
    }))

    // get() donne accès au store entier : on appelle l'action du slice ingrédients
    // en lui passant l'id de planification qui sert de lien entre les deux.
    get().addIngredients(planningId, date, ingredients)

    return planningId
  },
})
