import firebaseApp from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCo-gazPF0YRx9sqatMYdy-QGTXhXBRKPU",
  authDomain: "c-warehouse.firebaseapp.com",
  projectId: "c-warehouse",
  storageBucket: "c-warehouse.appspot.com",
  messagingSenderId: "1013612815090",
  appId: "1:1013612815090:web:18503771dfc11adc42e66b",
  measurementId: "G-MQ7N55QXR4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { firebaseConfig, db, app };
