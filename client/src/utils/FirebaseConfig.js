import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCv9PjCFgcQLSQeS4CgnEnRnvRa90TlW_k",
  authDomain: "whatsup-clone-6655a.firebaseapp.com",
  projectId: "whatsup-clone-6655a",
  storageBucket: "whatsup-clone-6655a.appspot.com",
  messagingSenderId: "764038681347",
  appId: "1:764038681347:web:62bed0b0f5fe58bdfb4f36",
  measurementId: "G-QPDTDWZM56"
};

const app = initializeApp(firebaseConfig);
export const firebaseApp = getAuth(app);