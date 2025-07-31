const express = require('express');
const usersRouter = require('./users');
const clothingItemsRouter = require('./clothingItems');
const likesRouter = require('./likes');

const router = express.Router();

// Centralied route handling
router.use('/users', usersRouter);
router.use('/items', clothingItemsRouter);
router.use('/items/:itemId/likes', likesRouter);

module.exports = router;