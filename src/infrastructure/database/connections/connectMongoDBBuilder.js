'use stric'
const connectMongoDB = require('./connectMongoDB')
class connectMongoDBBuilder {
    constructor() {
        
    }

        
    setdbName(dbName) {
        this.dbName = dbName;
        return this;
    }
    

    build() {

        if (!connectMongoDBBuilder.instance) {
            connectMongoDBBuilder.instance = new connectMongoDB(this);
          }

        return connectMongoDBBuilder.instance
    }

}

module.exports = connectMongoDBBuilder