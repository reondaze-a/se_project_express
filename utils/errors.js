// Error classes for consistent error handling
class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message);
    this.statusCode = 404;
  }
}

class BadRequestError extends Error {
  constructor(message = 'Invalid data') {
    super(message);
    this.statusCode = 400;
  }
}

class InternalServerError extends Error {
  constructor(message = 'Internal server error') {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  NotFoundError,
  BadRequestError,
  InternalServerError,
};