
'use strict'

var path = require('path')
var through = require('through2')
var PluginError = require('gulp-util').PluginError

module.exports = function failReporter (opts) {
  var fails = false
  opts = opts || {}
  var buffer = opts.buffer !== false ? [] : false

  return through.obj(function (file, enc, cb) {
    if (file.standard && !file.standard.success) {
      fails = fails || []
      fails.push(path.relative(process.cwd(), file.path))
    }

    ;(buffer || this).push(file)
    cb()
  }, function (cb) {
    if (fails) {
      this.emit('error', new PluginError('gulp-standardize', {
        message: 'Standard failed for: ' + fails.join(', '),
        showStack: false
      }))
    }

    if (buffer) {
      buffer.forEach(function (file) {
        this.push(file)
      }, this)
    }

    cb()
  })
}
