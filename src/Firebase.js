import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEBTXD1mqeAt672Ru6Sl1rxeoDb-YrC08",
  authDomain: "mitsamaysystem-95a46.firebaseapp.com",
  projectId: "mitsamaysystem-95a46",
  storageBucket: "mitsamaysystem-95a46.appspot.com",
  messagingSenderId: "144315551209",
  appId: "1:144315551209:web:5c3728db1964334f214f78"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
