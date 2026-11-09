// PhotoAlign Collage offline cache. Bump VERSION whenever any file below changes.
const VERSION = "pa-2026-11-09-4";
const SHELL = ["./", "index.html", "manifest.webmanifest",
  "vendor/ort.min.js", "vendor/ort-wasm-simd.wasm", "vendor/ort-wasm.wasm", "vendor/jszip.min.js", "template/patient-card.pptx",
  "model/dental_classifier.onnx", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== "pa-fonts").map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET") return;
  if (url.origin === location.origin) {
    if (req.mode === "navigate") {          // the page: newest when online, cached when offline
      e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put("index.html", copy)); return r; })
        .catch(() => caches.match("index.html")));
      return;
    }
    e.respondWith(caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req)));
    return;
  }
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open("pa-fonts").then(c => c.match(req).then(hit => hit ||
      fetch(req).then(r => { c.put(req, r.clone()); return r; }).catch(() => hit))));
  }
});
