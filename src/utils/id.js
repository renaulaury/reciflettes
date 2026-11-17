// Identifiant unique pour chaque planification / ligne d'ingrédient.
// crypto.randomUUID n'existe qu'en contexte sécurisé (https ou localhost) :
// repli maison si l'appli est servie en http (ex. reciflettes.test sous Laragon).
export function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}
