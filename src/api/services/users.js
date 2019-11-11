import { users } from '../fb.js'

const createUser = (username, id) => users.doc(id).set({ username })

export default {
  createUser
}