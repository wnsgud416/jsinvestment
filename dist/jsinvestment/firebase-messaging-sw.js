// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp({
//   apiKey: "AIzaSyBc3cpLbsACcEJATNBqbNAo7Gu7bUkwYfg",
//   authDomain: "ting-1213a.firebaseapp.com",
//   databaseURL: "https://ting-1213a.firebaseio.com",
//   projectId: "ting-1213a",
//   storageBucket: "ting-1213a.appspot.com",
//   messagingSenderId: "1004838133971",
//   appId: "1:1004838133971:web:3051566484fae7076b7426"
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = getMessaging(firebaseApp);
// messaging.usePublicVapidKey("BBj3q3KDeyfrlopA-1Qg0dzg8BM1tfCx_Z3z82Pkl_VEThHgTWaKCypgw1CAfiKsPu-zhKoX4KN_FVnngJFeKJ8")

importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging-compat.js');

const vapidKey = 'BBj3q3KDeyfrlopA-1Qg0dzg8BM1tfCx_Z3z82Pkl_VEThHgTWaKCypgw1CAfiKsPu-zhKoX4KN_FVnngJFeKJ8'; //from firebase project settings
const firebaseConfig = { //from firebase project settings
  apiKey: "AIzaSyBc3cpLbsACcEJATNBqbNAo7Gu7bUkwYfg",
  authDomain: "ting-1213a.firebaseapp.com",
  databaseURL: "https://ting-1213a.firebaseio.com",
  projectId: "ting-1213a",
  storageBucket: "ting-1213a.appspot.com",
  messagingSenderId: "1004838133971",
  appId: "1:1004838133971:web:3051566484fae7076b7426"
};

if (!firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
    } catch (e) {
        console.log("sw error", e)
    }
}

let messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });



