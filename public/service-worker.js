const CACHE_NAME = "converter-app-v1";
const BASE_URL = new URL("./", self.registration.scope).pathname;
const APP_SHELL = [
  BASE_URL,
  `${BASE_URL}manifest.webmanifest`,
  `${BASE_URL}app-icon.svg`,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match(BASE_URL)));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkResponse = fetch(event.request)
        .then((response) => {
          if (
            response.ok &&
            new URL(event.request.url).origin === self.location.origin
          ) {
            const copy = response.clone();
            void caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkResponse;
    }),
  );
});
