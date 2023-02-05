const { MongoClient, ObjectId } = require('mongodb');
const ConnectBase = require('../connections/connectBase')
const CRUDCollection = require('../crudCollection');

module.exports = class ConnectMongoDB extends ConnectBase {

    constructor(build) {
        super(build.dbName)
        this.uri = process.env.DB_URI;
        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });


        this.isConnection = false;
        this.onConnection().then(db => {
            this.db = db
        })
    }
   
    onConnection() {
        if (!this.isConnection) {
            this.connection = new Promise((resolve, reject) => {
                console.log('Connecting to MongoDB Atlas cluster...');
                this.client.connect().then(r => {
                    console.log('Successfully connected to MongoDB Atlas!');
                    this.isConnection = true;
                    resolve(this.client.db(this.dbName));
                }).catch(error => {
                    console.error('Connection to MongoDB Atlas failed!', error);
                    reject('Connection to MongoDB Atlas failed!');
                })
            })
        }
        return this.connection;
    }

    getCollection(collectionName) {
        super.getCollection(collectionName);
        if (!this.isConnection) {
            return this.onConnection().then(db => {
                return db.collection(collectionName).find().toArray()
                    .then(data => {
                        console.log(data);
                        return JSON.parse( JSON.stringify(data));
                    });
                //let collection = new CRUDCollection(_db, table)
            }).catch(error => {
                console.error('Connection to MongoDB Atlas failed!', error);
                return error
            });
        }
        return this.db.collection(collectionName).find().toArray().then(data => {
            console.log(data);
            return data
        });

    }

    getCollections() {
        return this.onConnection()
            .then(db => db.listCollections().toArray())
            .then(cols => {
                console.log("Collections", cols);
                return cols.map(d => d.name);
            })
            //.finally(() => this.client.close())
            .catch(error => {
                console.error('Connection to MongoDB Atlas failed!', error);
                process.exit();
            })
    }

    onClose() {
        this.client.close()
        this.isConnection = false;
    }

}

