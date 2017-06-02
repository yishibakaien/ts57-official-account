const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractCss = new ExtractTextPlugin('css/[name].[hash:8].css');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const getEntries = require('./func.js').getEntries;

let config = {
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].chunk.js'
    },
    resolve: {
        extensions: ['.js', '.css', '.styl']
    },
    module: {
        rules: [{
            test: /\.js$/, 
            enforce: 'pre', // 取代preloader
            loader: 'eslint-loader', 
            exclude: path.resolve(__dirname, 'node_modules'),
        }, {
            test: /\.css$/,
            use: extractCss.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        }, {
            test: /\.styl$/,
            use: extractCss.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'stylus-loader']
            })
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, 'src'),
            exclude: path.resolve(__dirname, 'node_modules'),
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            query: {
                limit: 10000, 
                name: '../images/[name].[ext]' 
            }
        }, {
            test: /\.(woff|woff2|ttf|eot|svg)$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: '../fonts/[name].[ext]'
            }
        }]
    },
    plugins: [
        extractCss,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 3 
        }),
        new OpenBrowserPlugin({url: 'http://localhost:3005'})
    ],
    devServer: {
        host: 'localhost',
        port: 3005,
        inline: true,
        hot: false
    }
};

const entries = getEntries(path.resolve(__dirname, '../src/pages/**/*.html'));
let entry = {};
for (let item of entries) {
    // entry[item] = `../src/pages/**/${item}.js`;
    entry[item.basename] = item.path.replace('.html', '.js');
    let conf = {
        filename: `${item.basename}.html`,
        template: item.path,
        inject: true, 
        hash: false, 
        chunks: ['common', item.basename]
    };
    config.plugins.push(new htmlWebpackPlugin(conf));
}
config.entry = entry;

module.exports = config;