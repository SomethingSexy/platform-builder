module.exports = {
  entry:  './src/apps/platform/client.js',
  output: {
    path:     'public',
    filename: 'platform.js'
  },
  module: {
    loaders: [{
      test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
    }, {
      test: /\.css$/, loader: "style-loader!css-loader"
    }, {
      test: /\.json$/, loader: "json-loader"
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?name=/[hash].[ext]&limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?name=/[hash].[ext]&limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?name=/[hash].[ext]&limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file-loader"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=image/svg+xml"
    }]
  }
};

