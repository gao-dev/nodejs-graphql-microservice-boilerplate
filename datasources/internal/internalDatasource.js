/* eslint-disable no-console */
const { DataSource } = require('apollo-datasource');
const {
  NotImplementedError,
  InternalDatabaseError
} = require('../../utils/errors');

class InternalDatasource extends DataSource {
  constructor(database, logger) {
    super();
    this.database = database;
    this.logger = logger;
    this.layer = 'InternalDataSource';
    this.name = 'BaseInternalDataSource';
    this.modelName = 'BaseInternalDataSourceModel';
    this.create = this.wrap(this._create);
    this.update = this.wrap(this._update);
    this.delete = this.wrap(this._delete);
    this.getByQuery = this.wrap(this._getByQuery);
    this.getById = this.wrap(this._getById);

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
    const { logger, database, name, layer } = this;
    return async (...args) => {
      try {
        logger.info({
          message: `[${layer}] ${name} - Start`,
          context: { layer, name, ...args }
        });
        const result = await fn.call(this, database, ...args);
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
        throw new InternalDatabaseError(error);
      }
    };
  }

  async _create(database, input) {
    return database[this.modelName].create(input);
  }

  async _update(database, query, data) {
    return database[this.modelName].update(data, { where: query });
  }

  async _delete(database, query) {
    return database[this.modelName].destroy({ where: query });
  }

  async _getByQuery(database, query) {
    return database[this.modelName].findAll({ where: query, raw: true });
  }

  async _getById(database, id) {
    return database[this.modelName].findOne({ where: { id }, raw: true });
  }
}

module.exports = InternalDatasource;
