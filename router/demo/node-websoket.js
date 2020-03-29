//手写node和websoket通信
let net = require('net');
const crypto = require('crypto');
const CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
function unmask(buffer, mask) {
    const length = buffer.length;
    for (let i = 0; i < length; i++) {
        buffer[i] ^= mask[i & 3];
    }
}
//当客户端连接上来的时候会执行对应的回调函数
//socket其实是一个可读可写流，是一个双工流
let server = net.createServer({});
server.on('connection', function (socket) {
    //表示客户端连接的总数量是1个。
    server.maxConnections = 1;
    //获取当前有多少个客户端正在连接服务器
    server.getConnections((err, count) => {
        console.log(`欢迎光临，现在连接的客户端总数量是${count}个,客户端连接的总数量是${server.maxConnections}`);
    });
    console.log(socket.address());
    socket.setEncoding('utf8');
    socket.once('data', function (data) {
        data = data.toString();
        if (data.match(/Upgrade: websocket/)) {
            let rows = data.split('\r\n');//按分割符分开
            rows = rows.slice(1, -2);//去掉请求行和尾部的二个分隔符
            const headers = {};
            rows.forEach(row => {
                let [key, value] = row.split(': ');
                headers[key] = value;
            });
            if (headers['Sec-WebSocket-Version'] == 13) {
                let wsKey = headers['Sec-WebSocket-Key'];
                let acceptKey = crypto.createHash('sha1').update(wsKey + CODE).digest('base64');
                let response = [
                    'HTTP/1.1 101 Switching Protocols',
                    'Upgrade: websocket',
                    `Sec-WebSocket-Accept: ${acceptKey}`,
                    'Connection: Upgrade',
                    '\r\n'
                ].join('\r\n');
                socket.write(response);
                socket.on('data', function (buffers) {
                    let payload = Buffer.from('ok')
                    let meta = Buffer.alloc(2)
                    meta[0] = 128 + 1
                    meta[1] = payload.length
                    let response = Buffer.concat([meta, payload], meta.length + payload.length)
                    socket.write(response);
                });
                //如何获取可读流里的数据?
                // socket.on('data', function (data) {
                //     console.log('服务器接收客户端发过来的数据:', data);
                //     socket.write('服务器回应:' + data);
                // });
            }

        }
    });

    //服务器收到客户端发出的关闭连接请求时，会触发end事件
    //在这个地方客户端没有真正关闭，只是开始关闭。当真正关闭的时候还会触发一个close事件
    socket.on('end', function () {
        console.log('客户端已关闭');
        //close 服务器端有一个方法叫close，close的意思是如果执行了此方法，那么此客户端将不再接收新的连接，
        //但是也不会关闭现有服务器
        //一旦调用此方法，则当所有的客户端关闭跟本服务器的连接后，将关闭服务器
        server.unref();
    });
    // setTimeout(function () {
    //     //在5秒之后会关闭掉此服务器。不再接收新的客户端了
    //     server.close();
    // }, 5000);
    //hasError如果为ture表示异常关闭，否则表示正常关闭
    socket.on('close', function (hasError) {
        console.log('客户端真正关闭', hasError);
    });
    socket.on('error', function (err) {
        console.log(err);
    });
});
server.on('close', function () {
    console.log('服务器端已关闭');
});
server.on('error', function (err) {
    console.log(err);
});
server.listen(8081, function () {
    console.log(server.address());
    console.log('服务器端已经启动');
});

