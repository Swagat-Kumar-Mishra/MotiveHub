// This file is required by Firebase for handling background notifications.
// When a notification arrives and the app is closed, this script wakes up to handle it.
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// This is a placeholder. Firebase is initialized by the main service worker.
firebase.initializeApp({});

const messaging = firebase.messaging();

// This function runs when a background notification is received.
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192x192.png' // Your app icon
  };

  // This line shows the notification to the user.
  self.registration.showNotification(notificationTitle, notificationOptions);
});
