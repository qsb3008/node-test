/**
 * @description 用户 逻辑
 * @author qsb
 */
const {
  registerUserNameNotExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} =  require('../model/ErrorInfo')
const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { doCrypto } = require('../utils/cryp')
/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
      // { errno: 0, data: {....} }
      return new SuccessModel(userInfo)
  } else {
      // { errno: 10003, message: '用户名未存在' }
      return new ErrorModel(registerUserNameNotExistInfo)
  }
}
/**
 *
 *
 * @param {*} { userName, password, gender}
 */
async function register ({ userName, password, gender}) {
  const userInfo = await getUserInfo(userName, password)
  if (userInfo) {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
  
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (ex) {
    // console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }

}
/**
 * 获取用户信息
 * @param {string} userName
 * @param {string} password
 */
async function login(ctx, userName, password) {
  // 登录成功 ctx.session.userInfo = xxx
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo)
  }
  // 登录成功
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

// 删除当前用户
async function deleteCurUser (userName) {
  // service
  const result = await deleteUser(userName)
  if (result) {
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(deleteUserFailInfo)
}

async function changeInfo (ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  // service
  const result = await updateUser({
    newNick: nickName,
    newCity: city,
    newPicture: picture
  }, {
    userName
  })
  if (result) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(changeInfoFailInfo)
}

async function changePassword(userName, password, newPassword) {
  // service
  const result = await updateUser({
    newPassword: doCrypto(newPassword)
  }, {
    userName,
    password: doCrypto(password)
  })
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(changePasswordFailInfo)
}

async function logout(ctx) {
  // service
  delete ctx.session.userInfo
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout
}