const router = require('express').Router();

const { getUsers, getUser, createUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);

router.use((req, res, next) => {
  res.status(404).json({ error: 'Requested resource not found' });
});

module.exports = router;