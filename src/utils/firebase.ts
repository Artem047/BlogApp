import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3XUct30DoATRRTvpKk0gC0NyZw_OT40k",
  authDomain: "blog-app-a3842.firebaseapp.com",
  projectId: "blog-app-a3842",
  storageBucket: "blog-app-a3842.appspot.com",
  messagingSenderId: "833570911846",
  appId: "1:833570911846:web:89d1fe6a55bb3bcda11fa7",
  measurementId: "G-7NNGXWSZ1P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);