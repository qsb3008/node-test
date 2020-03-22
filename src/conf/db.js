/**
 * @description 存储配置
 * db.js
 * @author qsb
 */
const { isPro } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

if (isPro) {
  REDIS_CONF = {
    // 线上的redis配置
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  REDIS_CONF
}