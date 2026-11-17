// TheMealDB fournit les mesures en texte libre (« 200g », « 1 1/2 cups », « Pinch »…).
// On les découpe en { quantity, unit } pour pouvoir modifier la quantité séparément.

const UNICODE_FRACTIONS = { '½': 1 / 2, '¼': 1 / 4, '¾': 3 / 4, '⅓': 1 / 3, '⅔': 2 / 3, '⅛': 1 / 8 }

// Un nombre en début de chaîne : entier, décimal (point ou virgule), fraction « 1/2 » ou « ½ »
const LEADING_NUMBER = /^(\d+(?:[.,]\d+)?(?:\/\d+)?|[½¼¾⅓⅔⅛])\s*/

function toNumber(token) {
  if (token in UNICODE_FRACTIONS) return UNICODE_FRACTIONS[token]
  if (token.includes('/')) {
    const [numerator, denominator] = token.split('/').map(Number)
    return denominator ? numerator / denominator : numerator
  }
  return Number(token.replace(',', '.'))
}

// « 1 1/2 cups » → { quantity: 1.5, unit: 'cups' }
// « Pinch »      → { quantity: null, unit: 'Pinch' } (pas de quantité chiffrée)
export function parseMeasure(measure = '') {
  let rest = measure.trim()
  let quantity = null
  let match
  // On additionne les nombres successifs pour gérer « 1 1/2 » ou « 1½ »
  while ((match = rest.match(LEADING_NUMBER))) {
    quantity = (quantity ?? 0) + toNumber(match[1])
    rest = rest.slice(match[0].length)
  }
  return {
    quantity: quantity === null ? null : Math.round(quantity * 100) / 100,
    unit: rest,
  }
}
