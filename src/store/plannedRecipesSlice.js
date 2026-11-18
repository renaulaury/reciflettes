import { createId } from '../utils/id.js'

// recettes planifiées
export const createPlannedRecipesSlice = (set, get) => ({
  plannedRecipes: [],
  // Planifie une recette et enregistre ses ingrédients dans l'autre slice.
  planRecipe: ({ mealId, name, date, meal, ingredients }) => {
    const planningId = createId()

    set((state) => ({
      plannedRecipes: [...state.plannedRecipes, { id: planningId, mealId, name, date, meal }],
    }), false, 'plannedRecipes/planRecipe')

    get().addIngredients(planningId, date, ingredients)

    return planningId
  },

  // Déplacement d'un repas dans le calendrier 
  updatePlannedRecipeDate: (id, date) =>
    set((state) => ({
      plannedRecipes: state.plannedRecipes.map((recipe) => (recipe.id === id ? { ...recipe, date } : recipe)),
    }), false, 'plannedRecipes/updatePlannedRecipeDate'),

  // Del planification.
  removePlannedRecipe: (id) =>
    set((state) => ({
      plannedRecipes: state.plannedRecipes.filter((recipe) => recipe.id !== id),
    }), false, 'plannedRecipes/removePlannedRecipe'),
})
