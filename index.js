var path = require('path')
var postcss = require('postcss')
var parseCssUrls = require('css-url-parser')
var escapeRegexString = require('escape-regex-string')

module.exports = postcss.plugin('postcss-mysource-path', mySourcePath)

function mySourcePath () {
  return function transformer (styles, result) {
    styles.eachDecl(function processDecl (decl) {
      var urls

      if (
        decl.value &&
        decl.value.indexOf('url(') > -1 &&
        (urls = parseCssUrls(decl.value)).length
      ) {
        urls
          .filter(function ignoreAbsolute (url) {
            return !path.isAbsolute(url) && !isAbsoluteUrl(url)
          })
          .forEach(function processUrl (url) {
            decl.value = rewriteUrl(decl.value, url)

            result.messages.push({
              plugin: 'postcss-mysource-path',
              path: url
            })
          })
      }
    })
  }
}

function rewriteUrl (value, url) {
  var search = new RegExp(escapeRegexString(url) + '(\'|")')
  return value.replace(search, 'mysource_files/' + path.basename(url) + '$1')
}

function isAbsoluteUrl (url) {
  return /^[a-z]+:\/\//.test(url)
}
