const Koa = require('koa')
const cors = require('@koa/cors')
const passport = require('./middleware/passport')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const { UserRouter } = require('./router/user')

const app = new Koa()

app.keys = ['some secret hurr']
const CONFIG = {
  key: 'koa:sess',                        // cookie的键名
  maxAge: 86400000,                       // 过期时间，这里为一天的期限
  overwrite: true,                        // 是否覆盖cookie
  httpOnly: true,                         // 是否JS无法获取cookie
  signed: true,                           // 是否生成cookie的签名，防止浏览器暴力篡改
  encode: (json) => JSON.stringify(json), // 自定义cookie编码函数
  decode: (str) => JSON.parse(str)        // 自定义cookie解码函数
}

app.use(cors({
  credentials: true
}))
app.use(bodyParser())
app.use(session(CONFIG, app))
app.use(passport.initialize())
app.use(passport.session())
app.use(UserRouter.routes()).use(UserRouter.allowedMethods())

app.listen(8000)
