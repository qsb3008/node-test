/**
 * @description
 * @author
 */

//  services要操作数据，所以要引用User模型
const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

// 判断用户名是否存在和用户登录都使用这个方法
// routes、controller和service并不是一对一的关系
async function getUserInfo (userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }
  // 查询
  // ============
  // 特别注意，读取数据库信息是异步操作，要加上await
  // 忘记写await，排查错误花了很长时间
  // ============
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  if (result == null) {
    // 未找到
    return result
  }
  // 格式化处理
  const formatRes = formatUser(result.dataValues)
  return formatRes
}
/**
 * @param {string} userName
 * @param {string} password
 * @param {number}gender
 * @param {string} nickName
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })
  return result.dataValues
}

module.exports = {
  getUserInfo,
  createUser
}