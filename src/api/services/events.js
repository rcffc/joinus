import { events, groups } from '../fb.js'
import moment from 'moment'

const getAll = async () => {
  try {
    const { docs } = await events.get()

    let result = docs.map(doc => ( 
      { ...doc.data(), id: doc.id}
    ))

    result = await Promise.all(result.map(async doc => {
      let organizer = await groups.doc(doc.organizer).get()
      organizer = organizer.data()

      return { ...doc, organizer }

    }))

    result = result.map(result => {
      const date = result.date.toDate()
      const month = date.getMonth()
      const shortDate = moment(date).format('DD.MM')
      const time = moment(date).format('H:mm')
      return (
        { ...result, date, month, time, shortDate}
      )
    })
    
    return result
  }
  catch (err) {
    return Promise.reject(err)
  }
}

export default {
  getAll
}