'use strict'

const httpGraphql = require("./httpGraphql");
const httpServerBuilder = require("./httpServerBuilder");

class httpGraphqlBuilder extends httpServerBuilder {
    constructor(builder) {
        super(builder);
    }

    setPort(port) {
        return super.setPort( port || 80);
    }

    build() {
        return new httpGraphql (this)
    }
}

module.exports = httpGraphqlBuilder;