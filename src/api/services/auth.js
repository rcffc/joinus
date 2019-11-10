import { auth } from '../fb.js'

const emailRegistration = (email, password) => auth.createUserWithEmailAndPassword(email, password)

const emailLogin = (email, password) => auth.signInWithEmailAndPassword(email, password)

const logOut = () => auth.signOut()

export default {
  emailRegistration,
  emailLogin,
  logOut
}