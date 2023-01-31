

module.exports = class ConnectBase {

    constructor(dbName) {
        this.dbName = dbName
    }


    onConnection() {
    }

    getCollection(collectionName) {
        this.collectionName = collectionName;
    }

    getCollections() {

    }


}

