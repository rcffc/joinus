import { groups, users, events } from '../fb.js'

const getData = doc => {
  const data = doc.data()

  if (!data)
    throw Error('Group not found')

  return { ...data, id: doc.id }
}

const getMembers = async doc => {
  try {
    let members = await Promise.all(Object.keys(doc.members).map(id => users.doc(id).get()))
    members = members.map(m => ({ ...m.data(), id: m.id, role: doc.members[m.id] }))

    return { ...doc, members }
  }
  catch (err) {
    return Promise.reject(err)
  }
}

const simplifyMembers = mems => {
  return mems.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.role }),{})
}

const addMember = async (data) => {
  try {
    const doc = getData(await groups.doc(data.group).get())
  
    let members = doc.members
    members[data.user]= 'member'
    
    await groups.doc(data.group).update({ members })
    return getData(await groups.doc(data.group).get())
  } 
  catch (err) {
    return Promise.reject(err)
  }
}

const removeMember = async (data) => {
  try {
    const doc = getData(await groups.doc(data.group).get())
  
    let members = doc.members
    delete members[data.user]
    await groups.doc(data.group).update({ members })
    return getData(await groups.doc(data.group).get())
  } 
  catch (err) {
    return Promise.reject(err)
  }
}

const getAll = async () => {
  try {
    const { docs } = await groups.get()

    let result = docs.map(getData)

    result = await Promise.all(result.map(getMembers))

    return result
  }
  catch (err) {
    return Promise.reject(err)
  }
}

const getGroup = async (id) => {
  try {
    return getMembers(getData(await groups.doc(id).get()))
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
  data.members = simplifyMembers(data.members)

  await groups.doc(id).set(data)

  return getGroup(id)
}

const removeById = async (id) => {
  try {
    const ownedEvents = await events.where('organizer', '==', id).get()
    await Promise.all(ownedEvents.docs.map(event => event.ref.delete()))
    await groups.doc(id).delete()
  }
  catch (err) {
    return Promise.reject(err)
  }
}

export default {
  getAll,
  getGroup,
  createGroup,
  editGroup,
  removeById,
  addMember,
  removeMember
}