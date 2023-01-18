'use strict'

const ServerBase = require("./serverBase");



class httpsServer extends ServerBase {
    constructor(builder) {
        super(builder);
    }


    listen() {

        return super.listen()
    }

}

module.exports = httpsServer;