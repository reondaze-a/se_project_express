const express = require('express');
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./users');
const clothingItemsRouter = require('./clothingItems');
const likesRouter = require('./likes');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

const router = express.Router();

const celebrateTests = {
  // celebrate validation schema for POST /signin
  signIn: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  // celebrate validation schema for POST /signup
  signUp: celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      avatar: Joi.string().required().uri(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
}


// Centralized route handling
router.use('/users', auth, usersRouter);
router.use('/items', clothingItemsRouter);
router.use('/items/:itemId/likes', auth, likesRouter);

// Authentication routes
router.post('/signin', celebrateTests.signIn, login);


router.post('/signup', celebrateTests.signUp, createUser);

module.exports = router;