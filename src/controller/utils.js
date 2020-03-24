/*
* @Description: utils controller
* @Author: qiushunbin
* @Date: 2020-03-24 10:39:15
*/
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')
const path = require('path')
// 存储目录
const dist = DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 文件体积最大 1M (b,kb,m)
const MAX_SIZE = 1024 * 1024 * 1024
// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then((exist) => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * @param {string} name
 * @param {string} type
 * @param {number} size
 * @param {string} filePath
 * @returns
 */
async function saveFile({ name, type, size, filePath }) {
  if (size > MAX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  // 移动文件
  const fileName = Date.now() + '.' + name // 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, distFilePath)
  //  返回信息
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports =  {
  saveFile
}