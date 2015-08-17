var path = require('path')
var postcss = require('postcss')
var parseCssUrls = require('css-url-parser')

module.exports = postcss.plugin('postcss-mysource-path', mySourcePath)

function mySourcePath () {
  return function transformer (styles, result) {
    styles.eachDecl(function processDecl (decl) {
      var url

      if (
        decl.value &&
        decl.value.indexOf('url(') > -1 &&
        (url = parseCssUrls(decl.value)[0]) &&
        !isAbsoluteUrl(url)
      ) {
        decl.value = rewriteUrl(decl.value, url)

        result.messages.push({
          plugin: 'postcss-mysource-path',
          path: url
        })
      }
    })
  }
}

function rewriteUrl (value, url) {
  return value.replace(url, 'mysource_files/' + path.basename(url))
}

function isAbsoluteUrl (url) {
  return /^[a-z]+:\/\//.test(url)
}
