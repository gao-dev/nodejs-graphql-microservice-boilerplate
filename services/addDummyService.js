// const { ApolloError } = require('apollo-server');
const Joi = require('joi');
const Service = require('./Service');

class AddDummyService extends Service {
  constructor(context) {
    super(context);
    this.dummyDatasource = context.dataSources.dummyDatasource;
    this.name = 'AddDummyService';
  }

  // eslint-disable-next-line class-methods-use-this
  getInputSchema() {
    const schema = Joi.object().keys({
      name: Joi.string()
        .min(3)
        .required(),
      description: Joi.string()
    });
    return schema;
  }

  async execute(input) {
    let result = null;
    const owner = { id: '111111', first_name: 'Gustavo', last_name: 'Olmedo' };
    if (this.inputIsValid(input)) {
      const dummy = await this.action(input, owner);
      result = AddDummyService.parse(dummy, owner);
    }
    return result;
  }

  async action(input, owner) {
    let dummy = { ...input, owner: owner.id };
    dummy = await this.dummyDatasource.create(dummy);
    return dummy;
  }

  static parse(dummy, owner) {
    return {
      id: dummy.dataValues.id,
      name: dummy.dataValues.name,
      description: dummy.dataValues.description,
      owner
    };
  }
}

module.exports = AddDummyService;
