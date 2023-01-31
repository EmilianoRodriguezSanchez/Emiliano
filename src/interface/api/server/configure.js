'use strict'
const compression = require('compression')
var bodyParser = require('body-parser')


module.exports = (app) => {
    console.info('config')
    app.use(compression());

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());
    
    return app;
}