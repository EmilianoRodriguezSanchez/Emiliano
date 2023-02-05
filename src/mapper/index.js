'use strict'

const _buildDefault = (target, source) => {

    if (_objectEquals(target, source)) {
        Object.keys(target).forEach(key => target[key] = source[key])
    }
    return target;
}

const _build = (target, source, schema) => {
    if (schema === undefined) {
        return _buildDefault(target, source)
    }
    _mapObject(target, source, schema)
    return target
}

const _mapObject = (target, source, schema) => {
    var keys = Object.keys(schema);
    var founds = Object.keys(target).filter(k => keys.includes(k));

    founds.map(key => {
        const pschema = schema[key];
        const value = source.hasOwnProperty(key) ? source[key] : source;
        target[key] = _mapProperty(value, pschema)
    });

    Object.keys(target).forEach(key => { if (source.hasOwnProperty(key)) target[key] = source[key] })
}

const _mapProperty = (value, schema) => {
   
    //if (/function\s+\w+\s*\(((?:[^()]+)*)?\s*\)\s*({(?:[^{}]+|(?-1))*+})/g.test(schema))
    //    schema = eval(schema);
   
    //if (/\w+\s+=\s+(\([a-zA-Z0-9_]*\)|[\(\)]+)\s+=>\s+({(?:[^{}]+)*}|([a-zA-Z0-9._\(\)]+))/g.test(schema))
    //    schema = eval(schema);
    
    //if (/(\([a-zA-Z0-9_]*\)|[\(\)]+)\s+=>\s+({(?:[^{}]+)*}|([a-zA-Z0-9._\(\)]+))/g.test(schema))
        schema = eval(schema);

    if (_isString(schema)) {

        //_id
        //source._id
        if (_isObject(value) && /[a-zA-Z_.]+/gm.test(schema))
            return _findVal(value, schema)
    }
    if (_isFuntion(schema)) {
        return schema(value);
    }
    if (_isArray(schema)) {
        if (_isArray(value)) {
            const mappedArray = [];
            const itemSchema = schema[0];
            value.forEach((item, i) => {
                const mappedItem = _mapProperty(item, itemSchema);
                if (!_isEmpty(mappedItem)) {
                    mappedArray.push(mappedItem);
                }
            });

            return mappedArray;
        }
    }
    if (_isObject(schema)) {
        return _mapObject(value, schema)
    }

}

module.exports = class Mapper {
    constructor(arg) {
        this.target = arg.target
        this.source = arg.source
        this.schema = arg.schema


    }

    build() {
        return this.buildMapper(this.target, this.source, this.schema)
    }

    buildMapper(target, source, schema) {

        var obj = {}
        console.log(Object.getPrototypeOf(target).constructor.name);
        if (!_isArray(source)) {
            obj = _build(target, source, schema);

        }
        else {
            var arr = []
            source.forEach(item => {
                let clone = Object.assign(Object.create(Object.getPrototypeOf(target)), target);
                console.log(Object.getPrototypeOf(clone).constructor.name);

                clone = _build(clone, item, schema);
                arr.push(clone)
            })
            obj = arr;
        }
        return obj;
    }

    getKeyValue(sourceObject, key) {
        return _findVal(sourceObject, key)
    }
    setKeyValue(destinationObject, key, value) {
        if (Object.hasOwn(destinationObject, key)) {
            destinationObject[key] = value
        }
        return destinationObject
    }

}


