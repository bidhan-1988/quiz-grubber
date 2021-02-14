const cors = require('cors');
const express = require('express');
const ApolloServer = require('apollo-server-express').ApolloServer;
const Schema = require('./schema.js');
const app = express();

app.use(cors());

const apolloServer = new ApolloServer({
  schema:Schema,
  playground: true,
  context: ({ req }) => ({
    user: req.user,
  }),
})
const server = new apolloServer({});

server.applyMiddleware({
    app,
    path: '/graphql'
});

app.listen({
    port: 8000
}, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
});