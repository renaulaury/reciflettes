import { useQuery } from '@tanstack/react-query'
import { byCategoryQuery, searchQuery } from '../api/mealdb.js'
import RecipeCard from './RecipeCard.jsx'

// si `search` rempli, sinon catégorie. (chargement / erreur / aucun résultat)
export default function RecipeGrid({ category, search }) {
  // Un seul useQuery ( options => clé différente = cache différent)
  const { data: meals, isPending, isError } = useQuery(search ? searchQuery(search) : byCategoryQuery(category))

  if (isPending) return <p className="status">Chargement des recettes…</p>
  if (isError) return <p className="status status--error">Impossible de charger les recettes.</p>
  if (meals.length === 0) return <p className="status">Aucune recette trouvée.</p>

  return (
    <div className="grid">
      {meals.map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  )
}
