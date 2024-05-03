import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDPAawZ-fcrW6HzrMW6NqhD5A_b9HmZ2q0",
    authDomain: "instagram-clone-estudos-df984.firebaseapp.com",
    projectId: "instagram-clone-estudos-df984",
    storageBucket: "instagram-clone-estudos-df984.appspot.com",
    messagingSenderId: "274836158736",
    appId: "1:274836158736:web:62f4a53a0a2774852d0d95",
    measurementId: "G-P9XVHB6MXC"
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