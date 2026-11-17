import { useCallback, useState } from 'react'

// Booléen on/off (ex. ouverture de la modale). Les fonctions sont mémorisées
// avec useCallback pour rester stables entre deux rendus.
export function useToggle(initialValue = false) {
  const [isOn, setIsOn] = useState(initialValue)
  const toggle = useCallback(() => setIsOn((value) => !value), [])
  const open = useCallback(() => setIsOn(true), [])
  const close = useCallback(() => setIsOn(false), [])
  return { isOn, toggle, open, close }
}
