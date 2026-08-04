const CACHE_NAME = "kk-ledger-v15";
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

// ── notificationclick (additive — tap-to-open) ──
// Cheque-due notifications are shown with data:{page:'chequebook'}
// (see index.html's checkDueChequeReminders()). Previously tapping a
// notification just dismissed it. Now: close it, then either focus an
// already-open app window and tell it (via postMessage) to jump to that
// page, or — if no window is open — launch one with ?openPage=<page> so
// index.html can navigate there itself once it's loaded and logged in.
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const targetPage = (e.notification.data && e.notification.data.page) || null;

  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientsArr => {
      for (const client of clientsArr) {
        if ("focus" in client) {
          client.postMessage({ type: "notification-click", page: targetPage });
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        const url = targetPage ? "./index.html?openPage=" + encodeURIComponent(targetPage) : "./index.html";
        return self.clients.openWindow(url);
      }
    })
  );
});
