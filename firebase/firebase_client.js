// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADlr9A9JjSjcmptTin5tAczBGGTyRB_PU",
  authDomain: "cashier-device.firebaseapp.com",
  projectId: "cashier-device",
  storageBucket: "cashier-device.firebasestorage.app",
  messagingSenderId: "180807834448",
  appId: "1:180807834448:web:3e1f9afbe0bfa568d8ea55",
  measurementId: "G-N1PQG260ZE"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
