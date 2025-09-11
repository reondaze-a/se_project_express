const express = require('express');
const usersRouter = require('./users');
const clothingItemsRouter = require('./clothingItems');
const likesRouter = require('./likes');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { celebrateTests } = require('../middlewares/validation')

const router = express.Router();





// Centralized route handling
router.use('/users', auth, celebrateTests.getTest, usersRouter);
router.use('/items', clothingItemsRouter);
router.use('/items/:itemId/likes', auth, likesRouter);

// Authentication routes
router.post('/signin', celebrateTests.signIn, login);


router.post('/signup', celebrateTests.signUp, createUser);

module.exports = router;