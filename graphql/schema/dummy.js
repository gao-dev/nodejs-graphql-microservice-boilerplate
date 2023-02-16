const { gql } = require('apollo-server-express');

module.exports = gql`
  type Dummy {
    id: ID!
    name: String!
    description: String
  }
`;
