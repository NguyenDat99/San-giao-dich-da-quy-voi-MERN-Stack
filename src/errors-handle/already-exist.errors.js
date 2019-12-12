const BaseError = require('./base.errors');

class AlreadyExistError extends BaseError {
    constructor(message) {
        super(message, 409);
    }
}

module.exports = AlreadyExistError;
