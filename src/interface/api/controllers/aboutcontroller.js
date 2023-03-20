'use strict'

const gqlService = require("../../../services/gqlservice");

const gqlDomain = require('../../../domain/gqldomain')
//const gqlAllDomain = require('../../../domain/gqlalldomain')


class aboutController{
    constructor(){}

    getusers(req, res){
       var id = req.params.id
       //new gqlAllDomain().findAll().then(r => res.send(r) ) 
       //new gqlDomain().getId('63d9531001ca297b385c82b8').then(r => res.send(r) ) 
       //new gqlDomain().findAll().then(r => res.send(r) ) 
       new gqlService().getGqlId(id).then(r => res.send(r) ) 
       // gql.create({name: "al" , age: 18, status:"D" }).then(result => res.send( result) );
        
    }
}

module.exports = new aboutController();    