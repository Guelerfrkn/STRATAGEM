/* ────────── deep clone ────────── */
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj))

/* ────────── validation ────────── */
export const hasError = (value, label) => {
  if (label === 'Total Unallocated') return false
  if (value === '') return true
  if (isNaN(value)) return true
  if (value < 0) return true
  return false
}

export const getErrorMessage = (value, label) => {
  if (value === '') return 'Value is required'
  if (isNaN(value)) return 'Must be a number'
  if (value < 0) return 'Cannot be negative'
  return 'Invalid value'
}

/* ────────── input handling ────────── */
export const validateInput = (event, values, index, isBlur = false) => {
  const value = event.target.value
  if (value === '') {
    values[index] = ''
    return
  }

  const num = Number(value)
  if (!isNaN(num)) {
    values[index] = isBlur ? num : value
  }
}

/* ────────── storage ────────── */
export const loadGame = (id) => {
  const list = JSON.parse(localStorage.getItem('savedGames') || '[]')
  return list.find(g => g.id === id)
}

export const saveGame = (game) => {
  const all = JSON.parse(localStorage.getItem('savedGames') || '[]')
  const idx = all.findIndex(g => g.id === game.id)
  if (idx !== -1) all[idx] = game
  localStorage.setItem('savedGames', JSON.stringify(all))
} 