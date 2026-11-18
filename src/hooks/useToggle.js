import { useCallback, useState } from 'react'

// ouverture de la modale
export function useToggle(initialValue = false) {
  const [isOn, setIsOn] = useState(initialValue)
  const toggle = useCallback(() => setIsOn((value) => !value), [])
  const open = useCallback(() => setIsOn(true), [])
  const close = useCallback(() => setIsOn(false), [])
  return { isOn, toggle, open, close }
}
