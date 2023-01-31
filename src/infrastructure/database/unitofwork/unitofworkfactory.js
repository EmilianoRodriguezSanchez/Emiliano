'use strict'

class UnitOfWorkFactory {
   static create(callback) {
      let uow = undefined;
      switch (process.env.DBTYPE) {
         case "mongodb":
            let MongoDBUnitOfWork = require('./mongodbunitofwork');
            let connectMongoDBBuilder = require('../connections/connectMongoDBBuilder')
            //TODO    
            var cn = new connectMongoDBBuilder().setdbName('gql_poc').build();
            uow = new MongoDBUnitOfWork(cn);
            return uow;

            break;
      }
   }
}

module.exports = UnitOfWorkFactory