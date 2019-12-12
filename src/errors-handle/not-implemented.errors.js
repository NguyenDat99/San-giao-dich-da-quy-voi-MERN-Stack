const BaseError = require('./base.errors');

class NotImplemented extends BaseError {
  constructor(message) {
    super(message, 501);
  }
}

module.exports = NotImplemented;