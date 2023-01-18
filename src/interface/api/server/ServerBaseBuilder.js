'use strict'
const express = require('express')
const app = express()

const router  = express.Router();

const ServerBase = require("./serverBase");



class ServerBaseBuilder {
    constructor() {
        this.router = router;
        this.app = app;
    }

    
    setHost(host) {
        this.host = host;
        return this;
    }
    setPort(port) {
        this.port = port;
        return this;
    }
    setOnConnection(callback) {
        this.onConnectionCb = () => {console.log('Express server started on port %s ', this.port, this.host );}
    return this;
    }

    build() {
        return new ServerBase(this)
    }

}

module.exports = ServerBaseBuilder