import { events } from '../fb.js'

const getAll = async () => {
  try {
    const { docs } = await events.get()

    return docs.map(doc => ( 
      { ...doc.data(), id: doc.id }
    ))
  }
  catch (err) {
    return Promise.reject(err)
  }
}

export default {
  getAll
}