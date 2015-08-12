var postcss = require('postcss')

module.exports = postcss.plugin('postcss-mysource-path', mySourceFiles)

function mySourceFiles (options) {
  options = options || {}

  return function (styles, result) {
    // TODO: Make module! See below for a starting point
    // https://github.com/postcss/postcss/blob/master/docs/api.md#resultmessages
  }
}
