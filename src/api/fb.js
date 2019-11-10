//NOTE: This module should only be accessed by files under the api/ directory.
//This way, the rest of the application is independent of the backend solution.

import firebase from 'firebase'

//This is bad mmkay.
//This object should be costructed from .env you're running a dev build.

firebase.initializeApp({
  apiKey: 'AIzaSyBBpYJPyjLLhz7HjaN1mVW_2P43t9C3j88',
  authDomain: 'join-us-fbc65.firebaseapp.com',
  databaseURL: 'https://join-us-fbc65.firebaseio.com',
  projectId: 'join-us-fbc65',
  storageBucket: 'join-us-fbc65.appspot.com',
  messagingSenderId: '693198144747',
  appId: '1:693198144747:web:6db5b2f65d71470defeaae',
  measurementId: 'G-G4FMBGGYGV'
})

const db = firebase.firestore()

export const events = db.collection('events')
export const groups = db.collection('groups')
export const users = db.collection('users')

export const auth = firebase.auth()