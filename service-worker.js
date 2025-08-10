
const CACHE_NAME='pass-track-cache-v3_2';
const CORE_ASSETS=['/index.html','/styles.css','/app.js','/manifest.json','/data/categories.json','/data/exam_bank.json','/data/flashcards.json','/data/cheats/indiana-business.html','/data/cheats/vents.html','/icons/icon-192.png','/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(CACHE_NAME);await c.addAll(CORE_ASSETS);self.skipWaiting();})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)));const clients=await self.clients.matchAll({type:'window'});clients.forEach(cl=>cl.navigate(cl.url));self.clients.claim();})())});
self.addEventListener('fetch',e=>{e.respondWith((async()=>{const cached=await caches.match(e.request);try{const fresh=await fetch(e.request);const c=await caches.open(CACHE_NAME);c.put(e.request,fresh.clone());return fresh;}catch(err){return cached||Response.error();}})())});
