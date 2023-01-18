'use strict'
require('./toolsType')

global._filterIt = (arr, searchKey) => {
    return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey
    )));
}

let _resolve = (path, obj = self, separator = '.') => {
    var properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev, curr) => prev && prev[curr], obj)
}



global._findVal = (object, searchKey) => {
    return _resolve(searchKey, object)
}

global._findKey = (obj, value) => {
    return Object.keys(obj).filter(k => obj[k] === value);
}
global._contains = (arr, x) => arr.filter((elem) => x !== null && typeof x === 'string' && elem.toLowerCase() === x.toLowerCase()).length > 0;

global._isEquals = (x, y, strict = false) => {
    if (x === y) return true;
    // if both x and y are null or undefined and exactly the same

    if (!(x instanceof Object) || !(y instanceof Object)) return false;
    // if they are not strictly equal, they both need to be Objects

    if (x.constructor !== y.constructor) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for (var p in x) {
        if (!x.hasOwnProperty(p)) continue;
        // other properties were tested using x.constructor === y.constructor

        if (!y.hasOwnProperty(p)) return false;
        // allows to compare x[ p ] and y[ p ] when set to undefined

        if (x[p] === y[p]) continue;
        // if they have the same strict value or identity then they are equal

        if (typeof (x[p]) !== "object") return false;
        // Numbers, Strings, Functions, Booleans must be strictly equal

        if (!_isEquals(x[p], y[p])) return false;
        // Objects and Arrays must be tested recursively
    }

    if (strict)
        for (p in y)
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p))
                return false;
    // allows x[ p ] to be set to undefined

    return true;
}


global._isValidate = (schema, jsonData) => {
    try {
        if (!_isObject(schema)) return
        if (!_isObject(jsonData)) return

        //console.log(JSON.stringify(schema))
        //console.log(JSON.stringify(jsonData));
        const Ajv = require('ajv');
        let validate = null;
        let errors = null;
        /*
        var ajv = new Ajv({logger: console, allErrors: true, schemaId: 'id'});
        const metaSchema = require('../schema/draft-04/schema.json');
        ajv.addMetaSchema(metaSchema);
        */

        let ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. 
        { allErrors: true }
        //let draft201909 = require("../schema/draft/2019-09/schema.json")
        //ajv.addSchema(draft201909)

        var name = _findVal(schema, "id") || _findVal(schema, "$id")
        validate = ajv.getSchema(name)
        if (!validate) {
            ajv.addSchema(schema, name)
            validate = ajv.getSchema(name) || ajv.compile(schema)
        }

        var valid = validate(jsonData)
        if (!valid) {
            console.log(validate.errors);
            errors = validate.errors
        }

        //var validate = ajv.compile(schema)
        //var valid = validate(jsonData);

        //var valid = ajv.validate(schema, jsonData);
        //console.log(JSON.stringify(ajv.errors));
        //console.log(validate);
        return { validate: valid, errors: errors }
    }
    catch (e) {
        console.log("log validate:" + e);
        return { validate: false, errors: e }
    }


}