
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "index": "./example/index.js",
    },
    output: {
        path: __dirname + "/build/js",
        filename: "[name].bundle.js",
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: [ 'es2015', 'react' ]
            }
        },{test: /\.css$/, loader: 'style-loader!css-loader'}]
    },resolve: {
        extensions: ['', '.js', '.jsx', '.md', '.txt']
    },plugins: [
        //压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // new ExtractTextPlugin("../css/[name].bundle.css"),
    ]
};
