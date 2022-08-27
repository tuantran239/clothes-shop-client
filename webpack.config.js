const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 4000

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
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.htm'
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['build']
    })
  ],
  devServer: {
    host: 'localhost',
    port,
    historyApiFallback: true
  }
}
