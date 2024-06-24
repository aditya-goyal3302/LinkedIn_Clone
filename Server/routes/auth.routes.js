const router = require("express").Router();
const { auth_controller } = require("../controllers");
const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.AUTH_GOOGLE_ID,
  clientSecret: process.env.AUTH_GOOGLE_SECRET,
  callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    console.log('accessToken: ', accessToken);
    console.log('profile: ', profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(null, profile);
    // });
  }
));

passport.serializeUser((user,done)=>{
  done(null,user)
})

passport.deserializeUser((user,done)=>{
  done(null,user)
})

router.get('/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  }
  )
);

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/auth/google/failure'
  })
);
router.post("/signup", auth_controller.signup);
router.post("/login", auth_controller.login);

module.exports = router;
