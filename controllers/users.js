const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  ConflictError,
  AuthenticationError
 } = require('../utils/errors');
 const { createSuccess } = require('../utils/successCodes');
const { JWT_SECRET } = require('../utils/token');



module.exports.getCurrentUser = (req, res, next) => User.findById(req.user._id)
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
  const { name, avatar, email, password } = req.body;

  return bcrypt.hash(password, 10)
    .then(hash =>
      User.create({ name, avatar, email, password: hash })
    )
    .then(user => {
      const userData = user.toObject(); // convert to plain object for safe manipulation
      delete userData.password; // excluding password from response
      res.status(createSuccess).send({ data: userData })
    })
    .catch(err => {

      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid user data'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Email already exists'));
      }
      return next(err);
    });
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError('Email and password are required'));
  }

  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id}, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(err => {
      if (err.message === 'Incorrect email or password') {
        return next(new AuthenticationError('Incorrect email or password'));
      }
      return next(err);
    });
  }

module.exports.updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;
   return User.findByIdAndUpdate(req.user._id, { name, avatar }, { new: true, runValidators: true })
    .then(user => {
      if (!user) {
        return next(new NotFoundError('User not found'));
      }
      return res.send({ data: user });
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid user data'));
      }
      return next(err);
    });
}