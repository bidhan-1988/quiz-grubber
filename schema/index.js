const { gql } = require('apollo-server-express');
const noteSchema = require('./notes');
const linkSchema = gql`
      type Query {
        _: Boolean
      }
    
      type Mutation {
        _: Boolean
      }
    
      type Subscription {
        _: Boolean
      }
    `;

export default [linkSchema, noteSchema];