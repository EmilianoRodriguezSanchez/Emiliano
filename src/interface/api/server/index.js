'use strict'
require('dotenv').config()
console.log(process.env)
console.log(process.env.HOST)

require("../../../tools/toolsType");
require("../../../tools/toolsObject");
require("../../../tools/toolsFile");
require("../../../tools/toolsGraphql");

const config = require("./configure");
const httpServerBuilder = require("./httpServerBuilder");
const httpsServerBuilder = require("./httpsServerBuilder");
const routers = require("../routers/index");
const httpGraphqlBuilder = require("./httpGraphqlBuilder");



const http = new httpServerBuilder().setHost(process.env.HOST).setPort(process.env.HTTP_PORT).setOnConnection().build();
config(http.app);
routers(http.app);
http.listen();
/*
const https = new httpsServerBuilder().setHost('0.0.0.0').setPort(443).setOnConnection().build();
//config(https.app);
routers(https.app);
https.listen();
*/

const httpgpq = new httpGraphqlBuilder().setHost('0.0.0.0').setPort(4000).setOnConnection().build();
routers(httpgpq.app);
httpgpq.listen();