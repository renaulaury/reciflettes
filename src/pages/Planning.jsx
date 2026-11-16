import { DAYS, MEALS } from '../constants.js'

export default function Planning() {
  // TODO TD2 : afficher les repas enregistrés
  return (
    <section>
      <h1>Planning de la semaine</h1>
      <div className="planning">
        {DAYS.map((day) => (
          <div key={day} className="planning__day">
            <h3>{day}</h3>
            {MEALS.map((meal) => (
              <div key={meal} className="planning__slot">
                <span className="planning__label">{meal}</span>
                <span className="planning__empty">—</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
