const jwt = require('jwt-simple');
const moment = require('moment');
const User = require('./user');
const jwtWare = require('./jwt');
const { secret } = require('../config');
var express = require('express')
var router = express.Router()
// 路由的中间件
router.use(function timeLog (req, res, next) {
  console.log('longin module: ', Date.now())
  next()
})
router.post('/signup', async function (req, res) {
  let user = req.body;
  user = await User.create(user);
  if (user) {
    res.json({
      code: 0,
      data: {
        user
      }
    });
  } else {
    res.json({
      code: 1,
      data: '用户注册失败'
    });
  }
});
router.post('/login', async function (req, res) {
  let user = req.body;
  user = await User.findOne(user);
  if (user) {
    let expires = moment().add(7, 'days').valueOf();
    let userInfo = {
      id: user._id,
      username: user.username
    };
    //负载，秘钥，算法，头部
    //encode(payload: any, key: string, algorithm?: TAlgorithm, options?: IOptions)
    let token = jwt.encode({
      user: userInfo,
      exp: expires
    }, secret);
    res.json({
      code: 0,
      data: {
        token,
        expires,
        user: userInfo
      }
    });
  } else {
    res.json({
      code: 1,
      data: '用户名或密码错误'
    });
  }
});
router.get('/user', jwtWare, function (req, res) {
  res.json({
    code: 0,
    data: {
      user: req.user
    }
  });
});

module.exports = router