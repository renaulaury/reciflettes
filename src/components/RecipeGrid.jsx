import { useFetch } from '../hooks/useFetch.js'
import RecipeCard from './RecipeCard.jsx'

export default function RecipeGrid({ url }) {
  const { data, loading, error } = useFetch(url)

  if (loading) return <p className="status">Chargement des recettes…</p>
  if (error) return <p className="status status--error">Impossible de charger les recettes.</p>
  if (!data?.meals) return <p className="status">Aucune recette trouvée.</p>

  return (
    <div className="grid">
      {data.meals.map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  )
}
