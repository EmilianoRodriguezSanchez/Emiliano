'use stric'


const NUMERIC = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;
const MAX_INT64 = 9223372036854775807;

global._isEmpty = (value) => (
    value === null || // check for null
    value === undefined || // check for undefined
    value === '' || // check for empty string
    (Array.isArray(value) && value.length === 0) || // check for empty array
    (typeof value === 'object' && Object.keys(value).length === 0)) // check for empty object

global._isJson = (str) => {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}

global._isFuntion = (value) =>  value && (Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function);

global._isObject = (val) => {
    if (val === null || val === undefined) {
        return false;
    }
    return ((typeof val === 'function') || (typeof val === 'object'));
}

global._isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

global._isInteger = value => (Number.isInteger(value) || typeof value === 'number') &&
    isFinite(value) && Math.floor(value) === value;

global._isFloat = value => (typeof value === "number" && Math.abs(value % 1) > 0);
global._isArray = value => Array.isArray(value) || toString.call(value) === '[object Array]';
global._isBoolean = (value) => {
    switch (String(value).toLowerCase().trim()) {
        case "true":
        case "yes":
        case "1":
        case "false":
        case "no":
        case "0":
        case null:
            return true;
        default:
            return false;
    }
}

global._isRegExp = (value) => toString.call(value) === '[object RegExp]';
global._isFile= (obj) => toString.call(obj) === '[object File]';
global._isBlob = (obj) => toString.call(obj) === '[object Blob]';
global._isPromiseLike =  (obj) => obj && isFunction(obj.then);
global._isChar = value => isString(value) && value.length === 1;
global._isDate = value => value instanceof Date || Object.prototype.toString.call(value) === '[object Date]';
global._isString = val => typeof val === 'string' || ((!!val && typeof val === 'object') && Object.prototype.toString.call(val) === '[object String]');


global._isDouble = value => typeof value === "number" && isNumber(value) && !NUMERIC.test(String(value));
global._isBigInt = value => typeof value === "number" && isInteger(value) && -MAX_INT64 < value && value < MAX_INT64;
global._asFloat = (num, n) => !isNaN(+num) ? (+num).toFixed(n || 2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1') : num;
global._toNumber = (returnval) => isNaN(i) ? returnval !== undefined ? returnval : -1 : Number(returnval);

global._isNullOrEmpty = (obj) => {
    if (obj === null || obj === "" || typeof obj === "undefined") return true;
    if (Array.isArray(obj)) return obj.length > 0;
    if (typeof obj === 'string' || obj instanceof String) return obj.length === 0 || !obj.trim() || (obj.replace(/\s/g, "") == "") || (!/[^\s]/.test(obj)) || (/^\s*$/.test(obj));
    if (typeof (obj) === 'object' && (JSON.stringify(obj) === '{}' || JSON.stringify(obj) === '[]')) return true;
    return false;
}
