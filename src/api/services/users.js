import { users } from '../fb.js'

const createUser = (username) => users.add({ username })

export default {
  createUser
}