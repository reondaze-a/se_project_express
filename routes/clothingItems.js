const router = require('express').Router();
const auth = require('../middlewares/auth');
const { celebrate, Joi } = require('celebrate');

const { getItems, createItem, deleteItem } = require('../controllers/clothingItems');

// celebrate validation schema for POST /items
const celebrateTestPost = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    imageUrl: Joi.string().required().uri(),
  }),
});

router.get('/', getItems);

router.post('/', auth, celebrateTestPost, createItem);

router.delete('/:id', auth, deleteItem);

module.exports = router;