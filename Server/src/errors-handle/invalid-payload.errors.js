const BaseError = require('./base.errors');

class InvalidPayloadError extends BaseError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = InvalidPayloadError;