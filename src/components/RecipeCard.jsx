import { Link } from 'react-router-dom'

export default function RecipeCard({ meal }) {
  return (
    <Link to={`/recette/${meal.idMeal}`} className="card">
      <img src={`${meal.strMealThumb}/medium`} alt={meal.strMeal} loading="lazy" />
      <h3 className="card__title">{meal.strMeal}</h3>
    </Link>
  )
}
