/*
* @Description: 微博 view 路由
* @Author: qiushunbin
* @Date: 2020-03-25 17:35:41
*/

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
    
  })
})

module.exports = router