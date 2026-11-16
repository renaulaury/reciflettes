import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="status">
      <h1>Page introuvable</h1>
      <Link to="/" className="btn">Retour à l'accueil</Link>
    </section>
  )
}
