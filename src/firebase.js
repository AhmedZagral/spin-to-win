import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB9AWEmV8ZpJmEnEL1I-yN0obv3-R0cdGs",
  authDomain: "spin-to-win-81b96.firebaseapp.com",
  projectId: "spin-to-win-81b96",
  storageBucket: "spin-to-win-81b96.firebasestorage.app",
  messagingSenderId: "304755067335",
  appId: "1:304755067335:web:5fcf4907cf2baf1edaf1e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
