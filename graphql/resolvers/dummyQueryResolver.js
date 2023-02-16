const { GetDummyService } = require('../../services/');

module.exports = {
  Query: {
    dummy: async (_, args, context) => {
      console.log('here');
      const service = await new GetDummyService(context);
      const dummy = await service.executeService(args.id);
      return dummy;
    }
  }
};
