'use strict'
const gqlDomain = require('../../../domain/gqldomain')



class aboutController{
    constructor(){}

    getabout(req, res){
        new gqlDomain().findAll().then(r => res.send(r) ) 
       // gql.create({name: "al" , age: 18, status:"D" }).then(result => res.send( result) );
        
    }
}

module.exports = new aboutController();    