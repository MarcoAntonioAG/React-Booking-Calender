const path = require('path');
const CombineLoaders = require('webpack-combine-loaders')

module.exports = {
  context: path.join(__dirname),
  entry: './src/components/Calendar/Calendar',

  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.es6.jsx', '.scss']
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
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
        query: { presets: ['react', 'es2015', 'stage-0'] }
      }
    ]
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ],
};
