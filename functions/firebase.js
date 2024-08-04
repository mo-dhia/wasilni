// import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// const manifest = Constants.manifest2 ?? Constants.manifest;

// const firebaseConfig = {
//   apiKey: manifest.extra.firebaseApiKey,
//   authDomain: manifest.extra.firebaseAuthDomain,
//   projectId: manifest.extra.firebaseProjectId,
//   storageBucket: manifest.extra.firebaseStorageBucket,
//   messagingSenderId: manifest.extra.firebaseMessagingSenderId,
//   appId: manifest.extra.firebaseAppId
// };
const firebaseConfig = {
  apiKey: "AIzaSyBhFLfyBfE1TfsFVT7OkrJeJeE4hf2_otA",
  authDomain: "naql-68aba.firebaseapp.com",
  projectId: "naql-68aba",
  storageBucket: "naql-68aba.appspot.com",
  messagingSenderId: "703276550006",
  appId: "1:703276550006:web:bec63cc3a335b4cbbb9c57"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)