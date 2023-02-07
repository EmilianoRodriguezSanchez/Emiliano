'use strict'

const UnitOfWorkFactory = require('../infrastructure/database/unitofwork/unitofworkfactory');
const gqlRepository = require('../infrastructure/repositories/gqlRepository');



module.exports = class gqlDomain {
    constructor() {
        this.uow = UnitOfWorkFactory.create();
    }

    async findAll() {
        try {
            //return  return new Promise(() => {}
            var c = await UnitOfWorkFactory.create().query('gql')
            //if (_isPromise(c)) {
            return new gqlRepository(c).findAll()
                //return this.q.then(c => new gqlRepository(c).findAll())
            //}
            /*else {
                return new gqlRepository(c).findAll()
            }*/
        } catch (error) {

        }
        /*finally{
            this.uow.cn.onClose()
        }*/

    }


    async getId(id) {

        var c = await UnitOfWorkFactory.create().query('gql')
        if (_isPromise(c)) {
            //   return this.q.then(c => {
            let gql =  new gqlRepository(c)
            return gql.get(id)
            //   });
        }

        else
            return new gqlRepository(c).get(id)
    }
}
