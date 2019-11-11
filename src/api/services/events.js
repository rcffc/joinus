import { events, groups } from '../fb.js'
import moment from 'moment'

const getData = doc => {
  const data = doc.data()

  if (!data)
    throw Error('Event not found')

  return { ...data, id: doc.id }
}

const getOrganizer = async doc => {
  let organizer = await groups.doc(doc.organizer).get()
  organizer = { ...organizer.data(), id: doc.organizer }

  return { ...doc, organizer }

}

const formatEvent = event => {
  const date = event.date.toDate()
  const month = date.getMonth()
  const shortDate = moment(date).format('DD.MM')
  const time = moment(date).format('H:mm')
  return (
    { ...event, date, month, time, shortDate}
  )
}

const getAll = async () => {
  try {
    const { docs } = await events.get()

    let result = docs.map(getData)

    result = await Promise.all(result.map(getOrganizer))

    result = result.map(formatEvent)

    return result
  }
  catch (err) {
    return Promise.reject(err)
  }
}

const getEvent = async (id) => {
  try { 
    return formatEvent(await getOrganizer(getData(await events.doc(id).get())))
  }
  catch (err) {
    return Promise.reject(err)
  }
}

const createEvent = async (data) => {
  try {
    const ref = await events.add(data)
    const doc = await ref.get()
    
    return getData(doc)
  }
  catch (err) {
    return Promise.reject(err)
  }
}

const editEvent = async (id, data) => {
  await events.doc(id).set(data)

  return getEvent(id)
}

export default {
  getAll,
  getEvent,
  createEvent,
  editEvent
}