export function get(key){
  return JSON.parse(localStorage.getItem(key))
}
export function set(key, value){
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    return false
  }
}
