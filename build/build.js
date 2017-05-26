const webpack = require('webpack');
const config = require('./webpack.mod.config');
const glob = require('glob');

let entries = getEntries('../src/**/*.js');

function getEntries(filePath) {
    let files = glob.sync(filePath);
    let basename = [],
        extname;
    for (let item of files) {
        extname = path.extname(item);
        basename.push(path.basename(item, extname));
    }
    console.log('basename', basename);
    return basename;
}

Promise.all([
    {}
])