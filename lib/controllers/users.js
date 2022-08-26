
const { Router } = require('express');
const User = require('../models/User');
const UserService = require('../services/UserService');
const authorize = require('../middleware/authorize');
const authenticate = require('../middleware/authenticate');
const ONE_DAY = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const [user, token] = await UserService.create(req.body);
      
      res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: ONE_DAY,
      })
        .json(user);
    } catch (e) {
      next (e);
    }
  })
  
  .post('/sessions', async (req, res, next) => {
    try {
      const token = await UserService.signIn(req.body);
      res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: ONE_DAY,
      })
        .json({ message: 'Signed in successfully!' });
    } catch(e) {
      next(e);
    }
  })

  .get('/', authenticate, authorize, async (req, res, next) => {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (e) {
      next(e);
    }
  });
