import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import ShoppingList from './pages/ShoppingList.jsx'
import Planning from './pages/Planning.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recette/:id" element={<RecipeDetail />} />
          <Route path="/courses" element={<ShoppingList />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}
