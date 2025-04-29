// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: "ai-logo-maker-4ea1f.firebaseapp.com",
//   projectId: "ai-logo-maker-4ea1f",
//   storageBucket: "ai-logo-maker-4ea1f.firebasestorage.app",
//   messagingSenderId: "262611841435",
//   appId: "1:262611841435:web:57e73fcd8a5c8a0b9c313e",
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fir-playground-fb53c.firebaseapp.com",
  projectId: "fir-playground-fb53c",
  storageBucket: "fir-playground-fb53c.firebasestorage.app",
  messagingSenderId: "958398128009",
  appId: "1:958398128009:web:bdd9eaafce9fe479a74b58",
  measurementId: "G-135KK9J31Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
