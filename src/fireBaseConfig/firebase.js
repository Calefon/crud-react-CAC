// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaqmUx8f9lG4hdCpnVK-mkFpp7jzPA1H8",
  authDomain: "cacreact2023.firebaseapp.com",
  projectId: "cacreact2023",
  storageBucket: "cacreact2023.appspot.com",
  messagingSenderId: "107088204816",
  appId: "1:107088204816:web:83f5028aa27e72d97ea695"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);