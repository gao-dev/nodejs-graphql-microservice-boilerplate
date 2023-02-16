const bunyan = require('bunyan');
const hash = require('./hash');

class Logger {
  constructor(name) {
    this._logger = bunyan.createLogger({
      name
    });
  }

  attachRequestId(req) {
    const { authorization: token } = req.headers;
    const requestId = token ? hash({ data: token, hash: 'sha1' }) : 'anonymous';
    this.requestId = requestId;
    return requestId;
  }

  _extendContext(context) {
    return {
      ...context,
      userRequestId: this.requestId
    };
  }

  info({ message, context = {} }) {
    this._logger.info(this._extendContext(context), message);
  }

  warn({ message, context = {} }) {
    this._logger.warn(this._extendContext(context), message);
  }

  debug({ message, context = {} }) {
    this._logger.debug(this._extendContext(context), message);
  }

  error({ error, message, context = {} }) {
    this._logger.error(error, message, this._extendContext(context));
  }

  fatal({ message, context = {} }) {
    this._logger.fatal(this._extendContext(context), message);
  }

  trace({ message, context = {} }) {
    this._logger.trace(this._extendContext(context), message);
  }
}

module.exports = name => new Logger(name);
