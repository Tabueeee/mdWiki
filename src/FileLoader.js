const fs = require('fs');

var FileLoader = function () {

    const fileCache = {};

    var loadFileContent = function (path) {
        if (!fileCache[path] || process.env.CACHE_ASSETS === 'false') {
            fileCache[path] = fs.readFileSync(path);
        }

        return new Buffer(fileCache[path]);
    };

    return {
        'loadFileContent': loadFileContent
    };
};

module.exports = FileLoader;
