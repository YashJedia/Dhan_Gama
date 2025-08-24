// firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "live-matka-5368e",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "1:240900821140:android:94fa5cf983658a9633e481",
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
