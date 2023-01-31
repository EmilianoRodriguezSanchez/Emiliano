'use strict'

const UnitOfWorkFactory = require('../infrastructure/database/unitofwork/unitofworkfactory');
const gqlRepository = require('../infrastructure/repositories/gqlRepository');
const RepositoryBase = require('../infrastructure/repositories/baseRepository');

module.exports = class gqlDomain {
    constructor() { }

    findAll() {
        let uow = UnitOfWorkFactory.create();
        let q = uow.query('gql')
        return _isPromise(q) ? q.then(c => {
            return _getAll(c);
        }) : _getAll(q);

    }
}

function _getAll(c) {
    let gql = new gqlRepository(c);
    return gql.findAll().then(r => {
        console.log(r);
        return r;
    });
}
