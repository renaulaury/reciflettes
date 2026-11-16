import { DAYS, MEALS } from '../constants.js'

export default function PlanningForm({ onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO TD2 : brancher la validation (enregistrement dans le planning)
    onCancel()
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__field">
        Recette
        <input name="recipe" type="text" placeholder="Nom de la recette" required />
      </label>
      <label className="form__field">
        Jour
        <select name="day">
          {DAYS.map((day) => <option key={day}>{day}</option>)}
        </select>
      </label>
      <label className="form__field">
        Repas
        <select name="meal">
          {MEALS.map((meal) => <option key={meal}>{meal}</option>)}
        </select>
      </label>
      <div className="form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>Annuler</button>
        <button type="submit" className="btn">Planifier</button>
      </div>
    </form>
  )
}
