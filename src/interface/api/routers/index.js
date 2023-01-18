'use strict'

const aboutrouter = require("./aboutrouter")
const graphqlrouter = require("./graphqlrouter")

module.exports = (app) => {
    //app.use(aboutrouter)
    aboutrouter(app)
    graphqlrouter(app)

}





