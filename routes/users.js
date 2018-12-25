const Router = require('koa-router')
const router = new Router()
const passport = require('koa-passport')

router.post('/login', async (ctx, next) => {
	return passport.authenticate('local', (err, user) => {
    if (user === false) {
      ctx.body = { success: false }
      ctx.throw(401)
    } else {
      ctx.body = { success: true }
      return ctx.login(user)
    }
	})(ctx)
	await next()
})

router.get('/logout', (ctx) => {
	ctx.logout()
  ctx.redirect('/')
})

router.get('/', async (ctx, next) => {
  console.log('>>> /users')
	// const allUsers = await User.findAll()
	// ctx.body = allUsers
	await next()
})

router.get('/:id', async (ctx, next) => {
  console.log('>>> /users/:id')
	// const user = await User.findById(ctx.params.id)
	// ctx.body = user
	await next()
})

module.exports = router
