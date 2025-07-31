const router = require('express').Router();

const { getItems, createItem, deleteItem } = require('../controllers/clothingItems');

router.get('/', getItems);
router.post('/', createItem);
router.delete('/:id', deleteItem);

router.use((req, res, next) => {
  res.status(404).json({ error: 'Requested resource not found' });
});

module.exports = router;