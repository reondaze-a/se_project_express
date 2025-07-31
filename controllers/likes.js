const { NotFoundError, BadRequestError, InternalServerError } = require('../utils/errors');
const clothingItem = require('../models/clothingItem');

module.exports.likeItem = (req, res, next) => {
  clothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
  .then(item => {
    if (!item) {
      return next(new NotFoundError('Item not found'));
    }
    res.send({ data: item });
  })
  .catch(err => {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Invalid item ID'));
    }
    next(err);
  });
};

module.exports.dislikeItem = (req, res, next) => {
  clothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
  .then(item => {
    if (!item) {
      return next(new NotFoundError('Item not found'));
    }
    res.send({ data: item });
  })
  .catch(err => {
    console.log(err);
    if (err.name === 'CastError') {
      return next(new BadRequestError('Invalid item ID'));
    }
    next(err);
  });
};