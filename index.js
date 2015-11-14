
'use strict'

var through = require('through2')
var standard = require('standard')
var PluginErr = require('gulp-util').PluginError

module.exports = exports = function standardize () {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      return cb(new PluginErr('gulp-standardize', 'Streams are not supported!'))
    }

    standard.lintText(file.contents.toString(), function (err, data) {
      if (err) return cb(err)

      file.standard = {
        results: data.results[0],
        success: !(data.errorCount + data.warningCount)
      }

      cb(null, file)
    })
  })
}

exports.reporter = function reporter (style, opts) {
  if (!style || style === 'default') style = 'snazzy'

  if (typeof style === 'function') return style(opts)

  if (typeof style === 'string') {
    try {
      return require('./reporters/' + style)(opts)
    } catch (e) {}

    try {
      return require(style)(opts)
    } catch (e) {}
  }

  // Fall thru
  return through.obj()
}
