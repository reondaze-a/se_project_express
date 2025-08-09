const router = require('express').Router();
const auth = require('../middlewares/auth');

const { getItems, createItem, deleteItem } = require('../controllers/clothingItems');

router.get('/', getItems);
router.post('/', auth, createItem);
router.delete('/:id', auth, deleteItem);

module.exports = router;