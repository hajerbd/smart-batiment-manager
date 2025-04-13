
// Un service worker simple qui n'utilise pas de cache
// pour éviter les problèmes d'affichage

self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  // Force le service worker en attente à devenir actif immédiatement
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating');
  
  // Supprime tous les caches existants pour éviter les problèmes
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('Suppression du cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('Service Worker activé et réclamant les clients');
      return self.clients.claim();
    })
  );
});

// Laisse passer toutes les requêtes directement au réseau sans mise en cache
self.addEventListener('fetch', (event) => {
  // Ne fait rien de particulier, laisse le navigateur gérer normalement
  // ce qui évite les problèmes de mise en cache
});
