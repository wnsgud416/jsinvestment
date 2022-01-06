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

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

getToken(messaging, { vapidKey: 'BBj3q3KDeyfrlopA-1Qg0dzg8BM1tfCx_Z3z82Pkl_VEThHgTWaKCypgw1CAfiKsPu-zhKoX4KN_FVnngJFeKJ8' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
