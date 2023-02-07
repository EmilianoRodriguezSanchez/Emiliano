'use strict'
const gqlService = require('../services/gqlservice')


const resolvers = {
    GQL: {
      user:  new gqlService().getGqlId()
    }
}

module.export = resolvers