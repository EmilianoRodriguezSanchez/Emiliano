'use strict'

const gqlDomain = require('../domain/gqldomain');
const DataLoader = require('dataloader');

async function getCollectionGQL(keys) {
    const results = await new gqlDomain().findAll();
    return keys.map(key => results.find(r => r.id===key)  || new Error(`No result for ${key}`));
  }
 
module.exports = class gqlService {

    constructor() {
        this.gqlLoader = new DataLoader(getCollectionGQL );
    }

    getGqlId(id) {
        
        console.log('\nEvent');
        return this.gqlLoader.load(id).then(res => res);

    }

}


