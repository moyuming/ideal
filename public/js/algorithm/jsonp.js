var installedChunks = {
  "main": 0
}
function jsonpCallback(chunkId, callback) {
  resolve = installedChunks[chunkId][0]
  installedChunks[chunkId] = 0//标识这个代码块为已经OK
  var module = {
    exports: {}
  }
  callback.call(modules.exports, module, module.exports)
  resolve(module.exports)
}
function jsonp(chunkId) {
  var promise = new Promise(function (resolve, reject) {
    installedChunkData = installedChunks[chunkId] = [resolve, reject]
  })
  var script = document.createElement('script')
  script.src = chunkId + ".bundle.js"
  document.head.appendChild(script)
  return promise
}
jsonp('title').then(function (obj) {
  console.log(obj.name)
  console.log(obj.age)
})
/*title.js
jsonpCallback('title',
function (module, exports) {
      module.exports = {
        name: 'title'
      };
      module.exports.age = 10;
    }
);*/
