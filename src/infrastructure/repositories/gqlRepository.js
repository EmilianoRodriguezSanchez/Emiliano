'use strict'
const BaseRepository = require('./baseRepository');
const CRUDCollection = require('../database/crudCollection')
class gqlRepository extends BaseRepository {
    constructor(collection) {
        super(collection);
    }

    get(id) {


      /*  if (!this.cn.isConnection) this.db = this.cn.getCollection('gql');
        return this.db.then(c => {
            this.setCollection(c);
            return super.get(id)
        }).catch(error => console.log(error)
        ).finally(() => {
            console.log('close connection')
            this.cn.onClose();
        });*/
        return super.get(id)
    }


    findAll() {
        /*if (!this.cn.isConnection) this.db = this.cn.getCollection('gql');
        return this.db.then(c => {
            this.setCollection(c);
            return this.collection.find().toArray();
        }).catch(error => console.log(error)
        ).finally(() => {
            console.log('close connection')
            this.cn.onClose();
        });*/
        return this.collection.find().toArray();
    }

    create(entity) {
        /*if (!this.cn.isConnection) this.db = this.cn.getCollection('gql');
        return this.db.then(c => {
            this.setCollection(c);
            return super.create(entity);
        }).catch(error => console.log(error)
        ).finally(() => {
            console.log('close connection')
            this.cn.onClose();
        });
*/
        return super.create(entity);
    }

}


module.exports = gqlRepository
