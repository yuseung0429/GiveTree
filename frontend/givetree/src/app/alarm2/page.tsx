'use client';

import { useEffect, useState } from 'react';

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
  const [token, setToken] = useState<string>('');

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
        setToken(result);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });

    onMessage(messaging, (payload) => {
      alert(JSON.stringify(payload));
    });
  }, []);

  return <>{token}</>;
}
