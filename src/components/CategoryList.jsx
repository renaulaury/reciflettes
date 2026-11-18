import { useQuery } from '@tanstack/react-query'
import { categoriesQuery } from '../api/mealdb.js'

// Liste des catégories TheMealDB 
export default function CategoryList({ selected, onSelect }) {
  const { data: categories, isPending, isError } = useQuery(categoriesQuery())

  if (isPending) return <p className="status">Chargement des catégories…</p>
  if (isError) return <p className="status status--error">Impossible de charger les catégories.</p>
  if (categories.length === 0) return <p className="status">Aucune catégorie disponible.</p>

  return (
    <div className="categories">
      {categories.map((cat) => (
        <button
          key={cat.idCategory}
          type="button"
          className={`chip ${cat.strCategory === selected ? 'chip--active' : ''}`}
          onClick={() => onSelect(cat.strCategory)}
        >
          {cat.strCategory}
        </button>
      ))}
    </div>
  )
}
