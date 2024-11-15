import { useEffect, useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import saveFCMToken from '@/actions/notification/saveFCMToken';

const firebaseConfig = {
  apiKey: 'AIzaSyAZr-m0xCeUHEcVIxeYd3g3DPmOqsWs0q4',
  authDomain: 'givetree-4521a.firebaseapp.com',
  projectId: 'givetree-4521a',
  storageBucket: 'givetree-4521a.firebasestorage.app',
  messagingSenderId: '686256830414',
  appId: '1:686256830414:web:e05211a41b25bcaba09d9f',
  measurementId: 'G-MYJ2SCRWKP',
  vapidKey:
    'BMRZkKzxZTfCSDFwAdkOfQfBkhvJIQfdB5w2Tp2cJBFK1Gu0At8yb7ubfRBl3EKYjP_V1oJrlGaoUDGQrrV_dlg',
};

const useNotification = () => {
  const [token, setToken] = useState<string | undefined>();
  const [permission, setPermission] = useState<NotificationPermission>();

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      const serviceWorkerScope = '/firebase-cloud-messaging-push-scope';
      setPermission(permission);

      if (permission !== 'granted') {
        return;
      }

      initializeApp(firebaseConfig);

      const messaging = getMessaging();

      navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: serviceWorkerScope,
      });

      getToken(messaging, {
        vapidKey: firebaseConfig.vapidKey,
      })
        .then(async (result) => {
          setToken(result);
          await saveFCMToken(result);
        })
        .catch((error) => {
          console.error(error);
        });

      onMessage(messaging, async (payload) => {
        const { title, body, image } = payload.notification!;

        const registration = await navigator.serviceWorker.getRegistration(
          serviceWorkerScope
        );

        registration?.showNotification(title || '', {
          body,
          icon: '/favicon.svg',
          badge: '/badge-128x128.png',
          image,
        } as NotificationOptions);
      });
    });
  }, []);

  return { permission, token };
};

export default useNotification;
