import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createPlannedRecipesSlice } from './plannedRecipesSlice.js'
import { createIngredientsSlice } from './ingredientsSlice.js'

// Store Zustand unique, composé de deux slices (pattern « slices » de Zustand) : chaque slice reçoit (set, get, api) et renvoie sa part d'état + ses actions
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
