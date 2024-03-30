// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyChN85SH3iYhEn0NpD-k94t_tJeGA_eWWI",
  authDomain: "frontend-6c973.firebaseapp.com",
  projectId: "frontend-6c973",
  storageBucket: "frontend-6c973.appspot.com",
  messagingSenderId: "112977918418",
  appId: "1:112977918418:web:b4efa58f0d9734790f700b"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
