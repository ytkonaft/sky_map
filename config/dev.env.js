'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_GET_API: '"http://gen.loc"'
  // VUE_GET_API: '"https://www.pichshop.ru"'
})
