<!-- firebase.js -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { 
    getAuth 
  } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
  import { 
    getFirestore 
  } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
  import { 
    getStorage 
  } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBboohz_RfwN48uIR5PuLSHk1hrE3mlFik",
    authDomain: "elfares-platform.firebaseapp.com",
    projectId: "elfares-platform",
    storageBucket: "elfares-platform.firebasestorage.app",
    messagingSenderId: "747571072776",
    appId: "1:747571072776:web:8a57a22ae96a59bbb0e6bd",
    measurementId: "G-PFV5L7Y29W"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  window.firebaseAuth = auth;
  window.firebaseDB = db;
  window.firebaseStorage = storage;

</script>
