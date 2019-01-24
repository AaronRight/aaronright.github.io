/* https://medium.freecodecamp.org/how-to-create-a-vue-js-app-using-single-file-components-without-the-cli-7e73e5b8244f */
/* npm run serve */

/* https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: './src/main.js',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader'},
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
      { test: /\.(jpg|mp3)$/, use: [ { loader: 'file-loader', options: {} } ] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html',}),
    new VueLoaderPlugin(),
  ]  
};