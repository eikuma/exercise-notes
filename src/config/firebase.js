import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCp-iPHJbAJNgb3HUJLppru2RkCnaMx6CE",
    authDomain: "exercise-notes-f5416.firebaseapp.com",
    projectId: "exercise-notes-f5416",
    storageBucket: "exercise-notes-f5416.appspot.com",
    messagingSenderId: "531280562248",
    appId: "1:531280562248:web:e76b2919b3e12538b9307d",
    measurementId: "G-CSWC7WSYBL"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth=firebase.auth()
export const db=firebase.firestore()
