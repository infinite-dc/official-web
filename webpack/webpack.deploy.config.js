var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin');
const packageJson = require('../package.json');
// var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var WebpackShellPlugin = require('webpack-shell-plugin');
var layout = require('./layout');

var routers = require('./routers.deploy.json').routers;

var entry = {
  ...layout.entry,
};
routers.forEach((r) => {
  entry[r.name] = r.entry;
});
var plugins = routers.map(r => new HtmlWebpackPlugin({
  template: r.template,
  filename: r.filename,
  chunks: ['layout_common'].concat((r.layout || []).map(c => `layout_${c}`)).concat(r.name),
  inject: 'body',
  minify: false,
  templateParameters: {
    ...r.templateParameters,
  },
}));

var config = {
  context: path.join(__dirname, '..', '/src'),
  entry,
  output: {
    path: path.join(__dirname, '..', '/dist/assets'),
    filename: '[name].[chunkhash:8].js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: process.env.NODE_ENV !== 'production', // judge if dev environment.
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[chunkhash:8].css",
    }),
    new WebpackShellPlugin({
      onBuildExit: [
        'echo',
        'echo ==============',
        'echo      WORK',
        'echo ==============',
        'echo',
        'node webpack/deploy.js',
      ]
    })
  ].concat(plugins),
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: "babel-loader"
    },
    {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader']
    },
    {
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader', 'sass-loader']
    },
    {
      test: /\.less$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader', 'less-loader']
    }, {
      test: /\.(png|jpg|gif|svg|mp3|mp4|blob|woff|woff2|webp|eot|ttf)$/,
      use: [{
        loader: 'file-loader',
        options: {},
      }, ],
    }, {
      test: /\.layout\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: false,
          interpolate: true,
        },
      }],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@src': path.join(__dirname, '..', '/src'),
      '@assets': path.join(__dirname, '..', '/src/_assets'),
    }
  },
  externals: {
    lodash: "_",
    jquery: "jQuery",
  },
};

module.exports = config;
