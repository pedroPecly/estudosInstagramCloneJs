import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  //a configurar no firebase
  });

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();

export {
    db,
    auth,
    storage,
    functions
};