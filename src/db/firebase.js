import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA3n7wqTCb4tp2s2B5lrUtdtPuHTSHyfAw",
  authDomain: "disney-clone-80dec.firebaseapp.com",
  projectId: "disney-clone-80dec",
  storageBucket: "disney-clone-80dec.appspot.com",
  messagingSenderId: "241629616643",
  appId: "1:241629616643:web:02b2b1e696537c8e1dcc36",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
