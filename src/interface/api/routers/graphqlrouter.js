'use string'
const { buildSchema, buildClientSchema  } = require('graphql');
const { graphqlHTTP } = require('express-graphql');



//const graphqlSchemaObj = buildClientSchema();
const Query = require("../../../entities/query");
const Saludo = require("../../../entities/saludo");
let defType_gql = toDefType_gql(new Saludo()) + '\n' + toDefType_gql(new Query());
// Construct a schema, using GraphQL schema language
var schema = buildSchema(defType_gql);

// The root provides a resolver function for each API endpoint
var root = {
  hello:(args, context, info) => {
    let s = new Saludo();
    s.mesage= args.name +'  Hello world!' + args.value;
    return s;
  },
};

module.exports = (router) => {
    router.post('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
      }) )
}