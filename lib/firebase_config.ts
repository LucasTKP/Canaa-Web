import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB5nfCb8ZsDr-8WBdLUIpSq17OERIqPM4Y",
  authDomain: "canaa-afb9f.firebaseapp.com",
  projectId: "canaa-afb9f",
  storageBucket: "canaa-afb9f.appspot.com",
  messagingSenderId: "238964277898",
  appId: "1:238964277898:web:21ffd433f33e0c32ac2373",
  measurementId: "G-N2L5ZMV29N",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
