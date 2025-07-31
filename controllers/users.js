const User = require('../models/user');
const { NotFoundError, BadRequestError, InternalServerError } = require('../utils/errors');

module.exports.getUsers = (req, res, next) => User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => next(new InternalServerError()));

module.exports.getUser = (req, res, next) => User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return next(new NotFoundError('User not found'));
      }
      return res.send({ data: user });
    })
    .catch(err => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid user ID'));
      }

      return next(err);
    })

module.exports.createUser = (req, res, next) => {
  const { name, avatar } = req.body;
  return User.create({ name, avatar })
    .then(user => res.status(201).send({ data: user }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid user data'));
      }
      return next(err);
    });
}