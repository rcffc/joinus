import { events, groups } from '../fb.js'

const getAll = async () => {
  try {
    const { docs } = await events.get()

    let result = docs.map(doc => ( 
      { ...doc.data(), id: doc.id }
    ))

    result = await Promise.all(result.map(async doc => {
      let organizer = await groups.doc(doc.organizer).get()
      organizer = { ...organizer.data(), id: doc.organizer }

      return { ...doc, organizer }

    }))

    return result
  }
  catch (err) {
    return Promise.reject(err)
  }
}

export default {
  getAll
}