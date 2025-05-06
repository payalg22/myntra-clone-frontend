// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAhNNKk3Kmyrz9eURuHsFY5bBwCjjro3fc",
  authDomain: "myntra-clone-web.firebaseapp.com",
  projectId: "myntra-clone-web",
  storageBucket: "myntra-clone-web.firebasestorage.app",
  messagingSenderId: "648024244447",
  appId: "1:648024244447:web:a304a81f01406873faa96a",
  measurementId: "G-8RGSQXXLB2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
