/*
* @Description: 用户关系 controller
* @Author: qiushunbin
* @Date: 2020-04-08 16:36:48
*/
const { getUsersByFollower } = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel.js')

async function getFans(userId) {
  // service
  const { count, fansList } = await getUsersByFollower(userId)
  // 返回
  return new SuccessModel({
    count,
    fansList
  })
}

module.exports = {
  getFans
}