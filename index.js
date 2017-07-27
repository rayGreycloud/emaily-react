const express = require("express");
// Include passport file
require("./services/passport.js");
// Include auth routes
const authRoutes = require('./routes/authRoutes');

const app = express();

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log(`Express server has started on port ${PORT}...`);
});
