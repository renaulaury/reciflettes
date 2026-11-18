import { createId } from '../utils/id.js'
import { buildIngredients } from './ingredientsSlice.js'

// recettes planifiées
export const createPlannedRecipesSlice = (set) => ({
  plannedRecipes: [],
  // Action appelée à la validation de la modale : ajoute la recette au planning
  // ET ses ingr à la liste de courses dans UN SEUL set → une seule mise à jour du store
  // (un seul re-render des composants abonnés, une seule entrée dans Redux DevTools, état jamais à moitié à jour).
  planRecipe: ({ mealId, name, date, meal, ingredients }) => {
    const planningId = createId() // id partagé : relie les ingr à leur repas planifié

    set((state) => ({
      plannedRecipes: [...state.plannedRecipes, { id: planningId, mealId, name, date, meal }],
      ingredients: [...state.ingredients, ...buildIngredients(planningId, date, ingredients)],
    }), false, 'plannedRecipes/planRecipe')

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
