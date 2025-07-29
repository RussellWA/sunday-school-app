import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDm5waUdvw_JOsdgGZhbNwDw_BIciMYKYg",
    authDomain: "gkids-connect.firebaseapp.com",
    projectId: "gkids-connect",
    storageBucket: "gkids-connect.firebasestorage.app",
    messagingSenderId: "149185317533",
    appId: "1:149185317533:web:a925c384d9d3e17374a274"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);