/* Misión Casa 4.0: receptor Web Push. El emisor externo y las suscripciones aún no están configurados. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
 let payload={};try{payload=e.data?e.data.json():{}}catch{}
 const body=typeof payload.body==='string'?payload.body.slice(0,180):'Revisa tus tareas del hogar.';
 e.waitUntil(self.registration.showNotification('🏡 Misión Casa',{body,icon:'./icon.svg',tag:'mision-casa-recordatorio',data:{url:self.registration.scope}}));
});
self.addEventListener('notificationclick',e=>{
 e.notification.close();
 e.waitUntil((async()=>{for(const c of await self.clients.matchAll({type:'window',includeUncontrolled:true})){if(c.url.startsWith(self.registration.scope))return c.focus()}return self.clients.openWindow(self.registration.scope)})());
});