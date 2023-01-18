'use strict'

const ServerBase = require("./serverBase");



class httpServer extends ServerBase {
    constructor(builder) {
        super(builder);
    }


    listen() {

        return super.listen()
    }

}

module.exports = httpServer;