import { Link } from 'react-router-dom'

// Carte cliquable menant à la fiche recette
export default function RecipeCard({ meal }) {
  return (
    <Link to={`/recette/${meal.idMeal}`} className="card">
      {/* « /medium » : vignette allégée fournie par TheMealDB ; lazy = chargée au scroll */}
      <img src={`${meal.strMealThumb}/medium`} alt={meal.strMeal} loading="lazy" />
      <h3 className="card__title">{meal.strMeal}</h3>
    </Link>
  )
}
