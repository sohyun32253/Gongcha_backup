import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBgTiivlOFbYOspIO7zKfdzUiLoild4arw",
    authDomain: "gongcha-e8b0e.firebaseapp.com",
    projectId: "gongcha-e8b0e",
    storageBucket: "gongcha-e8b0e.appspot.com",
    messagingSenderId: "438553823458",
    appId: "1:438553823458:web:b86561a080a21b7fb676bb"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
