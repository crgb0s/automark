const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  plugins: [new HtmlWebpackPlugin({template: './client/index.html'})],
  devServer: {
    proxy: [
      {
        context: ['/static', '/favicon.ico'],
        target: 'http://localhost:3000',
      }
    ],
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/build'
    },
    port: 8080
  },
  module: {
    rules: [
      { 
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }
    ]
  }
}