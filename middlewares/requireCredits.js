// Middleware to check credits
module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res
      .status(403)
      .send({ error: 'Not enough credits, please purchase more' });
  }

  next();
};
