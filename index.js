// Include dependencies
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
// Include keys
const keys = require('./config/keys');
// Include user model
require('./models/User');
// Include passport file
require('./services/passport.js');
// Connect to mLab instance
mongoose.connect(keys.mongoURI);
// Instantiate app
const app = express();

// middlewares
app.use(bodyParser.json());
// Cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Call route functions with app
// Skip variable assignment - DRY
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// Set port for heroku or local
const PORT = process.env.PORT || 5000;
// Start server
app.listen(PORT, function() {
  console.log(`Express server has started on port ${PORT}...`);
});
