import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD5BuHgShitbp4jAxammwyJWcBtTAUvWnI",
    authDomain: "instagram-clone-ca3e7.firebaseapp.com",
    projectId: "instagram-clone-ca3e7",
    storageBucket: "instagram-clone-ca3e7.appspot.com",
    messagingSenderId: "525072345544",
    appId: "1:525072345544:web:4cb0d73f535f792c8938fd"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage }