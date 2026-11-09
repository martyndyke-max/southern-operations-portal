import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBSDTNm0ddchrkLr-JqHGvstxrBTBRP8Og",
    authDomain: "southern-operations-portal.firebaseapp.com",
    projectId: "southern-operations-portal",
    storageBucket: "southern-operations-portal.firebasestorage.app",
    messagingSenderId: "812575195274",
    appId: "1:812575195274:web:e133f12912489a79fded73",
    measurementId: "G-QJNCNMGHZZ"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {
    db,
    doc,
    getDoc,
    setDoc
};