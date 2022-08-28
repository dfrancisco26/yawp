const Review = require('../models/Review');

module.exports = async (req, res, next) => {
  const review = await Review.getById(req.params.id);
  console.log(review);
  console.log(req.params);
  console.log(req.user);
  try {
    if (req.user.id !== review.userId) {
      throw new Error('This is not your review');
    }
    next();
  } catch(err) {
    err.status = 403;
    next(err);
  }
};
