
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: {
        "index": "./example/todoReact/index.js",
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
        extensions: ['', '.js', '.jsx']
    },plugins: [
        //压缩
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
    ]
};
