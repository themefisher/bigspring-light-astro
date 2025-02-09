// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const {
  FIREBASE_API_KEY: apiKey,
  FIREBASE_AUTH_DOMAIN: authDomain,
  FIREBASE_PROJECT_ID: projectId,
  FIREBASE_STORAGE_BUCKET: storageBucket,
  FIREBASE_MESSAGING_SENDER_ID: messagingSenderId,
  FIREBASE_APP_ID: appId,
} = import.meta.env;

const firebaseConfig = {
  apiKey: "AIzaSyA_SpC70o-BnMqVh00f_sJC-fnJshdO-mI",
  authDomain: "horarios-267a3.firebaseapp.com",
  projectId: "horarios-267a3",
  storageBucket: "horarios-267a3.firebasestorage.app",
  messagingSenderId: "932463148621",
  appId: "1:932463148621:web:4ac27943cd0bbd1256e604"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export const firebase = {
  app,
  auth,
};
