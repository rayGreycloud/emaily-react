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

  // Authenticate then redirect to dashboard
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  // Route handler to log out
  app.get("/api/logout", (req, res) => {
    // Built-in passport method
    req.logout();
    res.redirect("/");
  });

  // Route handler to get user from cookie
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
