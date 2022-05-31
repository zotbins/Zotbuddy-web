import firebase from "firebase/app";
import "firebase/auth";
//import 'firebase/firestore'
import { firebaseConfig } from "./config";
//import /*{ getFirestore } from*/ "firebase/firestore";
import "firebase/firestore";

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const firebaseDb = app.firestore(); //getFirestore(app); //
const firebaseAuth = app.auth();

export { firebaseDb, firebaseAuth };
