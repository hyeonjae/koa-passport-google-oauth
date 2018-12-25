const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')

const api = require('./routes')

require('dotenv').config();

// error handler
onerror(app)

const staticMiddleware = () => {
  return require('koa-static')(__dirname + '/public');
}

const viewMiddleware = () => {
  return views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}},
    map: {'jade': 'jade'},
    extension: 'jade'
  });
}

const session = require('koa-session')
const passport = require('koa-passport')

app.keys = ['your-session-secret']

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(staticMiddleware())
  .use(viewMiddleware())
  .use(session({}, app))
  .use(passport.initialize())
  .use(passport.session())
  .use(api.routes())
  .use(router.allowedMethods())

module.exports = app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`)
})
