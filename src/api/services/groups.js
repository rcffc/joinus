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

const createGroup = async (data) => {
  try {
    const ref = await groups.add(data)
    const doc = await ref.get()
    
    return getData(doc)
  }
  catch (err) {
    return Promise.reject(err)
  }
}

const editGroup = async (id, data) => {
  await groups.doc(id).set(data)

  return getGroup(id)
}

export default {
  getAll,
  getGroup,
  createGroup,
  editGroup
}