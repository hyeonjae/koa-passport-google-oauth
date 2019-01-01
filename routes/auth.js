const Router = require('koa-router')
const passport = require('koa-passport')
const { authenticated } = require('../auth')

const router = new Router()

router.get('/google', passport.authenticate('google'));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/authenticated',
    failureRedirect: '/'
  })
)

router.get('/authenticated', authenticated(), async (ctx, next) => {
  // ctx.body = { msg: 'Authenticated', user: ctx.state.user }
  ctx.status = 302;
  ctx.redirect('http://localhost:3000/');
})

module.exports = router
