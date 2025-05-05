importScripts("https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBsgSROXymEE8kXm4Zueaae9fEZNBdfIMg",
  authDomain: "ompfinex-968c1.firebaseapp.com",
  databaseURL: "https://ompfinex-968c1-default-rtdb.firebaseio.com",
  projectId: "ompfinex-968c1",
  storageBucket: "ompfinex-968c1.firebasestorage.app",
  messagingSenderId: "875044236378",
  appId: "1:875044236378:web:b3743a5e85ac15ad167c63",
  measurementId: "G-Q65SMECMZP"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});