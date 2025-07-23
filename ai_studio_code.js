// This is the name for our cache. It's a good practice to include a version number.
const CACHE_NAME = 'motive-hub-cache-v1';

// This is the list of files that we want to cache.
// These are the essential files needed for your app to work offline.
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'icon-192x192.png',
  'icon-512x512.png'
];

// This part of the code runs when the service worker is first installed.
self.addEventListener('install', event => {
  // We wait until the installation is complete.
  event.waitUntil(
    // We open the cache by its name.
    caches.open(CACHE_NAME)
      .then(cache => {
        // When the cache is open, we add all the files from our list to it.
        console.log('Opened cache and caching essential files');
        return cache.addAll(urlsToCache);
      })
  );
});

// This part of the code runs every time the app requests a file (like the HTML, an icon, etc.).
self.addEventListener('fetch', event => {
  event.respondWith(
    // We check if the requested file is already in our cache.
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