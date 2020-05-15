const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');
var compression = require('compression');
let api = require('./api')
const app = express()
app.use(compression());//开启响应压缩，默认大于1k时会压缩
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + "/" + "index.html" );
})
app.use('/api', api)
var server = require('http').createServer(app);//http服务
/*var server = require('https').createServer({
  pfx: fs.readFileSync('router/certificate.pfx')//https服务
}, app);*/
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  //向客户端发送消息
  socket.send('欢迎光临');
  //接收到客户端发过来的消息时触发
  socket.on('message',function(data){
      console.log(data);
  });
});
module.exports = server