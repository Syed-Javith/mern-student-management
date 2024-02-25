const passport = require('passport');
const User = require('../models/userModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: '330538823958-2o0lrl3rve4kibuic0l4gde3u3f08pat.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:5000/auth/google/callback',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          email : profile.emails[0].value
        },{password : 0});

        if (existingUser) {
          console.log('user exists');
          console.log(existingUser);
          return done(null, existingUser);
        }
        done(null, existingUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
