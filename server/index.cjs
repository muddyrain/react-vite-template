/* eslint-disable @typescript-eslint/no-var-requires */
const Koa = require('koa')
const Static = require('koa-static')
const path = require('path')
const cors = require('koa2-cors')
const app = new Koa()

// 启用跨域
app.use(cors())
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(Static(path.join(__dirname, staticPath)))

app.listen(5174, () => {
  // eslint-disable-next-line no-console
  console.log('static server is starting at port 5174')
})
