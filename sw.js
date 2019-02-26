// SEE: https://developers.google.com/web/tools/workbox/guides/get-started
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded`);
} else {
  console.log(`Boo! Workbox didn't load`);
}

/*
  workbox.routing.registerRoute(
    // Cache CSS and HTML files
    /.*\.(?:html)/,
    // Use cache but update in the background ASAP
    workbox.strategies.staleWhileRevalidate({
      // Use a custom cache name
      cacheName: 'css-html-cache',
    })
  );


  workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images
          maxEntries: 20,
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ],
    })
  );
  */

 /*
 const version = "0.6.11";
 const cacheName = `weatherapp-${version}`;
 self.addEventListener('install', e => {
   e.waitUntil(
     caches.open(cacheName).then(cache => {
       return cache.addAll([
         `/`,
         `/index.html`,
          ``
       ])
           .then(() => self.skipWaiting());
     })
   );
 });
 
 self.addEventListener('activate', event => {
   event.waitUntil(self.clients.claim());
 });
 
 self.addEventListener('fetch', event => {
   event.respondWith(
     caches.open(cacheName)
       .then(cache => cache.match(event.request, {ignoreSearch: true}))
       .then(response => {
       return response || fetch(event.request);
     })
   );
 });
*/

var CACHE_VERSION = 'app-v0';
var CACHE_FILES = [
    '/',
    '/index.html'
];

self.addEventListener('install', function (event) {
    console.log('Service worker installing');
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Service worker opened cache ' + CACHE_VERSION);
                return cache.addAll(CACHE_FILES);
            })
    );
});

self.addEventListener('activate', function (event) {
    console.log('activate service worker');
    console.log(event);
});

self.addEventListener('fetch', function (event) {
    console.log('Service worker fetch url: ' + event.request.url);
    event.respondWith(
        // Open the correct version of the cache 
        caches.open(CACHE_VERSION).then(function(cache){
            // Try to find a match for our request 
            return cache.match(event.request).then(response => {
                if(response) // match found, return that as a response
                {
                    console.log('cache match for fetch');
                    return response;
                }            
                else // match not found, try to fetch the resource from the network (or browser cache)
                {
                    console.log('No cache match')
                    return fetch(event.request);
                }
            })
            // Catch the error created if no network connection availble
            .catch(function() {
                // If the request was of an .html file, then return small html error snipper as a response
                if(event.request.url.endsWith('.html'))
                {
                    return new Response('<p>Network offline and resource not in cache, sorry pal!</p>', {
                        headers: { 'Content-Type': 'text/html' }
                    });
                }
                else // return null for all other file types than .html
                {
                    return null;
                }
            })
        })   
    );
    
    /* Update the cache */
    event.waitUntil(
        caches.open(CACHE_VERSION).then(function (cache) {
          return fetch(event.request).then(function (response) {
            return cache.put(event.request, response);
          });
        }));
});


