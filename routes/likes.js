const router = require('express').Router();
const { NotFoundError } = require('../utils/errors');

const { likeItem, dislikeItem } = require('../controllers/likes');

router.put('/likes', likeItem);
router.delete('/likes', dislikeItem);

router.use((req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;