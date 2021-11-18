importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDugiSdAbhcAv4kjvZIczRILR0cWnyoLE4",
  authDomain: "don-t-sick.firebaseapp.com",
  projectId: "don-t-sick",
  storageBucket: "don-t-sick.appspot.com",
  messagingSenderId: "713607862724",
  appId: "1:713607862724:web:5ada0cc3cdaa6370662c91",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
