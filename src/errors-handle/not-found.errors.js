const BaseError = require('./base.errors');

class NotFoundError extends BaseError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = NotFoundError;