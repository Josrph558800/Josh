// firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_sISt27uwYB_763T_oY-N07WzSMGMHcc",
  authDomain: "nexa-43070.firebaseapp.com",
  projectId: "nexa-43070",
  storageBucket: "nexa-43070.appspot.com",
  messagingSenderId: "729215729872",
  appId: "1:729215729872:web:80e0571d67083dc3d21ed5",
  measurementId: "G-GPS54DVPTB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };