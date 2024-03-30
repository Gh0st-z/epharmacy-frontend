import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyChN85SH3iYhEn0NpD-k94t_tJeGA_eWWI",
    authDomain: "frontend-6c973.firebaseapp.com",
    projectId: "frontend-6c973",
    storageBucket: "frontend-6c973.appspot.com",
    messagingSenderId: "112977918418",
    appId: "1:112977918418:web:b4efa58f0d9734790f700b"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const auth = getAuth(firebaseApp);
const functions = getFunctions(firebaseApp);

export const token = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'BOwLKJz6IgSNrAVfsYixdkhxNrXi26nfCOObgwD7xVz4BaJ1caU7OQU7TZW4KnxhDVNE1tQ6xyIrvJ30StTO8Uc'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});

const getOrRegisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    return window.navigator.serviceWorker
      .getRegistration('/firebase-cloud-messaging-push-scope')
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/firebase-cloud-messaging-push-scope',
        });
      });
  }
};

const getFBToken = (setTokenFound) => {
  try {
    getOrRegisterServiceWorker()
      .then((serviceWorker) => {
        if (serviceWorker) {
          return getToken(messaging, {
             vapidKey: process.env.REACT_APP_FB_VAPID_KEY, 
             serviceWorker
          }).then((currentToken) => {
            if (currentToken) {
              setTokenFound(true);
            } else {
              setTokenFound(false);
            }
          }).catch((err) => {
            console.error(err);
          });
        }
      });
} catch (err) {
  console.error(err);
}
};


export { auth, messaging, functions };