/*
* @Description: 用户关系模型
* @Author: qiushunbin
* @Date: 2020-04-08 11:17:14
*/
const seq = require('../seq')
const { INTEGER } = require('../types')

const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户的id'
  }
})

module.exports = UserRelation