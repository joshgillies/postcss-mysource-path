var fs = require('fs')
var test = require('tape')
var path = require('path')

var postcss = require('postcss')
var mySourcePath = require('..')

var source = fs.readFileSync(path.join(__dirname, './fixtures/example.css'), 'utf8')
var expected = fs.readFileSync(path.join(__dirname, 'fixtures/example.expected.css'), 'utf8')

test('transform url() path to mysource_files', function (assert) {
  var pcss = postcss()

  pcss.use(mySourcePath())

  var actual = pcss.process(source).css

  assert.equal(actual, expected, 'path rewritten')
  assert.end()
})
