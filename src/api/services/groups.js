import { groups } from '../fb.js'

const getData = doc => ( 
  { ...doc.data(), id: doc.id }
)

const getAll = async () => {
  try {
    const { docs } = await groups.get()

    return docs.map(getData)
  }
  catch (err) {
    return Promise.reject(err)
  }
}

const getGroup = async (id) => {
  try {
    return getData(await groups.doc(id).get())
  }
  catch (err) {
    return Promise.reject(err)
  }
}

export default {
  getAll,
  getGroup
}