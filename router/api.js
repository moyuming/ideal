let login = require('./login')
let test = require('./test')
var express = require('express')
var router = express.Router()
//路由的中间件
router.use('/login',login)
router.use('/test',test)
module.exports = router