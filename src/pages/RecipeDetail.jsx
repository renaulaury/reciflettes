import { Link, useParams } from 'react-router-dom'
import { endpoints, getIngredients } from '../api/mealdb.js'
import { useFetch } from '../hooks/useFetch.js'

export default function RecipeDetail() {
  const { id } = useParams()
  const { data, loading, error } = useFetch(endpoints.recipe(id))

  if (loading) return <p className="status">Chargement de la recette…</p>
  if (error) return <p className="status status--error">Impossible de charger la recette.</p>
  const meal = data?.meals?.[0]
  if (!meal) return <p className="status">Recette introuvable.</p>

  return (
    <article className="recipe">
      <Link to="/" className="back">← Retour aux recettes</Link>
      <h1>{meal.strMeal}</h1>
      <p className="recipe__meta">{meal.strCategory} · {meal.strArea}</p>
      <div className="recipe__layout">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe__img" />
        <section>
          <h2>Ingrédients</h2>
          <ul className="ingredients">
            {getIngredients(meal).map((ing) => (
              <li key={ing.name}><span>{ing.name}</span><span>{ing.measure}</span></li>
            ))}
          </ul>
        </section>
      </div>
      <section>
        <h2>Préparation</h2>
        <p className="recipe__instructions">{meal.strInstructions}</p>
        {meal.strYoutube && (
          <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="btn">▶ Voir la vidéo</a>
        )}
      </section>
    </article>
  )
}
