import { useEffect, useState } from 'react'

// Evite de répéter fetch + useEffect + useState dans chaque composant
export function useFetch(url) {
  const [result, setResult] = useState({ url: null, data: null, error: null })

  useEffect(() => {
    if (!url) return
    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur ${res.status}`)
        return res.json()
      })
      .then((data) => setResult({ url, data, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') setResult({ url, data: null, error })
      })

    return () => controller.abort()
  }, [url])

  // Le résultat n'est valide que s'il correspond à l'URL demandée
  const isCurrent = result.url === url
  return {
    data: isCurrent ? result.data : null,
    error: isCurrent ? result.error : null,
    loading: Boolean(url) && !isCurrent,
  }
}
