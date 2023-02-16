const { AddDummyService } = require('../../services/');

module.exports = {
  Mutation: {
    addDummy: async (_, args, context) => {
      const service = await new AddDummyService(context);
      const dummy = await service.executeService(args.input);
      return dummy;
    }
  }
};
