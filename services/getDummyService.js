const Joi = require('joi');
const Service = require('./Service');
const { InternalServerError } = require('../utils/errors');

class GetDummyService extends Service {
  constructor (context) {
    super(context);
    this.dummyDatasource = context.dataSources.dummyDatasource;
    this.name = 'GetDummyService';
  }

  async execute (input) {
    const owner = { id: '11111', first_name: 'Gustavo', last_name: 'Olmedo' };
    const dummy = await this.action(input);
    const result = GetDummyService.parse(dummy, owner);
    return result;
  }

  getInputSchema () {
    const schema = Joi.number().required();
    return schema;
  }

  async action (input) {
    let dummy = null;
    if (this.inputIsValid(input)) {
      dummy = await this.dummyDatasource.getDummyById(input);
      if (!dummy) {
        throw new InternalServerError(new Error(`Dummy(${input}) not found.`));
      }
    }
    return dummy;
  }

  static parse (dummy, owner) {
    return {
      id: dummy.dataValues.id,
      name: dummy.dataValues.name,
      description: dummy.dataValues.description,
      owner
    };
  }
}

module.exports = GetDummyService;
