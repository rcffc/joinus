import { users } from '../fb.js'

const createUser = (username, id) => users.doc(id).set({ username, following: [] })

const getData = doc => {
  const data = doc.data()

  if (!data)
    throw Error('User not found')

  return data
}

const getUser = async (id) => {
  try {
    return getData(await users.doc(id).get())
  }
  catch (err) {
    return Promise.reject(err)
  }
}
export default {
  createUser,
  getUser
}