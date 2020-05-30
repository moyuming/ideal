(function (modules) {
  var installedModules = {};

  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    }
    modules[moduleId].call(modules.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }

  var installedChunks = {
    "main": 0
  };

  function webpackJsonpCallback(data) {
    var chunkIds = data[0];//代码块ID
    var moreModules = data[1];//更多的模块
    var moduleId, chunkId, resolves = [];
    for (let i = 0; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      resolves.push(installedChunks[chunkId][0]);
      installedChunks[chunkId] = 0;//标识这个代码块为已经OK
    }
    for (moduleId in moreModules) {//把新拉下来的模块合并到模块对象上
      modules[moduleId] = moreModules[moduleId];
    }
    while (resolves.length) {
      resolves.shift()();//让所有的promise都OK
    }
  }

  __webpack_require__.t = function (value) {
    value = __webpack_require__(value);
    var ns = Object.create(null);
    ns.default = value;
    return ns;
  };
  __webpack_require__.e = function (chunkId) {
    var promises = [];
    var installedChunkData = installedChunks[chunkId];
    if (installedChunkData !== 0) {
      var promise = new Promise(function (resolve, reject) {
        installedChunkData = installedChunks[chunkId] = [resolve, reject];
      });
      installedChunkData[2] = promise;
      promises.push(promise);
      var script = document.createElement('script');
      script.src = chunkId + ".bundle.js";
      document.head.appendChild(script);
    }
    return Promise.all(promises);
  }
  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  jsonpArray.push = webpackJsonpCallback;
  return __webpack_require__("./src/index.js");
})({
  "./src/index.js":
    (function (module, exports, __webpack_require__) {
      var button = document.createElement("button");
      button.innerHTML = "点我";
      button.onclick = function () {
        __webpack_require__.e("title").then(__webpack_require__.t.bind(null, "./src/title.js", 7)).then(function (result) {
          console.log(result["default"]);
        });
      };
      document.body.appendChild(button);
    })
})
