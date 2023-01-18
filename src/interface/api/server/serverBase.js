'user strict'



class ServerBase {
    constructor(builder){
        
        this.app=builder.app;
        this.router = builder.router;
        this.port=builder.port;
        this.host= builder.host;
        this.onConnectionCb=builder.onConnectionCb;

    }

    listen(){
        return this.app.listen(this.port,this.host,this.onConnectionCb)
        //return this.server.listen.apply(this.server, arguments);
    }
}

module.exports = ServerBase