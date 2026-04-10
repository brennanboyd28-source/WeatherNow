const CACHE_NAME = "weather-pwa-v2";

const FILES_TO_CACHE = [
  "index.html",
  "css.style.css",
  "js.app.js",
  "manifest.json",
  "sunandclouds.jpg",
  "sunny.jpg",
  "partlycloudy.jpg",
  "rain.jpg",
  "snow.jpg",
  "storm.jpg",
  "windy.jpg",
  "cloudy.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request)
        .then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
