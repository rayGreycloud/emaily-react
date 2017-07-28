// Include passport and google strategy
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// Include mongoose
const mongoose = require("mongoose");
// Include keys
const keys = require("../config/keys");

// Fetch user model class
const User = mongoose.model("users");

// Set up GoogleStrategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        googleId: profile.id
      }).then(existingUser => {
        if (existingUser) {
          // User already exists
          done(null, existingUser);
        } else {
          // Take model instance and save to db
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
