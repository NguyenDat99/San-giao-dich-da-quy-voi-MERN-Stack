const BaseError = require('./base.errors');

class UnauthorizedError extends BaseError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = UnauthorizedError;