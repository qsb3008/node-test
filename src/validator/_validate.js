/*
* @Description: qiushunbin
* @Author: qiushunbin
* @Date: 2020-03-22 11:11:05
*/

const Ajv = require('ajv')
const ajv = new Ajv()

/**
 * @param {*} schema
 * @param {*} [data={}]
 * @returns
 */
function _validate (schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = _validate
