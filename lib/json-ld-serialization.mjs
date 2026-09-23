/**
 * Serialize structured data safely for an HTML script element.
 * JSON.stringify alone leaves HTML-significant characters such as `<` untouched,
 * which can terminate a script element when a value comes from a content system.
 * @param {unknown} value
 * @returns {string}
 */
export function serializeJsonLd(value) {
  const json = JSON.stringify(value)
  if (typeof json !== 'string') throw new TypeError('JSON-LD value must be serializable')

  return json.replace(/[<>&\u2028\u2029]/g, (character) => {
    switch (character) {
      case '<': return '\\u003c'
      case '>': return '\\u003e'
      case '&': return '\\u0026'
      case '\u2028': return '\\u2028'
      default: return '\\u2029'
    }
  })
}
