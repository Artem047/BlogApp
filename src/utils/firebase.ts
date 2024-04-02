import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_E_EgMy8Tvqx7tIInC3fOolAd225cSNA",
  authDomain: "blog-apps-5f4c8.firebaseapp.com",
  projectId: "blog-apps-5f4c8",
  storageBucket: "blog-apps-5f4c8.appspot.com",
  messagingSenderId: "368889307258",
  appId: "1:368889307258:web:6edda21449cc5ed01a5bc3",
  measurementId: "G-NMJ6D1X0M1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GitHubProvider = new GithubAuthProvider();
export const GoogleProvider = new GoogleAuthProvider();