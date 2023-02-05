'use stric'
const path = require("path")
const Mapper = require(".");
const directoryMapper = path.join(__basedir, '/src/mapper/');
const directoryEntity = path.join(__basedir, '/src/entities/');
class MapperBuilder {
    constructor() {

    }

    setData(data){
        this.source =data;
        return this;
    }

    build() {

        if (!MapperBuilder.instance) {

            const allowedFiles = [".json"]
            const regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
            let files = _findFiles(directoryMapper).filter(f => regex.test(f));
            files.map(filepath => {

                var json = require(filepath);
                var obj = _findFiles(directoryEntity).find(f => (new RegExp( json.target)).test(f));  //obj
                if (obj) {
                    var entity = require(obj)
                    this.target = new entity();
                    this.db = json.source
                    this.schema = json.map
                }
            })
            MapperBuilder.instance = new Mapper(this);
        }




        return MapperBuilder.instance
    }

}

module.exports = MapperBuilder