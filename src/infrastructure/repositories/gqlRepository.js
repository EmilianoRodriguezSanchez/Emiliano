'use strict'
const BaseRepository = require('./baseRepository');
const CRUDCollection = require('../database/crudCollection')
class gqlRepository extends BaseRepository {
    constructor(collection) {
        super(collection);
    }

    get(id) {
        return super.get(id)
    }

    findAll() {
        return this.collection;
    }

    create(entity) {
        return super.create(entity);
    }

}


module.exports = gqlRepository
