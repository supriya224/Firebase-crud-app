// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrFOYHRsEqVHh_jP7q7BNoaVkJunEns4A",
  authDomain: "crud-app-d3845.firebaseapp.com",
  projectId: "crud-app-d3845",
  storageBucket: "crud-app-d3845.appspot.com",
  messagingSenderId: "459823502411",
  appId: "1:459823502411:web:fa23e2258632015039a9ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export  const db= getFirestore(app)