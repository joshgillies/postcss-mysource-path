# postcss-mysource-path

[![Build Status][travis-image]][travis-link]
[![js-standard-style][standard-image]][standard-link]

[travis-image]: https://travis-ci.org/joshgillies/postcss-mysource-path.svg?branch=master
[travis-link]: https://travis-ci.org/joshgillies/postcss-mysource-path
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-link]: https://github.com/feross/standard

> PostCSS plugin for rewriting url() paths to `mysource_files`.

## Install

`npm install postcss-mysource-path`

## Example

```js
var fs = require('fs')
var postcss = require('postcss')
var mySourcePath = require('postcss-mysource-path')

var source = fs.readFileSync('input.css', 'utf8')

var output = postcss([mySourcePath()])
  .process(source, {
    from: 'src/stylesheet/index.css',
    to: 'dist/index.css'
  })
  .then(function (result) {
    result.messages.forEach(function (message) {
      console.log(message.path)
    })
  })
  .css
```

## API

## License

MIT
