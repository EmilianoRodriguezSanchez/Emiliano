'use strict'

class MongoDBUnitOfWork {
    constructor(connection) {
        this.cn = connection;
        this.session;
       /* this.cn.getCollections().then(c =>
            {
               this.collectionNames= c.map(x => x.name)
            } );
        */
    }

    query(collectionName) {
        let db = this.cn.getCollection(collectionName);
        return _isPromise(db) ? db.then(c =>  c ) : db
        }

    async startTrasaction() {

        const transactionOptions = {
            readConcern: { level: 'snapshot' },
            writeConcern: { w: 'majority' },
            readPreference: 'primary'
        };

        this.session = this.cn.client.startSession();
        try {
            session.startTrasaction(transactionOptions);

        } catch (error) {
            if (error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')) {
                // add your logic to retry or handle the error
            }
            else if (error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')) {
                // add your logic to retry or handle the error
            } else {
                console.log('An error occured in the transaction, performing a data rollback:' + error);
            }
            await this.session.abortTransaction();
        }
    };


    async complete() {
        try {
            await this.session.commitTransaction();
        } catch (error) {
            if (error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')) {
                // add your logic to retry or handle the error
            }
            else if (error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')) {
                // add your logic to retry or handle the error
            } else {
                console.log('An error occured in the transaction, performing a data rollback:' + error);
            }
            await session.abortTransaction();
        } finally {
            await session.endSession();
        }
    }

    async abortTransaction() {
        await this.session.abortTransaction();
    }
}

module.exports = MongoDBUnitOfWork