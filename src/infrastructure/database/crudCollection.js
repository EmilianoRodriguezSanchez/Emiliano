'use strict'

const { Collection,ObjectId } = require("mongodb");

class CRUDCollection extends Collection {

    constructor(db, name, options) {
        try{
        super(db, name, options)}
        catch(error){
            console.log(error)
        }
    }

    findById = (id) => {
        return this.find({ _id: ObjectId(id) }).toArray();
    }

    create = async (entity) => {
        await this.insertOne(entity);
    }

    update = async (id, updatedFields) => {
        await this.updateMany(
            { _id: ObjectId(id) },
            { $set: updatedFields }
        );
    }

    findByIdAndDelete = async (id) => {
        await this.deleteMany({ _id: ObjectId(id) });
    }


}

module.exports = CRUDCollection