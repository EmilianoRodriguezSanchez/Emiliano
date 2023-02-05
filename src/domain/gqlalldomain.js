'use strict'

const UnitOfWorkFactory = require('../infrastructure/database/unitofwork/unitofworkfactory');
const RepositoryBase = require('../infrastructure/repositories/baseRepository');

module.exports = class gqlAllDomain {
    constructor() { }

    findAll() {
        let uow = UnitOfWorkFactory.create();
        return uow.cn.getCollections().then(d => {
            var p = d.map(name => {
                let q = uow.query(name)
                return _isPromise(q) ? q.then(c => {
                    return _getAll(c);
                }) : _getAll(q);
            });
            var obj = {}
            return Promise.all(p).then(items =>{ 
                items.map( (item, i) => {
                    obj[d[i]] = item;
                })
                return obj;
            });
          
        });
    }
}

function _getAll(c) {
    let gql = new RepositoryBase(c);
    return gql.findAll().then(r => r.toArray());
}
