import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDHZOmC4BVlPDKYHo8IWzmw8g9YRAd3Oe4",
  authDomain: "the-mistry-admin.firebaseapp.com",
  projectId: "the-mistry-admin",
  storageBucket: "the-mistry-admin.appspot.com",
  messagingSenderId: "859632543187",
  appId: "1:859632543187:web:b2d84f3d8b9d4e5f3c2a1b"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);