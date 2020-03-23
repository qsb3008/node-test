const { User } = require('../../src/db/model/index')

test('User 模型的各个属性，符合预期', () => {
  // build这个api，会构建一个内存的User的实例，但是不会操作数据库
  const user = User.build({
    userName: 'zhangsan',
    password: '123',
    nickName: '张三',
    // gender: 1,
    picture: '/xxx.png',
    city: '北京'
  })
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('123')
  expect(user.nickName).toBe('张三')
  expect(user.gender).toBe(3)
  expect(user.picture).toBe('/xxx.png')
  expect(user.city).toBe('北京')
})