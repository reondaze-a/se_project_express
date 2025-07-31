const Item = require('../models/clothingItem');
const { NotFoundError, BadRequestError, InternalServerError } = require('../utils/errors');

module.exports.getItems = (req, res) => {
  Item.find({})
    .then(items => res.send({ data: items }))
    .catch(() => next(new InternalServerError()));
}

module.exports.createItem = (req, res) => {
  console.log(req.user._id);
  const { name, weather, imageUrl } = req.body;
  Item.create({ name, weather, imageUrl })
    .then(item => res.status(201).send({ data: item }))
    .catch(err => next(new BadRequestError("Invalid item data")));
}

module.exports.deleteItem = (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(item => {
      if (!item) {
        return next(new NotFoundError('Item not found'));
      }
      res.send({ data: item });
    })
    .catch(err => next(err));
}