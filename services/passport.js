// Include passport and google strategy
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// Include mongoose
const mongoose = require("mongoose");
// Include keys
const keys = require("../config/keys");

// Fetch user model class
const User = mongoose.model("users");

// Serialize user
passport.serializeUser((user, done) => {
  // user.id is mongo record _id, not user.googleId
  done(null, user.id);
});

// Deserialize user - id = user.id
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  // Set up GoogleStrategy
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // Look for user in db
      const existingUser = await User.findOne({
        googleId: profile.id
      });

      if (existingUser) {
        // If user already exists, return user
        done(null, existingUser);
      } else {
        // If not, take model instance and save to db
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      }
    }
  )
);
