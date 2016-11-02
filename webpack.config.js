
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './app.client/index.tsx',
    //vendor: ['react']
  },

  output: {
    path: './built/app.client',
    filename: '[name].[hash].js'
  },

  devtool: 'source-map', // todo: check this works

  resolve: {
    extensions: ['', '.js', '.ts', '.tsx', 'html', 'css', 'scss'] // '' is for folders!
  },

  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
    ],

    preLoaders: [
      // todo: investigate this. all output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `./app.client/index.html`
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor'
    // }),
    new webpack.DefinePlugin({
      app: {
        environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
      }
    }),
    // polyfill for http fetch
    // http://mts.io/2015/04/08/webpack-shims-polyfills/
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new ExtractTextPlugin('public/style.css', {
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: './app.client/images', to: 'images' }
    ]),
    new CopyWebpackPlugin([
      { from: './app.client/styles/cosmo.bootstrap.min.css', to: 'styles' }
    ])
  ],

  // externals: {
  //     "react": "React",
  //     "react-dom": "ReactDOM"
  // },

  devServer: {
    open: true,
    quiet: true,
    proxy: {
      '*': 'http://localhost:5000'
    }
  }

};
