import { useEffect } from 'react'

// Modale générique : fermeture par la croix, la touche Échap ou un clic sur le fond
export default function Modal({ title, onClose, children }) {
  // Écoute Échap tant que la modale est affichée (nettoyage au démontage)
  useEffect(() => {
    const onKeyDown = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="modal__backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        // Empêche un clic dans la modale de remonter jusqu'au fond (qui la fermerait)
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="modal-title">{title}</h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
