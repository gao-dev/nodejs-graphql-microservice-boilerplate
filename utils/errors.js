class InternalServerError extends Error {
  constructor(error, ...params) {
    super(...params);
    Error.captureStackTrace(this, InternalServerError);
    if (error) {
      this.internalName = error.name;
      this.internalMessage = error.message;
      this.internalError = error;
      this.message = error.message;
    }
    this.name = 'InternalServerError';
    this.code = 'INTERNAL_SERVER_ERROR';
  }
}

class InputValidationError extends InternalServerError {
  constructor(...params) {
    super(...params);
    this.internalName = `InputValidator:${this.internalName}`;
    this.internalMessage = `InputValidator:${this.internalMessage}`;
    this.name = 'InputValidationError';
    this.code = 'INPUT_VALIDATION_ERROR';
  }
}

class InternalDatabaseError extends InternalServerError {
  constructor(...params) {
    super(...params);
    this.internalName = `Database:${this.internalName}`;
    this.internalMessage = `Database:${this.internalMessage}`;
    this.name = 'InternalDatabaseError';
    this.code = 'INTERNAL_DATABASE_ERROR';
  }
}

class NotImplementedError extends InternalServerError {
  constructor(...params) {
    super(null, ...params);
    this.code = 'NOT_IMPLEMENTED_ERROR';
    this.name = 'NotImplementedError';
  }
}

module.exports = {
  InputValidationError,
  InternalDatabaseError,
  InternalServerError,
  NotImplementedError
};
