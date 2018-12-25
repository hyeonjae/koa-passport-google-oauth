const Router = require('koa-router')
const router = new Router()
const { authenticated } = require('../auth')

router.get('/', async (ctx, next) => {
  // ctx.body = 'Hello World'
  ctx.state = {
    title: 'Koa2'
  }
  await ctx.render('index', ctx.state)
})

router.get('/welcome', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };

  await ctx.render('welcome', {title: ctx.state});
})

router.get('/login', async function(ctx, next) {
  await ctx.render('login', { title: 'Login' });
});

router.get('/welcome', authenticated(), async function(ctx, next) {
  await ctx.render('welcome', { name: ctx.req.user.displayName });
});

router.get('/detail', authenticated(), async function(ctx, next) {
  await ctx.render('detail');
});

router.get('/list', authenticated(), async function(ctx, next) {
  await ctx.render('list');
});

router.get('/account', authenticated(), async function(ctx, next) {
  await ctx.render('account', {
    title: 'Account',
    name: ctx.req.user.displayName,
    user: JSON.stringify(ctx.req.user)
  });
});

const user = require('./users')
const auth = require('./auth')
router.use('/auth', auth.routes())
router.use('/users', user.routes())

module.exports = router

