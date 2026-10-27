/* Misión Casa 5.0: receptor Web Push y caché segura de archivos públicos */
const CACHE = 'mision-casa-shell-v5';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg', './favicon.svg'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()).catch(() => self.skipWaiting()));
});
self.addEventListener('activate', event => event.waitUntil(Promise.all([
  self.clients.claim(),
  caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('mision-casa-shell-') && k !== CACHE).map(k => caches.delete(k))))
])));
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !SHELL.some(p => new URL(p, self.registration.scope).pathname === url.pathname)) return;
  event.respondWith(fetch(request).then(response => {
    if (response.ok) {const copy = response.clone(); caches.open(CACHE).then(c => c.put(request, copy)).catch(() => {});}
    return response;
  }).catch(() => caches.match(request).then(res => res || caches.match('./index.html'))));
});
self.addEventListener('push', event => {
  let payload={};
  try {payload=event.data ? event.data.json() : {};} catch (_) {}
  const body=typeof payload.body === 'string' ? payload.body.slice(0,180) : 'Revisa tus tareas pendientes.';
  event.waitUntil(self.registration.showNotification('🏡 Misión Casa', {
    body, icon:'./icon.svg', badge:'./icon.svg', tag:'mision-casa-chore', renotify:false,
    data:{url:self.registration.scope}
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil((async () => {
    const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    const match=clients.find(c => c.url.startsWith(self.registration.scope));
    if(match)return match.focus();
    return self.clients.openWindow(self.registration.scope);
  })());
});