// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIWEFEaAkQ5b8VERosd_DJFFhS20QJ20Y",
  authDomain: "twitter-design.firebaseapp.com",
  projectId: "twitter-design",
  storageBucket: "twitter-design.appspot.com",
  messagingSenderId: "1087874483245",
  appId: "1:1087874483245:web:d33a3004b11e68e254e4a4",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
