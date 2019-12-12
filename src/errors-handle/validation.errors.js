const BaseError = require('./base.errors');

class ValidationError extends BaseError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = ValidationError;