import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBc3cpLbsACcEJATNBqbNAo7Gu7bUkwYfg",
  authDomain: "ting-1213a.firebaseapp.com",
  databaseURL: "https://ting-1213a.firebaseio.com",
  projectId: "ting-1213a",
  storageBucket: "ting-1213a.appspot.com",
  messagingSenderId: "1004838133971",
  appId: "1:1004838133971:web:3051566484fae7076b7426"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);


