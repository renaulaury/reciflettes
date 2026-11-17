import { useEffect, useState } from 'react'

// Renvoie `value` seulement après `delay` ms sans changement.
// Sert à ne pas appeler l'API à chaque frappe dans un champ de recherche.
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
