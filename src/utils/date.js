// Les dates sont stockées au format 'YYYY-MM-DD' en heure locale :
// c'est le format des <input type="date"> et deux dates se comparent
// (et se trient) directement comme des chaînes.
export function toISODate(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Bornes (lundi → dimanche) de la semaine qui contient `date`
export function getWeekBounds(date = new Date()) {
  const monday = new Date(date)
  // getDay() : 0 = dimanche … 6 = samedi → nombre de jours écoulés depuis lundi
  monday.setDate(date.getDate() - ((date.getDay() + 6) % 7))
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  return { start: toISODate(monday), end: toISODate(sunday) }
}

// 'YYYY-MM-DD' → « mardi 17 novembre » (construit en heure locale pour éviter
// le décalage d'un jour qu'on aurait avec new Date('YYYY-MM-DD'), lu en UTC)
export function formatDate(isoDate, options = { weekday: 'long', day: 'numeric', month: 'long' }) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('fr-FR', options)
}
