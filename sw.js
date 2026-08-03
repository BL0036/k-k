const CACHE_NAME = "kk-ledger-v11";
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(["./", "./index.html"])));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // Never intercept external requests (Google Apps Script, fonts, etc.)
  if (url.origin !== self.location.origin) return;
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
