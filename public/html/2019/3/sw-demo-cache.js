var VERSION = 'v1'
/*Cache直接和请求打交道，CacheStorage和Cache对象打交道，我们可以直接使用全局的caches属性访问CacheStorage，例如，虽然API上显示的是CacheStorage.open()，但我们实际使用的时候，直接caches.open()就可以了。*/
// 缓存
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(VERSION).then(function(cache) {
      return cache.addAll([
        '/lib/jquery/jquery-1.12.4.min.js',
        '/images/mm1.jpg'
      ])
    })
  )
})

// 缓存更新
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== VERSION) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// 捕获请求并返回缓存数据
this.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return response
        /*return caches.open(VERSION).then(function(cache) {
          if(event.request.method == "GET"){
            cache.put(event.request, response.clone())
          }
          return response
        })*/
      })
    })
  )
})