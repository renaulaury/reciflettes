import { endpoints } from '../api/mealdb.js'
import { useFetch } from '../hooks/useFetch.js'

export default function CategoryList({ selected, onSelect }) {
  const { data, loading, error } = useFetch(endpoints.categories())

  if (loading) return <p className="status">Chargement des catégories…</p>
  if (error) return <p className="status status--error">Impossible de charger les catégories.</p>

  return (
    <div className="categories">
      {data.categories.map((cat) => (
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
