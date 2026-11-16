export default function ShoppingList() {
  // TODO TD2 : générer la liste à partir des recettes planifiées
  const items = []

  return (
    <section>
      <h1>Liste de courses</h1>
      {items.length === 0 ? (
        <p className="status">Ta liste est vide. Planifie des repas pour la remplir.</p>
      ) : (
        <ul className="ingredients">
          {items.map((item) => <li key={item.name}>{item.name}</li>)}
        </ul>
      )}
    </section>
  )
}
