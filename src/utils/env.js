/**
 * @description 环境变量
 * @author qsb
 */

const ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isPro: ENV === 'production',
  notPro: ENV !== 'production',
  isTest: ENV === 'test',
  notTest: ENV !== 'test'
}