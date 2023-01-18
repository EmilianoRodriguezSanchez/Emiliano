'use strict'
let fs = require('fs');
let path = require('path');

global._getFiles = (directoryPath) => {
    if (fs.existsSync(directoryPath)) {
        return fs.readdirSync(directoryPath, { withFileTypes: true }).filter(item => !item
            .isDirectory()).map(item => {
                var result = {}
                result.path = path.join(directoryPath, item.name)
                result.file = item.name
                result.extension = item.name.split('.').pop();
                result.name = item.name.replace('.' + result.extension, '');
                return result;
            })
    }
    return []
}

global._getdirectories = source => fs.readdirSync(source, { withFileTypes: true }).reduce((a, c) => {
        c.isDirectory() && a.push(c.name)
        return a
    }, [])



global._findFiles = function (folder, pattern = /.*/, callback) {
    var flist = [];

    fs.readdirSync(folder).map(function (e) {
        var fname = path.join(folder, e);
        var fstat = fs.lstatSync(fname);
        if (fstat.isDirectory()) {
            // don't want to produce a new array with concat
            Array.prototype.push.apply(flist, _findFiles(fname, pattern, callback));
        } else {
            if (pattern.test(fname)) {
                flist.push(fname);
                if (callback) {
                    callback(fname);
                }
            }
        }
    });
    return flist;
};


global._mkdirs = (path) => {
    var dirs = path.split('\\');
    var prevDir = dirs.splice(0, 1) + "/";
    while (dirs.length > 0) {
        var curDir = prevDir + dirs.splice(0, 1);
        if (!fs.existsSync(curDir)) {
            fs.mkdirSync(curDir);
        }
        prevDir = curDir + '/';
    }
}

global._readFile = (srcPath) => {
    return new Promise(function (resolve, reject) {
        fs.readFile(srcPath, 'utf8', function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

global._writeFile = (savPath, data) => {
    return new Promise(function (resolve, reject) {
        fs.writeFile(savPath, data, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

global._createOrUpdateFile = (fn, value) =>
    fs.access(fn, fs.constants.F_OK | fs.constants.W_OK, (err) => {
        if (err) {
            _writeFile(fn, JSON.stringify(value))
        }
        else
            _readFile(fn).then(body => JSON.parse(body))
                .then(json => {
                    json = value;
                    return json
                })
                .then(json => JSON.stringify(json))
                .then(str => _writeFile(fn, str))
                .catch(error => console.warn(error))
    });



global._fileConfig = (env, pathconfig='/src/config') => {
    const path = require('path');
    const root = path.resolve("./");
    let directoryPath = path.join(root, pathconfig);
    const allowedFiles = [".js", ".json"];
    const regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(." + env + ".)+([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
    let files = _findFiles(directoryPath).filter(f => regex.test(f));
    let cofing = require(`${files}`);
    return cofing;
}