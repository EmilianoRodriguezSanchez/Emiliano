'use strict'

const aboutrouter = require("./aboutrouter")
const graphqlrouter = require("./graphqlrouter")

module.exports = (app) => {
   
    aboutrouter(app)
    graphqlrouter(app)

}





