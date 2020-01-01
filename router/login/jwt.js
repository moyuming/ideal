const { secret } = require('../config');
const jwt = require('jwt-simple');
const User = require('./user');
module.exports = async function (req, res, next) {
  //获取authorization请求头
  let authorization = req.headers['authorization']
  if (authorization) {
    try {
      let token = req.headers['authorization'].split(' ')[1]
      //用秘钥解析token
      let decoded = jwt.decode(token, secret);
      req.user = decoded.user;
      next();
    } catch (err) {
      console.log(err);
      res.status(401).send('Not Allowed');
    }
  } else {
    res.status(401).send('Not Allowed');
  }
}