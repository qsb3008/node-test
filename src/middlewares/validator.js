/*
* @Description: qiushunbin
* @Author: qiushunbin
* @Date: 2020-03-22 15:43:07
*/
const  { jsonSchemaFileInfo } = require('../model/ErrorInfo')
const  { ErrorModel } = require('../model/ResModel')

function genValidator (validateFn) {
  async function validator (ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    // 验证通过
    await next()
  }
  // 返回中间件
  return validator
}

module.exports = {
  genValidator
}