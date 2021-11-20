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
messaging.onBackgroundMessage((payload) => {
  console.log("Message received. ", payload);
  self.registration.showNotification("아프지말고", {
    icon: "./images/logo.png",
    body: payload.data.message,
  });
  // if (Notification.permission !== "granted") {
  //   alert("notification is disabled");
  // } else {
  //   var notification = new Notification("아프지말고", {
  //     icon: "./images/logo.png",
  //     body: payload.data.message,
  //   });
  // }
});
