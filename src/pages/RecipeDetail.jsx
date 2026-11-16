import { Link } from 'react-router-dom'

export default function RecipeDetail() {
  // TODO : afficher la fiche recette (étape suivante)
  return (
    <section>
      <Link to="/" className="back">← Retour aux recettes</Link>
      <p className="status">En cours de maintenance</p>
    </section>
  )
}
