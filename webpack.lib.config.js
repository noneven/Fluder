module.exports = {
  devtool: 'source-map',
  entry: {
    'index': './src/index.js'
  },
  output: {
    path: __dirname + '/build/lib',
    filename: 'fluder.js',
    library: 'Fluder',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    /**
     * 压缩
     */
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false
    //     }
    // }),
  ]
}
