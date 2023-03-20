'use strict'

const gqlDomain = require('../domain/gqldomain');
const DataLoader = require('dataloader');

async function getCollectionGQL(keys) {
    console.log('Domain')
    const results = await new gqlDomain().findAll();
    return keys.map(key => results.find(r => r.id===key)  || new Error(`No result for ${key}`));
  }
 
module.exports = class gqlService {

    constructor() {
        this.gqlLoader = new DataLoader(getCollectionGQL );
    }

    async getGqlId(id) {
        
        console.log('\nEvent Loader');
        var arraykeys =await this.gqlLoader.load(id)
        return arraykeys;

    }

    getGqls() {
        
        console.log('GPLS');
        return new gqlDomain().findAll();

    }

}


