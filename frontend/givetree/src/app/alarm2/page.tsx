'use client';

import { useEffect } from 'react';

import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAZr-m0xCeUHEcVIxeYd3g3DPmOqsWs0q4',
  authDomain: 'givetree-4521a.firebaseapp.com',
  projectId: 'givetree-4521a',
  storageBucket: 'givetree-4521a.firebasestorage.app',
  messagingSenderId: '686256830414',
  appId: '1:686256830414:web:e05211a41b25bcaba09d9f',
  measurementId: 'G-MYJ2SCRWKP',
};

export default function AlarmPage() {
  function notifyMe() {
    if (!('Notification' in window)) {
      // Check if the browser supports notifications
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification('Hi there!');
      // …
    } else if (Notification.permission !== 'denied') {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          const notification = new Notification('Hi there!');
          // …
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    console.log(app);
    console.log(analytics);

    const messaging = getMessaging();

    navigator.serviceWorker.register('/firebase-messaging-sw.js', {
      scope: '/firebase-cloud-messaging-push-scope',
    });

    getToken(messaging, {
      vapidKey:
        'BMRZkKzxZTfCSDFwAdkOfQfBkhvJIQfdB5w2Tp2cJBFK1Gu0At8yb7ubfRBl3EKYjP_V1oJrlGaoUDGQrrV_dlg',
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // ...
    });
  }, []);

  return (
    <>
      <button onClick={notifyMe}>Notify me!</button>
    </>
  );
}
