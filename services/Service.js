/* eslint-disable no-unused-vars */
const Joi = require('joi');
const { isEmpty } = require('lodash');
const {
  InternalServerError,
  InputValidationError,
  NotImplementedError
} = require('../utils/errors');

class Service {
  constructor(context) {
    this.context = context;
    this.logger = context.logger;
    this.name = 'Service';
    this.layer = 'Service';
  }

  // eslint-disable-next-line class-methods-use-this
  async execute(input) {
    throw new NotImplementedError(
      'You should extend this class and override this method'
    );
  }

  // eslint-disable-next-line class-methods-use-this
  getInputSchema() {
    throw new NotImplementedError(
      'You should extend this class and override this method'
    );
  }

  inputIsValid(input) {
    const schema = this.getInputSchema();
    const result = Joi.validate(input, schema);
    if (isEmpty(result.error)) {
      return true;
    }
    throw new InputValidationError(result.error);
  }

  async executeService(...input) {
    const result = await Service.wrapper(this, ...input);
    return result;
  }

  static async wrapper(service, ...input) {
    const { logger, name, layer } = service;
    try {
      logger.info({
        message: `[${layer}] ${name} - Start`,
        context: { layer, name, input }
      });
      const result = await service.execute(...input);
      logger.info({
        message: `[${layer}] ${name} - Ended`,
        context: { layer, name, input, result }
      });
      return result;
    } catch (error) {
      console.log('error', error)
      logger.error({
        error,
        message: `[${layer}] ${name} - Error`,
        context: { layer, name, input }
      });
      if (error instanceof InternalServerError) {
        throw error;
      } else {
        throw new InternalServerError(
          error,
          `Failed during use of service: ${name} at ${layer} layer`
        );
      }
    }
  }
}

module.exports = Service;
