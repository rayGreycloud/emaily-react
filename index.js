const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

const app = express();
const PORT = process.env.PORT || 5000;

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    accessToken => {
      // Testing - confirms response
      console.log(accessToken);
    }
  )
);

app.get(
  '/auth/google',
  // Call authenticate with GoogleStrategy
  passport.authenticate('google', {
    // Options object - scope of request about user's account
    scope: ['profile', 'email']
  })
);

// Route handler for google response with user code
app.get('/auth/google/callback', passport.authenticate('google'));

app.listen(PORT, function() {
  console.log(`Express server has started on port ${PORT}...`);
});
