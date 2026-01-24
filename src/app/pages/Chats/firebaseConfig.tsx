
// import { initializeApp } from "firebase/app";
// import { getFirestore}from 'firebase/firestore'
// import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGE_SENDING_ID, APP_ID, MEASUREMENT_ID } from './types';



// export const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGE_SENDING_ID,
//   appId: APP_ID,
//   measurementId: MEASUREMENT_ID,
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
//  export const db = getFirestore(app);


// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore"; // Import Firestore from Firebase

// // Import your API keys and other configurations from types
// import { API_KEY, APP_ID, AUTH_DOMAIN, MEASUREMENT_ID, MESSAGE_SENDING_ID, PROJECT_ID, STORAGE_BUCKET } from "./types";

// // Your Firebase config from Firebase Console
// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGE_SENDING_ID,
//   appId: APP_ID,
//   measurementId: MEASUREMENT_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore
// const db = getFirestore(app);

// export { db };


// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
// import { API_KEY, APP_ID, AUTH_DOMAIN, MEASUREMENT_ID, MESSAGE_SENDING_ID, PROJECT_ID, STORAGE_BUCKET } from './types';

// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGE_SENDING_ID,
//   appId: APP_ID,
//    measurementId: MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export { db, collection, doc, getDoc, setDoc, updateDoc, arrayUnion };


import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, arrayUnion,getDocs } from 'firebase/firestore';
import { API_KEY, APP_ID, AUTH_DOMAIN, MEASUREMENT_ID, MESSAGE_SENDING_ID, PROJECT_ID, STORAGE_BUCKET } from './types';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGE_SENDING_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, doc, getDoc, setDoc, updateDoc, arrayUnion,getDocs };
