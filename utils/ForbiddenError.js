module.exports =  class ForbiddenError extends Error {
  constructor(message = 'You do not have permission to access this resource') {
    super(message);
    this.statusCode = 403;
  }
}