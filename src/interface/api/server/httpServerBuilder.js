'use strict'

const ServerBaseBuilder = require("./ServerBaseBuilder");
const httpServer = require("./httpServer")
const http = require('http')

class httpServerBuilder extends ServerBaseBuilder {
    constructor(builder) {
        super(builder);
        http.createServer(this.app)
    }

    setPort(port) {
        return super.setPort( port || 80);
    }

    build() {
        return new httpServer(this)
    }
}

module.exports = httpServerBuilder;