

module.exports = class ConnectBase {

    constructor(dbName) {
        this.dbName = dbName
    }


    onConnection() {
    }

    getCollection(collectionName) {
        console.log(`collection: ${collectionName}:` )
        this.collectionName = collectionName;
    }

    getCollections() {

    }


}

