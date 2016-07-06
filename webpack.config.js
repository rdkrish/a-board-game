var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './public/react/main.jsx',
    vendors: [
      'react',
      'react-dom',
      'react-router',
      'material-ui',
      'fbemitter',
      'react-tap-event-plugin',
      'whatwg-fetch',
      'restful.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public/react'),
    chunkFilename: "[name].js",
    filename: "[name].js"
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.less$/,
      loader: "style!css!less?noIeCompat"
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file?name=../fonts/[name].[ext]'
    }]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /a^/),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};
