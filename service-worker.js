// This line is essential. It imports the new Firebase messaging service worker.
// It MUST be the very first line.
importScripts('/firebase-messaging-sw.js');

// This is the name for our cache. It's a good practice to include a version number.
const CACHE_NAME = 'motive-hub-cache-v2'; // Note: I updated the version number to help force an update.

// This is the list of files that we want to cache for offline use.
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'icon-192x192.png',
  'icon-512x512.png'
];

// This event runs when the service worker is first installed.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching essential files');
        return cache.addAll(urlsToCache);
      })
  );
});

// This event runs every time the app requests a file (like the HTML, an icon, etc.).
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If we find a match in the cache, we return the cached version.
        // This is what makes the app work offline.
        if (response) {
          return response;
        }
        // If the file is not in the cache, we fetch it from the internet as normal.
        return fetch(event.request);
      }
    )
  );
});
