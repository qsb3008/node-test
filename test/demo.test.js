/*
* @Description: 测试用例demo
* @Author: qiushunbin
* @Date: 2020-03-23 14:51:41
*/
function sum(a, b) {
  return a + b
}

test('10 + 20 应该等于 30', () => {
  const res = sum(10, 20)
  expect(res).toBe(30)
  expect(res).not.toBe(40)
})