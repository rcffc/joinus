import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyBBpYJPyjLLhz7HjaN1mVW_2P43t9C3j88",
  authDomain: "join-us-fbc65.firebaseapp.com",
  databaseURL: "https://join-us-fbc65.firebaseio.com",
  projectId: "join-us-fbc65",
  storageBucket: "join-us-fbc65.appspot.com",
  messagingSenderId: "693198144747",
  appId: "1:693198144747:web:6db5b2f65d71470defeaae",
  measurementId: "G-G4FMBGGYGV"
});

const db = firebase.firestore();

export default {
  events: db.collection("events")
};