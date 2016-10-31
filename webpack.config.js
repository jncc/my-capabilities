
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.tsx',
    //vendor: ['react']
  },

  output: {
    path: './built/app.client',
    filename: '[name].[hash].js'
  },

  // todo: check this works
  devtool: 'source-map',

  resolve: {
    extensions: ['', '.js', '.ts', '.tsx', 'html', 'css', 'scss'] // '' is for folders!
  },

  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'raw' }, // todo: remove
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
    ],

    preLoaders: [
      // todo: investigate this
      // all output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/index.html`
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor'
    // }),
    new webpack.DefinePlugin({
      app: {
        environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
      }
    }),
    new ExtractTextPlugin('public/style.css', {
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: './src/images', to: 'images' }
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
