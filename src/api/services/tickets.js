import { tickets } from '../fb.js'

const getData = doc => {
  const data = doc.data()

  if (!data)
    throw Error('Group not found')

  return { ...data, id: doc.id }
}

const createTicket = async (data) => {
  try {
    const ref = await tickets.add(data)
    const doc = await ref.get()
    return getData(doc)
  }
  catch (err) {
    return Promise.reject(err)
  }
}

const removeById = async (id) => tickets.doc(id).delete()

const findByGroup = async (group) => {
  try {
    const { docs } = await tickets.get()
    let result = docs.map(getData)
    result = result.filter(ticket => ticket['group'] === group)
    result = await Promise.all(result)
    return result
  }
  catch (err) {
    return Promise.reject(err)
  }
}

export default {
  createTicket,
  findByGroup,
  removeById
}