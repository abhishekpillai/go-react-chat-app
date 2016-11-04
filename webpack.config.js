module.exports = {
  entry: './src/App.js',
  output: {
    path: './bin',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  }
};

