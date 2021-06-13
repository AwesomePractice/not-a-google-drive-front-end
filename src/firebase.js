import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCLr1Ext-JreRa7YuKkvZecY9ph2ZqLaSo",
    authDomain: "notadrive-dfe0e.firebaseapp.com",
    projectId: "notadrive-dfe0e",
    storageBucket: "notadrive-dfe0e.appspot.com",
    messagingSenderId: "325253621998",
    appId: "1:325253621998:web:af0f3c5c5cf10a4a09abff"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()
  const storage = firebase.storage()
  const db = firebaseApp.firestore()

  export {auth, provider, db, storage}