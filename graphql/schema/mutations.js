const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    addDummy(input: AddDummyInput): Dummy
    updateDummy(input: UpdateDummyInput): Dummy
    removeDummy(id: ID!): Dummy
  }

  input AddDummyInput {
    name: String!
    description: String
  }

  input UpdateDummyInput {
    name: String
    description: String
  }
`;
