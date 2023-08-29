// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  REACT_APP_FIREBASE_apiKey,
  REACT_APP_FIREBASE_authDomain,
  REACT_APP_FIREBASE_projectId,
  REACT_APP_FIREBASE_storageBucket,
  REACT_APP_FIREBASE_messagingSenderId,
  REACT_APP_FIREBASE_appId,
} = process.env;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy32piOz6Y_FD8XYidYHMUAxrWh_iIvUc",
  authDomain: "instagram-377e1.firebaseapp.com",
  projectId: "instagram-377e1",
  storageBucket: "instagram-377e1.appspot.com",
  messagingSenderId: "242133447963",
  appId: "1:242133447963:web:dd3679d27b134d9e7e8fbe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
