import { useEffect, useState } from 'react'
import { endpoints } from '../api/mealdb.js'
import { useToggle } from '../hooks/useToggle.js'
import SearchBar from '../components/SearchBar.jsx'
import CategoryList from '../components/CategoryList.jsx'
import RecipeGrid from '../components/RecipeGrid.jsx'
import Modal from '../components/Modal.jsx'
import PlanningForm from '../components/PlanningForm.jsx'

// Page d'accueil : recherche, catégories, grille de recettes et modale de planification
export default function Home() {
  const [category, setCategory] = useState('Beef')
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const modal = useToggle()

  // Debounce : on attend 400 ms sans frappe avant de lancer la recherche
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 400)
    return () => clearTimeout(timer)
  }, [query])

  // Une recherche en cours prend le pas sur la catégorie sélectionnée
  const url = debouncedQuery ? endpoints.search(debouncedQuery) : endpoints.byCategory(category)

  return (
    <>
      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <button type="button" className="btn" onClick={modal.open}>Planifier un repas</button>
      </div>
      {/* Choisir une catégorie vide la recherche */}
      <CategoryList selected={debouncedQuery ? null : category} onSelect={(c) => { setCategory(c); setQuery('') }} />
      <h2 className="section-title">{debouncedQuery ? `Résultats pour « ${debouncedQuery} »` : category}</h2>
      <RecipeGrid url={url} />
      {modal.isOn && (
        <Modal title="Planifier un repas" onClose={modal.close}>
          <PlanningForm onCancel={modal.close} />
        </Modal>
      )}
    </>
  )
}
