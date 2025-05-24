import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "복붙",
  authDomain: "복붙.firebaseapp.com",
  projectId: "복붙",
  storageBucket: "복붙.appspot.com",
  messagingSenderId: "복붙",
  appId: "복붙"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 