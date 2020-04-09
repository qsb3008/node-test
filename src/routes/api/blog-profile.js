const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')
const { follow, unFollow } = require('../../controller/user-relation')
router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getProfileBlogList(userName, pageIndex)

    // 渲染为 html 字符串
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})

router.post('/follow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  // controller
  const res = await follow(myUserId, curUserId)
  ctx.body = res
})

router.post('/unFollow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  // controller
  const res = await unFollow(myUserId, curUserId)
  ctx.body = res
})

module.exports = router