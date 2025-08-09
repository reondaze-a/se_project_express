module.exports = class AuthenticationError extends Error {
  constructor(message = 'Authentication failed') {
    super(message);
    this.statusCode = 401;
  }
}