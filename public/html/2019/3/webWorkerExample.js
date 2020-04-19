// importScripts('file1.js', 'file2.js')//导入其他脚本
self.onmessage = function (event) {
    var data = event.data
    this.console.log(data)
    data = data.sort(function (a, b) {
        return a - b
    })

    self.postMessage(data)
}
self.onerror = function (event) {
    this.console.log(event.filename, event.lineno, event.message)
}