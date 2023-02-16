/* eslint-disable no-console */
const { DataSource } = require('apollo-datasource');
const {
  NotImplementedError,
  InternalServerError
} = require('../../utils/errors');

class ExternalDatasource extends DataSource {
  constructor(logger) {
    super();
    this.logger = logger;
    this.layer = 'ExternalDatasource';
    this.name = 'BaseExternalDatasource';
    this.wrapper();
  }

  initialize(config) {
    this.context = config.context;
  }

  // eslint-disable-next-line class-methods-use-this
  wrapper() {
    throw new NotImplementedError(
      'You should extend this class and override this method'
    );
  }

  // eslint-disable-next-line class-methods-use-this
  wrap(fn) {
    const { logger, name, layer } = this;
    return async function _wrappedFn(...args) {
      try {
        logger.info({
          message: `[${layer}] ${name} - Start`,
          context: { layer, name, ...args }
        });
        const result = await fn(...args);
        logger.info({
          message: `[${layer}] ${name} - Ended`,
          context: { layer, name, ...args, result }
        });
        return result;
      } catch (error) {
        logger.error({
          error,
          message: `[${layer}] ${name} - Error`,
          context: { layer, name }
        });
        throw new InternalServerError(error);
      }
    };
  }
}

module.exports = ExternalDatasource;
