const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const nodeEnv = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[chunkhash].js',
    clean: true
  },
  mode: nodeEnv,
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      maxSize: 100000
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    alias: {
      '@App': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  plugins: [
    new Dotenv({
      path: path.join(__dirname, '.env')
    }),
    new HtmlWebpackPlugin({
      template: './public/index.htm'
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['build']
    }),
    new CopyPlugin({
      patterns: [{ from: 'public/images', to: 'images' }]
    })
  ],
  devServer: {
    host: 'localhost',
    port,
    historyApiFallback: true
  }
}
