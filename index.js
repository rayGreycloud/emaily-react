const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
// Include passport file
require("./services/passport.js");

mongoose.connect(keys.mongoURI);

const app = express();

// Call authRoutes with app
// Skip variable assignment - DRY
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log(`Express server has started on port ${PORT}...`);
});
