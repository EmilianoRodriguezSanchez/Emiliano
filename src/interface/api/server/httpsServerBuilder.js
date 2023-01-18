'use strict'

const ServerBaseBuilder = require("./ServerBaseBuilder");
const httpsServer = require("./httpsServer")
const https = require('https')

class httpsServerBuilder extends ServerBaseBuilder {
    constructor(builder, options) {
        super(builder);
        https.createServer(options, this.app)
    }


    
    build() {
        return new httpsServer(this)
    }
}

module.exports = httpsServerBuilder;