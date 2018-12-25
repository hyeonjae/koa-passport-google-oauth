// const ensureAuthenticated = function(ctx, next) {
//   if (ctx.isAuthenticated()) {
//     return next();
//   }

//   ctx.session.returnTo = ctx.req.path;
//   ctx.redirect('/login');
// };

const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-auth').Strategy

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

require('dotenv').config();

const clientId = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET

console.log('process.env.GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID)
console.log('process.env.GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET)

passport.use(new GoogleStrategy({
    clientId,
    clientSecret,
    callbackURL: 'http://localhost:' + process.env.PORT + '/auth/google/callback'
  },
  async (token, tokenSecret, profile, done) => {

    console.log('>>> google oauth strategy');
    console.log('token:', token);
    console.log('tokenSecret:', tokenSecret);
    console.log('profile:', profile);

    const user = {
      name: profile.name,
      password: profile.password,
      email: profile.emails[0].value
    }

    done(null, user);
  }
))

exports.authenticated = () => {
	return (ctx, next) => {
		if (ctx.isAuthenticated()) {
			return next()
		} else {
			ctx.redirect('/users')
		}
	}
}
