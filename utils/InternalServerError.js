module.exports = class InternalServerError extends Error {
  constructor(message = 'An internal server error has occured') {
    super(message);
    this.statusCode = 500;
  }
}
