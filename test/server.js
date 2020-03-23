/*
* @Description: qiushunbin
* @Author: qiushunbin
* @Date: 2020-03-23 15:28:22
*/

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)