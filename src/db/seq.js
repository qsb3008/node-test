const Sequelize = require('sequelize')

const conf = {
  host: '127.0.0.1',
  dialect: 'mysql'
}

const seq = new Sequelize('node_test', 'root', '88888888', conf)

// 测试连接
// seq.authenticate().then(() => {
//   console.log('ok')
// }).catch(() => {
//   console.log('error')
// })

module.exports = seq