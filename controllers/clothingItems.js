const Item = require("../models/clothingItem");
const {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  ForbiddenError,
} = require("../utils/errors");
const { createSuccess } = require("../utils/successCodes");

module.exports.getItems = (req, res, next) =>
  Item.find({})
    .sort({ createdAt: -1 }) // Latest goes first
    .then((items) => res.send({ data: items }))
    .catch(() => next(new InternalServerError()));

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  return Item.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(createSuccess).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw next(new BadRequestError("Invalid item data"));
      }
      throw next(err);
    });
};

module.exports.deleteItem = (req, res, next) =>
    Item.findById(req.params.id)
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found");
      }

      if (!item.owner.equals(req.user._id)) {
        throw new ForbiddenError("You can only delete your own items");
      }

      return Item.deleteOne({ _id: item._id });
    })
    .then(() => res.status(200).send({ message: "Deleted successfully" }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }

      return next(err);
    });

