const server = require('./server')

test('json 返回格式正确', async () => {
  const res = await server.get('/json')
  // const res = await (await server.post('/login')).setEncoding({
  //   userName: 'zhangsan',
  //   password: 123
  // })
  // 如果这个接口做了登录拦截，可能测试结果就会报错
  // router.get('/json', loginCheck, async () => {}
  // 把loginCheck去掉就能跑通
  expect(res.body).toEqual({
    title: 'koa2 json'
  })
})