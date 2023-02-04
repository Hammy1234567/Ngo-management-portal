import { useState } from "react";
import { useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCN5yireOhTV1ZRCiAeydeXKIzSy4Ohs1Q",
  authDomain: "event-5604f.firebaseapp.com",
  projectId: "event-5604f",
  storageBucket: "event-5604f.appspot.com",
  messagingSenderId: "155618554238",
  appId: "1:155618554238:web:553f1b2c149ece1119432f",
  measurementId: "G-BVD0R4CN65",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
