import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore.js'
import { formatDate, getWeekBounds } from '../utils/date.js'

// Liste de courses : ingr de la semaine courante (tri date conso + jour)
export default function ShoppingList() {
  // le composant ne se re-rend que si elle change
  const ingredients = useStore((state) => state.ingredients)
  const plannedRecipes = useStore((state) => state.plannedRecipes)
  const updateIngredient = useStore((state) => state.updateIngredient)
  const removeIngredient = useStore((state) => state.removeIngredient)

  const { start, end } = getWeekBounds()

  // planningId → nom de la recette, pour afficher la provenance de chaque ligne
  const recipeNames = new Map(plannedRecipes.map((recipe) => [recipe.id, recipe.name]))

  // Tabl filtré pour groupé ingr
  const weekIngredients = ingredients
    .filter((item) => item.date >= start && item.date <= end)
    .sort((a, b) => a.date.localeCompare(b.date))

  // Regroupement par date (déjà triée) : [{ date, items: [...] }, ...]
  const days = []
  for (const item of weekIngredients) {
    const lastDay = days.at(-1)
    if (lastDay?.date === item.date) lastDay.items.push(item)
    else days.push({ date: item.date, items: [item] })
  }

  return (
    <section>
      <h1 className="section-title">Liste de courses</h1>
      <p className="shopping__week">
        Semaine du {formatDate(start, { day: 'numeric', month: 'long' })} au {formatDate(end, { day: 'numeric', month: 'long' })}
      </p>

      {days.length === 0 ? (
        <div className="status">
          <p>Aucun ingrédient prévu cette semaine.</p>
          <Link to="/" className="btn">Planifier un repas</Link>
        </div>
      ) : (
        days.map((day) => (
          <div key={day.date} className="shopping__day">
            <h2 className="shopping__day-title">{formatDate(day.date)}</h2>
            <ul className="shopping__list">
              {day.items.map((item) => (
                <ShoppingItem
                  key={item.id}
                  item={item}
                  recipeName={recipeNames.get(item.planningId) ?? 'Recette retirée du planning'}
                  onUpdate={(changes) => updateIngredient(item.id, changes)}
                  onRemove={() => removeIngredient(item.id)}
                />
              ))}
            </ul>
          </div>
        ))
      )}
    </section>
  )
}

// Une ligne d'ingr éditable : qté, unité, date, suppression.
function ShoppingItem({ item, recipeName, onUpdate, onRemove }) {
  return (
    <li className="shopping__item">
      <div className="shopping__name">
        <strong>{item.name}</strong>
        <span className="shopping__recipe">{recipeName}</span>
      </div>
      <input
        type="number"
        min="0"
        step="any"
        placeholder="Qté"
        aria-label={`Quantité de ${item.name}`}
        value={item.quantity ?? ''}
        onChange={(e) => onUpdate({ quantity: e.target.value === '' ? null : Number(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Unité"
        aria-label={`Unité de ${item.name}`}
        value={item.unit}
        onChange={(e) => onUpdate({ unit: e.target.value })}
      />
      <input
        type="date"
        aria-label={`Date de consommation de ${item.name}`}
        value={item.date}
        onChange={(e) => e.target.value && onUpdate({ date: e.target.value })}
      />
      <button type="button" className="shopping__remove" onClick={onRemove} aria-label={`Supprimer ${item.name}`}>
        ✕
      </button>
    </li>
  )
}
