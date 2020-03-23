/*
* @Description: qiushunbin
* @Author: qiushunbin
* @Date: 2020-03-23 10:24:42
*/
const { loginCheckFailInfo } =  require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')
// 中间件都是这样写的
/**
 * API 登录验证
 * @param {Object} ctx
 * @param {Function} next
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo)
}
// 页面登录失败
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedirect
}