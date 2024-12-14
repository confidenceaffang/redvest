import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5WPPHanqqLDRB92UW8IdiMZ3PKBLiyqA",
  authDomain: "liveleaderboard-37d95.firebaseapp.com",
  projectId: "liveleaderboard-37d95",
  storageBucket: "liveleaderboard-37d95.firebasestorage.app",
  messagingSenderId: "250630429547",
  appId: "1:250630429547:web:843a94fd2933a326a54a2e",
  measurementId: "G-8GCHNXBCN4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
