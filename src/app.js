const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const blogViewRoute = require('./routes/view/blog')
const userViewRoute = require('./routes/view/user')
const userApiRoute = require('./routes/api/user')
const utilsApiRoute = require('./routes/api/utils')
const errorViewRoute = require('./routes/view/error')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')
const { REDIS_CONF } = require('./conf/db')
const koaStatic = require('koa-static')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo.sid',
  prefix: 'weibo:sess:', // redis key 的前缀,默认koa:sess:
  cookie: {
    path: '/',
    httpOnly: true, // 客户端无权修改
    maxAge: 24 * 60 * 60 * 1000 // cookie带的过期时间
  },
  // ttl: 24 * 60 * 60 * 1000, // 可以不写，默认跟maxAge一样
  // 存入到redis中
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))


// routes
app.use(blogViewRoute.routes(), blogViewRoute.allowedMethods())
app.use(userViewRoute.routes(), userViewRoute.allowedMethods)
app.use(userApiRoute.routes(), userApiRoute.allowedMethods)
app.use(utilsApiRoute.routes(), utilsApiRoute.allowedMethods)
// error路由一定要放在最后
app.use(errorViewRoute.routes(), errorViewRoute.allowedMethods)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
