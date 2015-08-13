var path = require('path')
var postcss = require('postcss')
var parseCssUrls = require('css-url-parser')

module.exports = postcss.plugin('postcss-mysource-path', mySourcePath)

function mySourcePath () {
  return function (styles, result) {
    styles.eachDecl(function (decl) {
      if (decl.value && decl.value.indexOf('url(') > -1) {
        var url = parseCssUrls(decl.value)[0]

        decl.value = rewriteUrl(decl.value, url)
      }
    })
  }
}

function rewriteUrl (value, url) {
  return value.replace(url, 'mysource_files/' + path.basename(url))
}
