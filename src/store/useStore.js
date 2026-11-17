import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createPlannedRecipesSlice } from './plannedRecipesSlice.js'
import { createIngredientsSlice } from './ingredientsSlice.js'

// Store Zustand unique, composé de deux slices (pattern « slices » de Zustand) :
// chaque slice reçoit (set, get, api) et renvoie sa part d'état + ses actions.
//
// persist : l'état est sauvegardé dans le localStorage pour ne pas perdre
// le planning et la liste de courses en rechargeant la page.
//
// Utilisation dans un composant, en ne sélectionnant que ce dont on a besoin :
//   const ingredients = useStore((state) => state.ingredients)
export const useStore = create(
  persist(
    (...args) => ({
      ...createPlannedRecipesSlice(...args),
      ...createIngredientsSlice(...args),
    }),
    { name: 'reciflettes-store' },
  ),
)
