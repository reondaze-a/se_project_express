const NotFoundError = require('./NotFoundError');
const BadRequestError = require('./BadRequestError');
const InternalServerError = require('./InternalServerError');
const ConflictError = require('./ConflictError');
const AuthenticationError = require('./AuthenticationError');


module.exports = {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  ConflictError,
  AuthenticationError
};