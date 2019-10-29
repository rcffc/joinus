import { groups } from '../fb.js'


const getData = doc => {
  const data = doc.data()

  if (!data)
    throw Error('Group not found')

  return { ...data, id: doc.id }
}

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