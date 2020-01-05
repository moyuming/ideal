var express = require('express')
var router = express.Router()
const SseStream = require('ssestream');
let sendCount = 1;
// 路由的中间件
router.use(function timeLog (req, res, next) {
  console.log('test module: ', Date.now())
  next()
})
router.get('/long-poll', function (req, res) {
  // 长轮询对需要有很高的并发能力，是服务端按固定间隔去查询数据，直到有新数据时返回，然后客户端在重复发起一次长轮询，如此反复
  setTimeout(function () {
    res.send(Date.now().toString())
  }, 2000)
})
router.get('/eventSource', function (req, res) {
  console.log('/eventSource')
  const sseStream = new SseStream(req);
  sseStream.pipe(res);
  const pusher = setInterval(() => {
    sseStream.write({
      id: sendCount++,
      event: 'message',
      retry: 20000, // 告诉客户端,如果断开连接后,20秒后再重试连接
      data: {ts: new Date().toLocaleTimeString()}
    })
    res.flush()
  }, 1000)

  res.on('close', () => {
    console.log('close')
    clearInterval(pusher);
    sseStream.unpipe(res);
  })
})

module.exports = router