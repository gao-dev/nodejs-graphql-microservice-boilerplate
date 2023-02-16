const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    dummy(id: ID!): Dummy
  }
`;
