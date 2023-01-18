'use strict'

const badTypeNameRegex = /[\W]+/g;

const cleanName = (name) => name.replace(badTypeNameRegex, "");

const transformPrimitive = (value) => {

    if (_isInteger(value)) {
        return "Int";
    }
    if (_isBoolean(value)) {
        return "Boolean";
    }
    if (_isNumber(value)) {
        return "Float";
    }
    if (_isString(value))
        return "String";

    if (_isEmpty(value))
        return "String";
};

const toPascalCase = (name) => {
    return name
        .toLowerCase()
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
            new RegExp(/\s+(.)(\w*)/, 'g'),
            ($1, $2, $3) => `${$2.toUpperCase() + $3}`
        )
        .replace(new RegExp(/\w/), s => s.toUpperCase());
};

const schemaToString = (typeName, prefix, obj) => {
    //let util = require("util");
    let str = "";
    if (_isEmpty(prefix)) prefix = '';

    let funcNames = Object.keys(obj).map((key) => {
        if (_isArray(obj[key])) {
            const firstElement = obj[key][0];

            //Array of arrays case
            if (firstElement.length === 1) {
                return `${prefix}${toPascalCase(key)}: [${firstElement}]`;
            }

            if (_isArray(firstElement) || _isObject(firstElement)) {
                const newTypeName = `${prefix}${toPascalCase(key)}`;
                str += schemaToString(newTypeName, prefix, firstElement);
            }
            return "";
        }
        if (_isFuntion(obj[key])) {
            var func = eval(obj[key])
            //const newTypeName = `${prefix}${key}`;
            // str += schemaToString(newTypeName, prefix, obj[key]);
            var args = getParamNames(func).map(e => `${e.key}: ${transformPrimitive(e.value)}`).join(', ')
            return args ? `${prefix}${key}(${args}): ${type(func())}` : `${prefix}${key}: ${type(func())}`;
        }
        if (_isObject(obj[key])) {
            const newTypeName = `${prefix}${toPascalCase(key)}`;
            str += schemaToString(newTypeName, prefix, obj[key]);
            //obj[key] = newTypeName;
            return "";
        }

        return `${cleanName(key)}: ${transformPrimitive(obj[key])}`;

    }).filter(e => !_isEmpty(e));

    let newObjString = `{ ${funcNames.join('\n')} }`

    if (_isObject(obj)) {
        typeName = toPascalCase(type(obj))
        //const newObjString = util.inspect(obj, { depth: null, compact: false });
        return `${str}type ${typeName} ${newObjString.replace(/'/g, "")} `.replace(/\[\n/g, "[")
            .replace(/\[\s+/g, "[")
            .replace(/\n\s+\]/g, "]")
            //.replace(/,/g, "")
            .replace(/ {3,}/g, "  ");

    }


}

const type = (obj) => {
    var str = (obj.prototype ? obj.prototype.constructor : obj.constructor).toString();
    var cname = str.match(/class\s(\w*)/)[1];
    var aliases = ["", "anonymous", "Anonymous"];
    return aliases.indexOf(cname) > -1 ? "class" : cname;
}

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*.*\*\/))/mg;
const STRIP_KEYWORDS = /(\s*async\s*|\s*function\s*)+/;

const ARGUMENT_NAMES = /\(([^)]+)\)\s*=>|([a-zA-Z_$]+)\s*=>|[a-zA-Z_$]+\(([^)]+)\)|\(([^)]+)\)/;

const ARGUMENT_SPLIT = (/,\s*(?=[^=,]+=)/);
const ARGUMENT_KEYVALUE = (/^(?<key>[^=\s]+)\s*=\s*(?<value>(?:"[^"\n]*(?:"|$)|\S+(?=,|$)))$/);
const ARGUMENT_KEY = (/^(?<key>[^=\s]+)$/);
/*
The Javascript Function Parameters are the names that are defined in the function definition and real values passed to the function in the function definition are known as arguments.
Parameter Rules: 
 - There is no need to specify the data type for parameters in JavaScript function definitions.
 - It does not perform type-checking based on the passed-in JavaScript functions.
 - It does not check the number of received arguments.
Defaults Parameter: The default parameters are used to initialize the named parameters with default values in case, when no value or undefined is passed. 
*/
const getParamNames = (func) => {
    const fnStr = func.toString().replace(STRIP_COMMENTS, "").replace(STRIP_KEYWORDS, "").trim();
    const match = ARGUMENT_NAMES.exec(fnStr)[1];
    if (match === undefined) {
        return [];
    }

    let params = []
    params = match.split(ARGUMENT_SPLIT);
    return [...params.map(e => getGroups(e, ARGUMENT_KEY)).filter(e => !_isEmpty(e)), ...params.map(e => getGroups(e, ARGUMENT_KEYVALUE)).filter(e => !_isEmpty(e))];
}


const getGroups = (value, expr) => {
    var regexp = new RegExp(expr, "g");
    const { groups } = (regexp.exec(value) || {});
    if (groups) {
        groups.value = groups.value ? groups.value.trim() : undefined;
    }
    return groups;
}



global.toDefType_gql = (varsObj) => {
    if (!_isObject(varsObj)) return undefined
    return schemaToString(null, null, varsObj)

}