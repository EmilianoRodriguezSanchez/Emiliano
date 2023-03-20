'use string'
const { buildSchema, buildClientSchema  } = require('graphql');
const { graphqlHTTP } = require('express-graphql');



//const graphqlSchemaObj = buildClientSchema();
const Query = require("../../../entities/query");
const Saludo = require("../../../entities/saludo");
const User = require("../../../entities/user");
const { resolvers } = require("../../../resolvers/resolvers");


let defType_gql = toDefType_gql(new Saludo()) + '\n' + toDefType_gql(new Query()) + '\n' + toDefType_gql(new User());
// Construct a schema, using GraphQL schema language
var schema = buildSchema(defType_gql);

module.exports = (router) => {
    router.post('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
      }) )
}