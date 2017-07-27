// Include dependencies
const express = require("express");
const mongoose = require("mongoose");
// Include keys
const keys = require("./config/keys");
// Include user model
require("./models/User");
// Include passport file
require("./services/passport.js");
// Connect to mLab instance
mongoose.connect(keys.mongoURI);
// Instantiate app
const app = express();

// Call authRoutes with app
// Skip variable assignment - DRY
require("./routes/authRoutes")(app);

// Set port for heroku or local
const PORT = process.env.PORT || 5000;
// Start server
app.listen(PORT, function() {
  console.log(`Express server has started on port ${PORT}...`);
});
