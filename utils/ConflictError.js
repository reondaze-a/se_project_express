module.exports = class ConflictError extends Error {
  constructor(message = 'A conflict error has occurred') {
    super(message);
    this.statusCode = 409;
  }
}
