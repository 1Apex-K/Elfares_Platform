<!-- firebase.js -->
<script type="module">
  // Firebase SDK imports
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
  } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

  import { 
    getFirestore, 
    doc, 
    setDoc 
  } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

  import {
    getStorage
  } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

  // Firebase config
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
  const storage = getStorage(app);

  // Expose globally
  window.firebaseAuth = auth;
  window.firebaseDB = db;
  window.firebaseStorage = storage;

</script>
