// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

import { GoogleAuthProvider, getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA1U8365CTUDqshzPTTSreNREkViMO3Xkk",
  authDomain: "payezy-app-d3112.firebaseapp.com",
  projectId: "payezy-app-d3112",
  storageBucket: "payezy-app-d3112.appspot.com",
  messagingSenderId: "731185304637",
  appId: "1:731185304637:web:5e9db6234129c4639a0654",
  measurementId: "G-6N5DPGBJRD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// export { auth, provider };
getAnalytics(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signOutHandler = async () => {
  try {
    await signOut(auth);
    // Handle sign-out success
  } catch (error) {
    // Handle sign-out error
    console.log(error);
  }
};
export { auth, db, signOutHandler, googleProvider };
export const firestore = getFirestore(app); // Export the firestore variable
export const storage = getStorage(app);
