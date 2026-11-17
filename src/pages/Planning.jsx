import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
// FullCalendar v7 : tout est dans @fullcalendar/react, les plugins s'importent par sous-chemin
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/react/daygrid'
import interactionPlugin from '@fullcalendar/react/interaction'
import classicThemePlugin from '@fullcalendar/react/themes/classic'
import frLocale from '@fullcalendar/react/locales/fr'
import '@fullcalendar/react/skeleton.css'
import '@fullcalendar/react/themes/classic/theme.css'
import '@fullcalendar/react/themes/classic/palette.css'
import { useStore } from '../store/useStore.js'
import { MEALS } from '../constants.js'
import { formatDate, toISODate } from '../utils/date.js'
import Modal from '../components/Modal.jsx'
import PlanningForm from '../components/PlanningForm.jsx'

// Page Planning : les recettes planifiées du store affichées dans un calendrier.
// - clic sur un repas  → détail + suppression
// - glisser un repas   → change sa date (bonus)
// - clic sur un jour   → planifier un repas ce jour-là
export default function Planning() {
  // Lecture du store avec des sélecteurs (re-rendu seulement si la valeur change)
  const plannedRecipes = useStore((state) => state.plannedRecipes)
  const removePlannedRecipe = useStore((state) => state.removePlannedRecipe)
  const updatePlannedRecipeDate = useStore((state) => state.updatePlannedRecipeDate)

  // Modale ouverte : null, { type: 'details', id } ou { type: 'plan', date }
  const [dialog, setDialog] = useState(null)
  const closeDialog = () => setDialog(null)

  // Recettes planifiées → événements FullCalendar.
  // useMemo : on ne recrée le tableau que si le store change.
  const events = useMemo(
    () =>
      plannedRecipes.map((recipe) => ({
        id: recipe.id, // id de planification → retrouver l'entrée du store au clic / au déplacement
        title: recipe.meal ? `${recipe.meal} · ${recipe.name}` : recipe.name,
        start: recipe.date, // 'YYYY-MM-DD'
        allDay: true,
        order: MEALS.indexOf(recipe.meal), // Midi avant Soir dans une même journée
      })),
    [plannedRecipes],
  )

  // Repas affiché dans la modale de détail (lu dans le store, pas dans FullCalendar)
  const selected = dialog?.type === 'details' ? plannedRecipes.find((recipe) => recipe.id === dialog.id) : null

  const handleDelete = () => {
    removePlannedRecipe(selected.id)
    closeDialog()
  }

  return (
    <section>
      <div className="planning__header">
        <h1 className="section-title">Planning</h1>
        <button type="button" className="btn" onClick={() => setDialog({ type: 'plan', date: toISODate() })}>
          Planifier un repas
        </button>
      </div>
      <p className="planning__hint">Cliquez sur un repas pour le voir ou le supprimer, faites-le glisser pour changer sa date.</p>

      <div className="planning-calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, classicThemePlugin]}
          locale={frLocale} // textes en français + semaine commençant le lundi
          initialView="dayGridMonth"
          headerToolbar={{ start: 'prev,next today', center: 'title', end: 'dayGridMonth,dayGridWeek' }}
          height="auto"
          events={events}
          eventOrder="order,title"
          editable // autorise le glisser-déposer des événements
          eventDurationEditable={false} // un repas dure un jour : pas d'étirement
          eventClick={(info) => setDialog({ type: 'details', id: info.event.id })}
          // L'événement a été lâché sur un autre jour : on met à jour le store,
          // qui renvoie la nouvelle liste d'événements au calendrier.
          eventDrop={(info) => updatePlannedRecipeDate(info.event.id, toISODate(info.event.start))}
          dateClick={(info) => setDialog({ type: 'plan', date: info.dateStr })}
        />
      </div>

      {selected && (
        <Modal title={selected.name} onClose={closeDialog}>
          <p className="planning__detail">
            {formatDate(selected.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            {selected.meal && ` · ${selected.meal}`}
          </p>
          <Link to={`/recette/${selected.mealId}`} className="back">Voir la fiche recette →</Link>
          <div className="form__actions">
            <button type="button" className="btn btn--ghost" onClick={closeDialog}>Fermer</button>
            <button type="button" className="btn btn--danger" onClick={handleDelete}>Supprimer du planning</button>
          </div>
        </Modal>
      )}

      {dialog?.type === 'plan' && (
        <Modal title="Planifier un repas" onClose={closeDialog}>
          <PlanningForm initialDate={dialog.date} onClose={closeDialog} />
        </Modal>
      )}
    </section>
  )
}
