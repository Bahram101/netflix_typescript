import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_PG6ZL_OTCmk_VPJA2onYJJQyamGhkm0",
  authDomain: "netflix-clone-df7b2.firebaseapp.com",
  projectId: "netflix-clone-df7b2",
  storageBucket: "netflix-clone-df7b2.appspot.com",
  messagingSenderId: "692988886399",
  appId: "1:692988886399:web:fbc2ee36eb3f5fa604ae4a",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
