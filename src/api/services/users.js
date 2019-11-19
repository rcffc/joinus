import { users } from '../fb.js'

const createUser = (username, id) => users.doc(id).set({ username, following: [] })

const getData = doc => {
  const data = doc.data()

  if (!data)
    throw Error('User not found')

  return { ...data, id: doc.id }
}

const getUser = async (id) => {
  try {
    return getData(await users.doc(id).get())
  }
  catch (err) {
    return Promise.reject(err)
  }
}

const editUser = async (userId, eventId) => {
  try {
    const doc = getData(await users.doc(userId).get())

    let following = doc.following
    if (following.includes(eventId)) {
      following = following.filter(id => id !== eventId)
    } else {
      following.push(eventId)
    }
    
    await users.doc(userId).update({ following })

    return getData(await users.doc(userId).get())
  }
  catch (err) {
    return Promise.reject(err)
  }
}

export default {
  createUser,
  getUser,
  editUser
}