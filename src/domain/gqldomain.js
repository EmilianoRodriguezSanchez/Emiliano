'use strict'

const UnitOfWorkFactory = require('../infrastructure/database/unitofwork/unitofworkfactory');
const gqlRepository = require('../infrastructure/repositories/gqlRepository');



module.exports = class gqlDomain {
    constructor() {
        this.uow = UnitOfWorkFactory.create();
        this.q = this.uow.query('gql')
        //this.collection = getRepository(this.q);
    }

    findAll() {
        try {
            if (_isPromise(this.q)) {
                return this.q.then(c => new gqlRepository(c).findAll())
            }
            else {
                return new gqlRepository(this.q).findAll()
            }
        } catch (error) {
            
        } 
        /*finally{
            this.uow.cn.onClose()
        }*/
        
    }

    getId(id) {
        if (_isPromise(this.q)) {
            return this.q.then(c => {
                let gql = new gqlRepository(c)
                return gql.get(id)
            });
        }

        else
            return new gqlRepository(this.q).get(id)
    }
}
