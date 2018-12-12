 import firebase from 'firebase/app'
 import 'firebase/firestore'
 import 'firebase/auth'
 import 'firebase/storage'

 // Initialize Firebase
 var config = {
    apiKey: "AIIGDJG",
    authDomain: "bck",
    databaseURL: "https://bck",
    projectId: "bck",
    storageBucket: "appspot.com",
    messagingSenderId: "10148522128"
  };
  
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase
