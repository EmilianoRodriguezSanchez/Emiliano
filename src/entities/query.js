'use strict'
var Saludo = require('../entities/saludo')

class Query {
    constructor() {
     }
     hello = (name, value = "") => new Saludo()
}

module.exports = Query
