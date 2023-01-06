import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB3TDFCgDKdmOyzaosSmscyp9bamLUVwd4",
  authDomain: "thesisdb-def08.firebaseapp.com",
  databaseURL: "https://thesisdb-def08-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thesisdb-def08",
  storageBucket: "thesisdb-def08.appspot.com",
  messagingSenderId: "657781633256",
  appId: "1:657781633256:web:63cf271331a75ac01cd95d",
  measurementId: "G-SEZ6V7MDQJ"
  };

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

