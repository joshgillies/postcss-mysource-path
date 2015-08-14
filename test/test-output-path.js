var fs = require('fs')
var test = require('tape')
var path = require('path')

var postcss = require('postcss')
var mySourcePath = require('..')

var source = fs.readFileSync(path.join(__dirname, './fixtures/example.css'), 'utf8')

test('passes transformed paths into result.messages', function (assert) {
  postcss([mySourcePath()]).process(source).then(function (result) {
    result.messages.forEach(function (message) {
      assert.equal(message.path, 'test/image.jpg', 'outputs path')
    })
    assert.end()
  })
})

