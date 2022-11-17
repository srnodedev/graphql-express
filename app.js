const express = require('express') 
const { graphqlHTTP } = require('express-graphql')
const graphql = require('graphql')
const joinMonster = require('join-monster')

// Connect to database 
const { Client } = require('pg')
const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "league"
})
client.connect();

const QueryRoot = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => "Hello world!"
    },
    wonder: {
      type: graphql.GraphQLString,
      resolve: () => "I'm wondering!"
    }
  })
})
const schema = new graphql.GraphQLSchema({ query: QueryRoot });
// Create the Express app
const app = express();
app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

module.exports = app;
