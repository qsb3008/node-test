const seq = require('../seq')

const {
  STRING,
  INTEGER,
  TEXT
} = require('../types')

// blog
const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '微博图片'
  }
})

module.exports = Blog