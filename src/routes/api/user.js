/**
 * @description user api 路由
 * @author
 */

const router = require('koa-router')()
const  {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout
} = require('../../controller/user')
const { userValidate } = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')
router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({
    userName,
    password,
    gender
  })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 登录
router.post('/login', async (ctx, next) => {
  // 套路：第一步，获取参数
  const { userName, password } = ctx.request.body
  // 第二步，交给一个 controller 处理
  ctx.body = await login(ctx, userName, password)
})

// 删除用户
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    // 测试环境，测试账号登录之后，可以删除自己
    const { userName } = ctx.session.userInfo
    // 调用controller
    ctx.body = await deleteCurUser(userName)
  }
})

// 修改用户信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body
  // 调用controller
  ctx.body = await changeInfo(ctx , { nickName, city, picture })
})

// 修改用户密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  const { userName } = ctx.session.userInfo
  // 调用controller
  ctx.body = await changePassword(userName, password, newPassword)
})

router.post('/logout', loginCheck, async (ctx, next) => {
  // 调用controller
  ctx.body = await logout(ctx)
})

module.exports = router