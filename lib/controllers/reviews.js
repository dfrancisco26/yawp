const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorizeReview = require('../middleware/authorizeReview');
const Review = require('../models/Review');

module.exports = Router()

  .delete('/:id', authenticate, authorizeReview, async (req, res, next) => {
    try {
      await Review.delete(req.params.id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  });
