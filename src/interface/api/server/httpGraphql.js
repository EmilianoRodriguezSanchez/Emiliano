'use strict'

const httpServer = require("./httpServer");



class httpGraphql extends httpServer{
    constructor(builder) {
        super(builder);


    }


    listen() {

        return super.listen()
    }
}


module.exports = httpGraphql