const Item = require('../models/clothingItem');
const { NotFoundError, BadRequestError, InternalServerError } = require('../utils/errors');

module.exports.getItems = (req, res, next) => {
  Item.find({})
    .then(items => res.send({ data: items }))
    .catch(() => next(new InternalServerError()));
}

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  Item.create({ name, weather, imageUrl, owner: req.user._id })
    .then(item => res.status(201).send({ data: item }))
    .catch(err => {
        if (err.name === 'ValidationError') {
          return next(new BadRequestError('Invalid item data'));
        }
        next(err);
      });
}

module.exports.deleteItem = (req, res, next) => {
  Item.findByIdAndDelete(req.params.id)
    .then(item => {
      if (!item) {
        return next(new NotFoundError('Item not found'));
      }
      res.send({ data: item });
    })
    .catch(err => next(err));
}