const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const extractCss = new ExtractTextPlugin('css/[name].[hash:8].css');
const pkg = require('../package.json');
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
        new CleanPlugin(['dist'], {
            root: path.resolve(__dirname, '../')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 3 
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.BannerPlugin([
            `created by ${pkg.author} on ${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}`,
            `${pkg.name} v${pkg.version}`,
            `Copyright  ${new Date().getFullYear()}, ${pkg.author}, ${pkg.license} license`
        ].join('\n'))
    ]
};

const entries = getEntries(path.resolve(__dirname, '../src/pages/**/*.html'));
let entry = {};
for (let item of entries) {
    entry[item.basename] = item.path.replace('.html', '.js');
    let conf = {
        filename: `${item.basename}.html`,
        template: item.path,
        inject: true, 
        hash: false, 
        chunks: ['common', item.basename],
        minify: { 
            removeComments: true,
            collapseWhitespace: true
        }
    };
    config.plugins.push(new htmlWebpackPlugin(conf));
}
config.entry = entry;

module.exports = config;