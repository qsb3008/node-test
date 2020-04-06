/*
* @Description: 微博缓存层
* @Author: qiushunbin
* @Date: 2020-04-06 16:37:08
*/
const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square:'
/**
 * @param {number} pageIndex
 * @param {number} pageSize
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
  // 尝试获取缓存
  const cacheResult = await get(key)
  if (cacheResult != null) {
    // 获取缓存成功
    return cacheResult
  }
  // 没有缓存
  const result = await getBlogListByUser({
    pageIndex, pageSize
  })
  // 设置缓存，过期时间 1min
  set(key, result, 60)
  return result
}

module.exports = {
  getSquareCacheList
}
