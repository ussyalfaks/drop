// dragndrop-47bee
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6hfU3D9Le2-1k-tI6Li5KcHIgRhMeoAI",
  authDomain: "dragndrop-47bee.firebaseapp.com",
  projectId: "dragndrop-47bee",
  storageBucket: "dragndrop-47bee.appspot.com",
  messagingSenderId: "760254774576",
  appId: "1:760254774576:web:765c1889baaab50ca11cf5",
  measurementId: "G-342SV6DVHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;