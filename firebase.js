// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"; // استيراد أداة المصادقة
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"; // استيراد أداة قاعدة البيانات

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBboohz_RfwN48uIR5PuLSHk1hrE3mlFik",
    authDomain: "elfares-platform.firebaseapp.com",
    projectId: "elfares-platform",
    storageBucket: "elfares-platform.firebasestorage.app",
    messagingSenderId: "747571072776",
    appId: "1:747571072776:web:8a57a22ae96a59bbb0e6bd",
    measurementId: "G-PFV5L7Y29W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// تهيئة وتصدير أدوات Firebase
export const firebaseAuth = getAuth(app); // تصدير أداة المصادقة
export const firebaseDB = getFirestore(app); // تصدير أداة قاعدة البيانات