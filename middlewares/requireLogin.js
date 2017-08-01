// Middleware to require login
module.exports = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .send({ error: 'You must logged in to purchase credits!' });
  }

  next();
};
