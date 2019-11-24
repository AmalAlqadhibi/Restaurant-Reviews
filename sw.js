self.addEventListener('install' , function (event) {
event.waitUntil(
    caches.open(myCacheName)
    .then(cache =>
        cache.addAll(
            ['/','/img','/js','/css', '/data']
        )
   )
)
});
self.addEventListener('fetch', function (event) {
    if (event.request.url.indexOf('https://maps.googleapi.com/js') == 0) {
console.log("")
    } else {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) { return response || fetch(event.request); }
            return fetch(event.request)
        })
    )}
})
//this code as is will Update the cache when files change
self.addEventListener('activate' , function(event){
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                myCacheName.map(cacheName =>{
                    if (cacheName != myCacheName){ return caches.delete(cacheName); }
                })
            )
        })
    )
})