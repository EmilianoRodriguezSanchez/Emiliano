'use strict'

class aboutController{
    constructor(){}

    getabout(req, res){
        res.send("About")
    }
}

module.exports = new aboutController();