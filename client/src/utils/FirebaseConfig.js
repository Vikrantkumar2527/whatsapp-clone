import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAyLcTSEMkZb2J6tGk9EmP6c2R_ixaTonA",
  authDomain: "whatsapp-clone-a9080.firebaseapp.com",
  projectId: "whatsapp-clone-a9080",
  storageBucket: "whatsapp-clone-a9080.firebasestorage.app",
  messagingSenderId: "720067480978",
  appId: "1:720067480978:web:6515b9a2420c39031a454b",
  measurementId: "G-DDG8HZMMDT"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth =getAuth(app)