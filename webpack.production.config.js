'use strict';

const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StringReplacerPlugin = require('webpack-string-replacer-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

module.exports = {
  entry: {
    app: './src/app.js',
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
    // new webpackUglifyJsPlugin({
    //   cacheFolder: path.resolve(__dirname, 'cache/'),
    //   debug: true,
    //   minimize: false,
    //   sourceMap: true,
    //   output: {
    //     comments: false
    //   },
    //   compressor: {
    //     warnings: false
    //   }
    // }),

    new ExtractTextPlugin({filename: 'assets/styles.css.twig'}),
    new StringReplacerPlugin({
      assets: ['styles.css.twig'],
      replaceValue: '"{{',
      newValue: '{{'
    }),
    new StringReplacerPlugin({
      assets: ['styles.css.twig'],
      replaceValue: '}}"',
      newValue: '}}'
    }),
    new CopyWebpackPlugin([
      { from: './dist/assets/app.js', to: 'assets/app.js.twig' },
      { from: './src/assets', to: 'assets' },
      { from: './src/config', to: 'config' },
      { from: './src/layouts', to: 'layouts' },
      { from: './src/pages', to: 'pages' },
      { from: './src/partials', to: 'partials' },
      { from: './src/screenshots', to: 'screenshots' },
      { from: 'theme.png', to: 'theme.png' },
      { from: 'README.md', to: 'README.md' },
      { from:
        {
        glob:'.editorconfig', dot: true }, to: '.editorconfig', toType: 'file' },
      { from:
        {
        glob:'.gitignore', dot: true }, to: '.gitignore', toType: 'file' }
      ], { copyUnmodified: false }),


    new ZipPlugin({
      filename: 'theme.zip',
      pathPrefix: 'theme/1.0.0',  
      include: [/\.twig$/, /\.md$/, /\.jpg$/, /\.jpge$/, /\.png$/, /\.ico$/, /\.json$/, '.gitignore', '.editorconfig'],
      exclude: [/\.html$/, /\.css$/, /\.js$/],
      fileOptions: {
        mtime: new Date(),
        mode: 0o100664,
        compress: true,
        forceZip64Format: false,
      }
    })
  ]
}
