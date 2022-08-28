const { Router } = require('express');
const Restaurant = require('../models/Restaurant');
const authenticate = require('../middleware/authenticate');
const Review = require('../models/Review');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      res.json(restaurants);
    } catch (e) {
      next(e);
    }
  })
  
  .get('/:id', async (req, res, next) => {
    try {
      const restaurant = await Restaurant.getById(req.params.id);
      res.json(restaurant);
    } catch (e) {
      next(e);
    }
  })

  .post('/:id/reviews', authenticate, async (req, res, next) => {
    try {
      console.log(req.body);
      const review = await Review.insert(req.user.id, req.params.id, req.body.detail, req.body.stars);
      res.json(review);
    } catch (e) {
      next(e);
    }
  });

