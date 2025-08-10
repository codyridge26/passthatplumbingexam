
const BUILD_VERSION = 'v3.1.2-1754788516';
const CACHE_NAME = 'pass-track-cache-' + BUILD_VERSION;
const CORE_ASSETS = [
  '/index.html','/styles.css','/app.js','/manifest.json',
  '/data/categories.json','/data/exam_bank.json','/data/flashcards.json',
  '/data/cheats/indiana-business.html','/data/cheats/vents.html',
  '/icons/icon-192.png','/icons/icon-512.png'
];
self.addEventListener('install', (event)=>{
  event.waitUntil((async()=>{ const cache = await caches.open(CACHE_NAME); await cache.addAll(CORE_ASSETS); self.skipWaiting(); })());
});
self.addEventListener('activate', (event)=>{
  event.waitUntil((async()=>{
    const keys = await caches.keys();
    await Promise.all(keys.filter(k=>!k.includes(BUILD_VERSION)).map(k=>caches.delete(k)));
    await self.clients.claim();
    const clients = await self.clients.matchAll({includeUncontrolled:true});
    clients.forEach(c=>c.postMessage({type:'SW_UPDATED', version: BUILD_VERSION}));
  })());
});
self.addEventListener('fetch', (event)=>{
  event.respondWith((async()=>{
    const cached = await caches.match(event.request);
    try {
      const fresh = await fetch(event.request);
      const cache = await caches.open(CACHE_NAME);
      cache.put(event.request, fresh.clone());
      return fresh;
    } catch(e) {
      return cached || Response.error();
    }
  })());
});
