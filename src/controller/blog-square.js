/*
* @Description: 广场页 controller
* @Author: qiushunbin
* @Date: 2020-04-04 09:44:54
*/
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/blog')
/**
 * 获取个人主页微博列表
 * @param {string} userName 用户名
 * @param {number} [pageIndex=0] 当前页面
 */
async function getSquareBlogList (pageIndex = 0) {
  // services
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
  const blogList = result.blogList
  // 拼接返回输出
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE,
    count: result.count
  })
}

module.exports = {
  getSquareBlogList
}