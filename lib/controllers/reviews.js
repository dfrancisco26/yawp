const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Review = require('../models/Review');

module.exports = Router()

  .post('/:id/reviews', authenticate, async (req, res, next) => {
    try {
      const review = await Review.insert(req.body, req.params.id, req.user.id);
      res.json(review);
    } catch (e) {
      next(e);
    }
  });
