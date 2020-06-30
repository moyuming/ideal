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
  /*const sseStream = new SseStream(req);
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
  })*/
  // server-sent event stream
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')

  //2秒钟发送一次
  var timer = setInterval(function () {
    //如果要传输对象，可以转成字符串返回客户端后再解析字符串
    let str = 'data:' + new Date().toLocaleTimeString()+'\n\n'
    res.write(str)
    // res.write('data: ping\n\n')
    //重要步骤，刷新到客户端
    res.flush()
  }, 2000)

  res.on('close', function () {
    clearInterval(timer)
  })
})
router.get('/getPdf', async function (req, res) {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()
  await page.goto('http://www.baidu.com', {waitUntil: 'networkidle2'});
  /*await page.screenshot({
    path: 'd:/tmp/baidu.png'
  })*/
  // const content = await page.pdf({path: 'd:/tmp/baidu.pdf', format: 'A4'});
  const content = await page.pdf({format: 'A4'});//不在服务器生成文件
  console.log(content);
  await browser.close();
  return res.send({
    result: {
      content
    },
  });
})
module.exports = router