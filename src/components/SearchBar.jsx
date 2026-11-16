export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      className="search"
      placeholder="Rechercher une recette par nom…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Rechercher une recette"
    />
  )
}
