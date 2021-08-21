const path = require('path')
const Koa = require('koa')
const koaLogger = require('koa-logger')
const static = require("koa-static")
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')
const compress = require('koa-compress')

const routers = require('./routers/index')

const config = require('../config')

const app = new Koa()

// const staticPath = '../dist'
// console.log(path.join( __dirname,  staticPath))
// app.use(static(
//   path.join( __dirname,  staticPath)
// ))

const options = { threshold: 2048 };
app.use(compress(options));

// 处理跨域问题
app.use(cors())

// 使用ctx.body解析中间件
app.use(bodyParser())

// 配置控制台日志中间件
app.use(koaLogger())

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(config.port, () => {
  console.log('server is starting at port 8000')
})