import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createPlannedRecipesSlice } from './plannedRecipesSlice.js'
import { createIngredientsSlice } from './ingredientsSlice.js'

// Store Zustand unique, composé de deux slices (pattern « slices » de Zustand) :
// chaque slice reçoit (set, get, api) et renvoie sa part d'état + ses actions.
//
// persist : l'état est save dans le localStorage pour ne pas perdre
// le planning et la liste de courses en rechargeant la page.
//
// devtools : envoie chaque changement d'état à l'extension navigateur
// Redux DevTools (onglet « Redux » des outils de développement).
// Activé seulement en développement (npm run dev), pas dans le build final.
// Le nom de chaque action vient du 3ᵉ argument de set() dans les slices.
//
// Utilisation dans un composant, en ne sélectionnant que ce dont on a besoin :
//   const ingredients = useStore((state) => state.ingredients)
export const useStore = create(
  devtools(
    persist(
      (...args) => ({
        ...createPlannedRecipesSlice(...args),
        ...createIngredientsSlice(...args),
      }),
      { name: 'reciflettes-store' },
    ),
    { name: 'Reciflettes', enabled: import.meta.env.DEV },
  ),
)
