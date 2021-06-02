// import * as firebase from 'firebase'
// import '@firebase/auth'
// import '@firebase/firestore'

// import {
//   FIREBASE_API_KEY,
//   FIREBASE_AUTH_DOMAIN,
//   FIREBASE_DATABASE_URL,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_STORAGE_BUCKET,
//   FIREBASE_MESSAGING_SENDER_ID,
//   FIREBASE_APP_ID,
// } from '@env'

// const firebaseConfig = {
//   apiKey: FIREBASE_API_KEY,
//   authDomain: FIREBASE_AUTH_DOMAIN,
//   databaseURL: FIREBASE_DATABASE_URL,
//   projectId: FIREBASE_PROJECT_ID,
//   storageBucket: FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
//   appId: FIREBASE_APP_ID,
// }

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig)
// }

// export { firebase }
import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBH-rhyR8tHJ0b6jsCqVkkZeYQKgKinndo',
  authDomain: 'fishingbuddy-web.firebaseapp.com',
  databaseURL: 'https://fishingbuddy-mobile.firebaseio.com',
  projectId: 'fishingbuddy-web',
  storageBucket: 'fishingbuddy-web.appspot.com',
  messagingSenderId: '1004313328108',
  appId: '1:1004313328108:web:7f3ef10e51cab8fcb168c9',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase }
