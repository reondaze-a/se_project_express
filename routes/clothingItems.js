const router = require('express').Router();
const auth = require('../middlewares/auth');
const { celebrateTests } = require('../middlewares/validation');

const { getItems, createItem, deleteItem } = require('../controllers/clothingItems');

// celebrate validation schema for POST /items


router.get('/', getItems);

router.post('/', auth, celebrateTests.postItemTest, createItem);

router.delete('/:id', auth, celebrateTests.itemIdTest, deleteItem);

module.exports = router;