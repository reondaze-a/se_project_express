const router = require('express').Router({ mergeParams: true });
const { NotFoundError } = require('../utils/errors');

const { likeItem, dislikeItem } = require('../controllers/likes');

router.put('/', likeItem);
router.delete('/', dislikeItem);

router.use((req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;