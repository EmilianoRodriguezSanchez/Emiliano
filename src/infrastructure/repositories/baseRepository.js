'use strict'
class BaseRepository {
    constructor(collection) {
        this.collection=collection ;
    }

    setCollection(collection){
        this.collection = collection;
    }

    async get(id){
        return await this.collection.findById(id);
    }


    async create(entity){
        return await this.collection.create(entity);
    }

    async update(id, entity){
        return await this.collection.update(id, entity);
    }

    async delete(id){
        await this.collection.findByIdAndDelete(id);
        return true;
    }


    async findAll(){
        return await this.collection.find();
    }
    
}

module.exports=BaseRepository