importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging-compat.js');

const vapidKey = 'BDOosaQYQY_sitFae-VLhiQtXhuj_UeFKaqqRd-_KFLBoZOMKobWGjhE9SJOK9uXN6aorTl0JcyDoe1Smls95zU'; //from firebase project settings
const firebaseConfig = { //from firebase project settings
  apiKey: "AIzaSyC6CHBQH_9H1vnSL7U28f3TT9cEu18HeZo",
  authDomain: "jsinvest2022.firebaseapp.com",
  projectId: "jsinvest2022",
  storageBucket: "jsinvest2022.appspot.com",
  messagingSenderId: "223652821988",
  appId: "1:223652821988:web:527d22fa538c27c05065f1"
};

if (!firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
    } catch (e) {
        console.log("sw error", e)
    }
}

let messaging = firebase.messaging();



