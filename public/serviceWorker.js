
const CACHE_NAME = 'vitasmart-v2'; // Incrementing the version to force cache refresh
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-512x512.png',
];

self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened successfully');
        return cache.addAll(urlsToCache);
      })
  );
  // Force the waiting service worker to become active
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // For navigation requests (HTML documents), always try network first, then fall back to cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache a copy of the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // If network fails, try the cache
          return caches.match(event.request);
        })
    );
  } else {
    // For non-navigation requests, try cache first, then network
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request).then(networkResponse => {
            // Cache a copy of the response
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
            return networkResponse;
          });
        })
    );
  }
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating');
  // Clean up old cache versions
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: clearing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated and claiming clients');
      return self.clients.claim();
    })
  );
});
