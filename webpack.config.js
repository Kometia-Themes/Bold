'use strict';

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/[name].js',
  },
  module: {
    rules: [
    {
      test: /\.(js)$/,
      loader: 'babel-loader',
      exclude: /node_module/,
      query: {
        presets: ['es2015']
      }
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      },
      {
        test: /\.exec.js$/,
        use: [ 'script-loader' ]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpackUglifyJsPlugin({
      cacheFolder: path.resolve(__dirname, 'cache/'),
      debug: false,
      minimize: false,
      sourceMap: true,
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('assets/styles.css.twig')
  ]
}
