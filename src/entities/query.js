'use strict'
var Saludo = require('../entities/saludo')
var User = require('../entities/user')
class Query {
    constructor() {
    }
    hello = (name, value = "") => new Saludo()
    user = (id) => new User()
    users = () => {
        var arrayUser = [];
        arrayUser.push(new User())
        return arrayUser;
    } //.push(new User())
}

module.exports = Query
