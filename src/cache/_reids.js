/**
 * @author qsb
 * @description 连接redis 的方法 get set
 */

const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
  console.log('redis error ', err)
})
/**
 * redis set
 * @param {string} key 
 * @param {string} val 
 * @param {number} timeout 过期时间 单位 s
 */
function set (key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
  }
}

function get (key) {
  const promise = new Promise((res, rej) =>{
    redisClient.get(key, (err, val) => {
      if (err) {
        rej(err)
        return
      }
      if (val == null) {
        res(null)
        return
      }
      try {
        res(
          JSON.stringify(val)
        )
      } catch (ex) {
        res(val)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}