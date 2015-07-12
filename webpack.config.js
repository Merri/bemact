'use strict'

var path = require('path')
var webpack = require('webpack')
var prod = process.env.NODE_ENV === 'production'

var config = {
    devtool: prod ? null : 'eval',

    entry: [
        path.join(__dirname, 'index.js')
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bemact.min.js',
        publicPath: '/dist'
    },

    externals: {
        react: 'React'
    },

    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel?stage=0'], exclude: /node_modules/ }
        ]
    },

    plugins: [
        new webpack.NoErrorsPlugin()
    ]
}

if (prod) {
    config.plugins.push(new webpack.optimize.DedupePlugin())
    config.plugins.push(new webpack.optimize.OccurenceOrderPlugin(true))
    config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config
