import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB0X5LMzxSP13YSpoomU57o3xQjkvdRvXI",
    authDomain: "store-mgmt-system.firebaseapp.com",
    projectId: "store-mgmt-system",
    storageBucket: "store-mgmt-system.firebasestorage.app",
    messagingSenderId: "1003262628346",
    appId: "1:1003262628346:web:4fbd566de41d6c1c7f9443"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);