const path = require('path');
const webpack = require('webpack')
const CombineLoaders = require('webpack-combine-loaders')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname),

  devtool: 'source-map',

  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index.js',
    publicPath: '/public/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.es6.jsx', '.scss']
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        include: /src/,
        loader: CombineLoaders([
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader'
          }
        ])
      },
      {
        test: /(\.js)|(\.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            plugins: ['transform-decorators-legacy' ],
            presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '/index.html'),
        filename: 'index.html',
        inject: 'body'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API_URL': JSON.stringify('https://react-booking-calendar.herokuapp.com')
      }
    })
  ]
};