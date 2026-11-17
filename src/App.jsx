import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import ShoppingList from './pages/ShoppingList.jsx'
import Planning from './pages/Planning.jsx'
import NotFound from './pages/NotFound.jsx'

// Squelette de l'application : header commun + une page par route.
// Le BrowserRouter est posé dans main.jsx.
export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* :id = identifiant TheMealDB (idMeal) */}
          <Route path="/recette/:id" element={<RecipeDetail />} />
          <Route path="/courses" element={<ShoppingList />} />
          <Route path="/planning" element={<Planning />} />
          {/* Toute URL inconnue tombe sur la page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}
