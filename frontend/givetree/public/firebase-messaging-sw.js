importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyAZr-m0xCeUHEcVIxeYd3g3DPmOqsWs0q4',
  authDomain: 'givetree-4521a.firebaseapp.com',
  projectId: 'givetree-4521a',
  storageBucket: 'givetree-4521a.firebasestorage.app',
  messagingSenderId: '686256830414',
  appId: '1:686256830414:web:e05211a41b25bcaba09d9f',
  measurementId: 'G-MYJ2SCRWKP',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
