import { groups } from '../fb.js'

const getAll = async () => {
  try {
    const { docs } = await groups.get()

    return docs.map(doc => ( 
      { ...doc.data(), id: doc.id }
    ))
  }
  catch (err) {
    return Promise.reject(err)
  }
}

const getGroup = async (id) => {
  try {
    const doc = await groups.doc(id).get()

    return doc.data()
  }
  catch (err) {
    return Promise.reject(err)
  }
}

export default {
  getAll,
  getGroup
}