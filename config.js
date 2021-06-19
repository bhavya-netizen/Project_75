import firebase from 'firebase';
require("@firebase/firestore")

var firebaseConfig = {
    apiKey: "AIzaSyAZuqwKwPgBrHBMQ2HJMVOduysNnAAbhlI",
    authDomain: "bowling-game-65a38.firebaseapp.com",
    databaseURL: "https://bowling-game-65a38-default-rtdb.firebaseio.com",
    projectId: "bowling-game-65a38",
    storageBucket: "bowling-game-65a38.appspot.com",
    messagingSenderId: "820738830815",
    appId: "1:820738830815:web:a8d1c6b7f7b5c1782a946a"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();