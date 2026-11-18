import { NavLink } from 'react-router-dom'

// Liens de navigation : ajouter une entrée ici suffit pour l'afficher dans le menu
const links = [
  { to: '/', label: 'Accueil' },
  { to: '/courses', label: 'Liste de courses' },
  { to: '/planning', label: 'Planning' },
]

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <NavLink to="/" className="header__logo">
          <img src="/logo.svg" alt="" />
          Reciflettes
        </NavLink>
        <nav className="header__nav">
          {/* NavLink ajoute la classe .active sur la page courante ; `end` évite que « / » reste actif partout */}
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end className="header__link">
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
