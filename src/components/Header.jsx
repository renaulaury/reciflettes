import { NavLink } from 'react-router-dom'

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
