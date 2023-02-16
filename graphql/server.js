const { ApolloServer } = require('apollo-server-express');
const { merge } = require('lodash');
const {
  Dummy,
  Query,
  Mutation
} = require('./schema');
const {
  DummyDatasource,
  // UsersDatasource
} = require('../datasources');

const {
  addDummyMutationResolver,
  dummyQueryResolver
} = require('./resolvers');

// const { GetLoginUserService } = require('../services');
const loggerFactory = require('../utils/logger');
const database = require('../datasources/internal/models/');

const logger = loggerFactory('FeatureName');
const server = new ApolloServer({
  typeDefs: [
    Dummy,
    Query,
    Mutation
  ],
  resolvers: merge(
    addDummyMutationResolver,
    dummyQueryResolver
    // (_, args, context) => {
    //   context.logger = logger;
    //   return dummyQueryResolver(_, args, context);
    // }
  ),
  introspection: true,
  playground: true,
  logger,
  dataSources: () => {
    return {
      // usersDatasource: new UsersDatasource(),
      dummyDatasource: new DummyDatasource(database, logger)
    };
  },
  context: ({ req }) => {
    const { authorization: token } = req.headers;
    logger.attachRequestId(req);
    return {
      auth: { token },
      logger
      // getLoginUser: (() => {
      //   let user = null;
      //   return async function lazyEvaluateLoginUser() {
      //     if (user) return user;
      //     const {
      //       dataSources: { usersDatasource }
      //     } = this;
      //     user = await new GetLoginUserService({
      //       usersDatasource
      //     }).fetchUserProfile();
      //     return user;
      //   };
      // })()
    };
  }
});

module.exports = server;
