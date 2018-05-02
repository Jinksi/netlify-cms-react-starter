// This webpack config is used to compile the JS for the CMS
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const production = process.env.NODE_ENV === 'production'

console.log(`Building CMS in ${production ? 'production' : 'development'} mode`)

const productionPlugins = production ? [new UglifyJsPlugin()] : []

module.exports = {
  entry: './cms.js',
  output: {
    filename: 'cms.bundle.js',
    path: path.resolve(__dirname, '../public/admin/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env', 'babel-preset-react'],
          plugins: [
            'babel-plugin-transform-class-properties',
            'transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'cms.bundle.css'
    }),
    ...productionPlugins
  ]
}
