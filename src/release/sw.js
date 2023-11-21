const CACHE_NAME = 'todo-pwa-cache-v1';

// Liste des fichiers à mettre en cache
const cacheFiles = [
    './',
    'index.html',
    'app.js',
    'manifest.json',
    'icon.png',
    'courses.js',
    'courses.html',
    // index
    'index.js',
    'index.html',
    // login
    'login.js',
    'login.html',
];

// Installation du service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(cacheFiles);
        })
    );
});

// Activation du service worker et nettoyage des anciennes caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercepte les requêtes et renvoie les réponses depuis le cache si possible
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
