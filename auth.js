// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, setDoc, doc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBboohz_RfwN48uIR5PuLSHk1hrE3mlFik",
  authDomain: "elfares-platform.firebaseapp.com",
  projectId: "elfares-platform",
  storageBucket: "elfares-platform.firebasestorage.app",
  messagingSenderId: "747571072776",
  appId: "1:747571072776:web:8a57a22ae96a59bbb0e6bd",
  measurementId: "G-PFV5L7Y29W"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ============= التسجيل ============= //
export async function registerUser(data) {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, data.email, data.password);

    await setDoc(doc(db, "students", userCred.user.uid), data);

    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// ============= تسجيل الدخول ============= //
export async function loginUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
