const path = require('path');
const glob = require('glob');

// let entries = getEntries('../src/**/*.js');

function getEntries(filePath) {
    let files = glob.sync(filePath);
    console.log(files);
    let basename = [],
        extname;
    for (let item of files) {
        extname = path.extname(item);
        basename.push({
            basename: path.basename(item, extname),
            path: item
        });
    }
    return basename;
}

module.exports = {
    getEntries
}