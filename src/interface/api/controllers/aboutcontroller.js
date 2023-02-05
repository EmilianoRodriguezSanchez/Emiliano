'use strict'
const gqlDomain = require('../../../domain/gqldomain')
const gqlAllDomain = require('../../../domain/gqlalldomain')


class aboutController{
    constructor(){}

    getabout(req, res){
       // new gqlAllDomain().findAll().then(r => res.send(r) ) 
       //new gqlDomain().getId('63d9531001ca297b385c82b8').then(r => res.send(r) ) 
       new gqlDomain().findAll().then(r => res.send(r) ) 
       // gql.create({name: "al" , age: 18, status:"D" }).then(result => res.send( result) );
        
    }
}

module.exports = new aboutController();    