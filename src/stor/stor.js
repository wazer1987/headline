const KEY = 'Headlines'
export default {
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  removeUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
