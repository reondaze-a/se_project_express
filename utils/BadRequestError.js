module.exports =  class BadRequestError extends Error {
  constructor(message = 'Invalid data') {
    super(message);
    this.statusCode = 400;
  }
}