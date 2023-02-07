'use strict'
class BaseRepository {
    constructor(collection) {
        this.collection = collection;
    }

    setCollection(collection) {
        this.collection = collection;
    }

    get(id) {
        //if (this.collection)
            return this.collection.find(e => e.id === id);
    }


    async create(entity) {
        return await this.collection.create(entity);
    }

    async update(id, entity) {
        return await this.collection.update(id, entity);
    }

    async delete(id) {
        await this.collection.findByIdAndDelete(id);
        return true;
    }


    findAll() {
        return this.collection;
    }

}

module.exports = BaseRepository