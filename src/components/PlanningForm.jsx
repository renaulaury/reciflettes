import { useState } from 'react'
import { MEALS } from '../constants.js'
import { useQuery } from '@tanstack/react-query'
import { searchQuery, getIngredients } from '../api/mealdb.js'
import { useDebounce } from '../hooks/useDebounce.js'
import { useStore } from '../store/useStore.js'
import { toISODate } from '../utils/date.js'

// Modale : Rech recette + date conso + midi/soir = valid > store
export default function PlanningForm({ recipe, initialDate, onClose }) {
  const planRecipe = useStore((state) => state.planRecipe)

  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [date, setDate] = useState(() => initialDate ?? toISODate()) 
  const [meal, setMeal] = useState(MEALS[0])

  // Rech lancée à partir de 2 carac
  const debouncedQuery = useDebounce(query.trim())
  const { data, isLoading, isError, isSuccess } = useQuery({ ...searchQuery(debouncedQuery), enabled: debouncedQuery.length >= 2 })
  const results = data ?? []

  // Recette passée en prop
  const selected = recipe ?? results.find((result) => result.idMeal === selectedId) ?? results[0]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selected) return

    planRecipe({
      mealId: selected.idMeal,
      name: selected.strMeal,
      ingredients: getIngredients(selected),
      date, // date de conso choisie dans la modale
      meal,
    })
    onClose()
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {recipe ? (
        <p className="form__recipe">{recipe.strMeal}</p>
      ) : (
        <>
          <label className="form__field">
            Rechercher une recette
            <input
              type="search"
              placeholder="Ex. : lasagne, curry…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </label>

          {/* Messages d'état de la rech */}          
          {isLoading && <p className="form__hint">Recherche…</p>}
          {isError && <p className="form__hint status--error">Impossible de charger les recettes.</p>}
          {isSuccess && results.length === 0 && <p className="form__hint">Aucune recette trouvée.</p>}

          {results.length > 0 && (
            <label className="form__field">
              Recette
              <select value={selected?.idMeal ?? ''} onChange={(e) => setSelectedId(e.target.value)}>
                {results.map((result) => (
                  <option key={result.idMeal} value={result.idMeal}>{result.strMeal}</option>
                ))}
              </select>
            </label>
          )}
        </>
      )}

      <label className="form__field">
        Date de consommation
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label className="form__field">
        Repas
        <select value={meal} onChange={(e) => setMeal(e.target.value)}>
          {MEALS.map((m) => <option key={m}>{m}</option>)}
        </select>
      </label>

      <div className="form__actions">
        <button type="button" className="btn btn--ghost" onClick={onClose}>Annuler</button>
        {/* Désactivé tant qu'aucune recette n'est sélectionnée */}
        <button type="submit" className="btn" disabled={!selected}>Planifier</button>
      </div>
    </form>
  )
}
