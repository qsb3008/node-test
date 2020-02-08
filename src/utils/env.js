/**
 * 
 */

const ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isPro: ENV === 'production',
  notPro: ENV !== 'production'
}