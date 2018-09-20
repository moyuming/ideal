'use strict'
/*
    @auther moyumin 2018
*/
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const devWebpackConfig = merge(baseWebpackConfig, {
  devServer: {
    contentBase: '../dist/'
  },
  resolve: {
    alias: {
      "src": resolve('src'),
    },
  }
})
module.exports = devWebpackConfig
