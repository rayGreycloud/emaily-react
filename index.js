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

app.listen(PORT, function() {
  console.log(`Express server has started on port ${PORT}...`);
});
