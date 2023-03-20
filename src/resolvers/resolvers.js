'use string';
const Saludo = require("../entities/saludo");

// The root provides a resolver function for each API endpoint
var resolvers = {
  user: async (args, context, info) => {
    var gqlService = require("../services/gqlservice");
    return await new gqlService().getGqlId(args.id);

  },
  users: async (args, context, info) => {
    var gqlService = require("../services/gqlservice");
    return await new gqlService().getGqls();

  },
  hello: (args, context, info) => {
    let s = new Saludo();
    s.mesage = args.name + '  Hello world!' + args.value;
    return s;
  },
};
exports.resolvers = resolvers;
