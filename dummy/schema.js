const makeExecutableSchema = require('apollo-server-express').makeExecutableSchema;
const AppSchema = require('apollo-server-express').AppSchema;
const Resolvers = require('apollo-server-express').Resolvers;
exports.makeExecutableSchema = makeExecutableSchema({
    typeDefs: [AppSchema],
    resolvers: Resolvers
});