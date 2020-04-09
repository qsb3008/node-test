/*
* @Description: 用户关系 controller
* @Author: qiushunbin
* @Date: 2020-04-08 16:36:48
*/
const { getUsersByFollower, addFollow, deleteFollower } = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel.js')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')

async function getFans(userId) {
  // service
  const { count, fansList } = await getUsersByFollower(userId)
  // 返回
  return new SuccessModel({
    count,
    fansList
  })
}

async function follow(myUserId, curUserId) {
  // service
  try {
    await addFollow(myUserId, curUserId)
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(addFollowerFailInfo)
  }
}

async function unFollow(myUserId, curUserId) {
  // service

  const result = await deleteFollower(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)

}

module.exports = {
  getFans,
  follow,
  unFollow
}