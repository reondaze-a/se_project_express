const router = require('express').Router();
const {NotFoundError} = require('../utils/errors');

const { getUsers, getUser, createUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);

router.use((req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;