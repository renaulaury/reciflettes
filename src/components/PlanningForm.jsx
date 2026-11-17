import { useState } from 'react'
import { MEALS } from '../constants.js'
import { endpoints, getIngredients } from '../api/mealdb.js'
import { useFetch } from '../hooks/useFetch.js'
import { useDebounce } from '../hooks/useDebounce.js'
import { useStore } from '../store/useStore.js'
import { toISODate } from '../utils/date.js'

// Formulaire de la modale « Planifier un repas » :
// 1. on cherche une recette TheMealDB par son nom,
// 2. on choisit la date de consommation (et le repas),
// 3. à la validation, la recette + ses ingrédients partent dans le store.
export default function PlanningForm({ onClose }) {
  const planRecipe = useStore((state) => state.planRecipe)

  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [date, setDate] = useState(() => toISODate()) // aujourd'hui par défaut
  const [meal, setMeal] = useState(MEALS[0])

  // Recherche lancée à partir de 2 caractères, après 400 ms sans frappe.
  // search.php renvoie les recettes complètes : les ingrédients sont déjà là,
  // pas besoin d'un second appel à lookup.php.
  const debouncedQuery = useDebounce(query.trim())
  const { data, loading, error } = useFetch(debouncedQuery.length >= 2 ? endpoints.search(debouncedQuery) : null)
  const results = data?.meals ?? []

  // Recette sélectionnée : celle choisie dans la liste, sinon le 1er résultat
  const selected = results.find((recipe) => recipe.idMeal === selectedId) ?? results[0]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selected) return

    planRecipe({
      mealId: selected.idMeal,
      name: selected.strMeal,
      ingredients: getIngredients(selected),
      date, // date de consommation choisie dans la modale
      meal,
    })
    onClose()
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
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

      {/* Messages d'état de la recherche */}
      {loading && <p className="form__hint">Recherche…</p>}
      {error && <p className="form__hint status--error">Impossible de charger les recettes.</p>}
      {data && !data.meals && <p className="form__hint">Aucune recette trouvée.</p>}

      {results.length > 0 && (
        <label className="form__field">
          Recette
          <select value={selected?.idMeal ?? ''} onChange={(e) => setSelectedId(e.target.value)}>
            {results.map((recipe) => (
              <option key={recipe.idMeal} value={recipe.idMeal}>{recipe.strMeal}</option>
            ))}
          </select>
        </label>
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
