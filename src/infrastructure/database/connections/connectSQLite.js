
const ConnectBase = require('../connections/connectBase')
const { Sequelize } =requiere('sequelize');
const SQLite =require('sqlite3');

module.exports = class ConnectSQLite extends ConnectBase {

    constructor(build) {
        super(build.dbName)
        this.uri = 


        this.isConnection = false;
        
    }

    async onConnection() {
        if (!this.isConnection) {
            //this.connection = new Promise((resolve, reject) => {
            console.log('Connecting to MongoDB Atlas cluster...');
            const sequelize = new Sequelize('database', 'username', 'password', {
                dialect: 'sqlite',
                storage: '../../../../sqlite/mcu.db', // or ':memory:'
                dialectOptions: {
                  // Your sqlite3 options here
                  // for instance, this is how you can configure the database opening mode:
                  mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
                },
              });

            console.log('Successfully connected to MongoDB Atlas!');
            this.isConnection = true;
            this.connection = sequelize
        }
        return this.connection;
    }

    async getCollection(collectionName) {
        super.getCollection(collectionName);
        if (!this.isConnection) {
            try {
                this.db = await this.onConnection();
                
               
            } catch (error) {
                console.error('Connection to MongoDB Atlas failed!', error);
                return error
            }
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

