/*
* @Description: utils api 路由
* @Author: qiushunbin
* @Date: 2020-03-24 10:17:28
*/
const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const koaFrom = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

// 上传图片
// 在经过中间件koaFrom()的时候，文件就已经被丢到服务器了
// 所以文件有问题要remove掉，合法的要移动到我们想放的指定目录
router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
  // 要跟前端约定好 my-ajax.js
  // window.ajax.upload = function (url, file, callback) {
  //   var formData = new FormData()
  //   formData.append('file', file)
  const file = ctx.req.files['file'] // 参照 formidable-upload-koa 文档
  const { size, path, name, type } = file
  // controller
  ctx.body = await saveFile({
    name,
    type,
    size,
    filePath: path
  })

})

module.exports = router