const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    // Call authenticate with GoogleStrategy
    passport.authenticate("google", {
      // Options object - scope of request about user's account
      scope: ["profile", "email"]
    })
  );

  // Route handler for google response with user code
  app.get("/auth/google/callback", passport.authenticate("google"));

  //
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
