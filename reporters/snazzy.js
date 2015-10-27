
'use strict'

var chalk = require('chalk')
var table = require('text-table')
var through = require('through2')
var PluginError = require('gulp-util').PluginError

module.exports = exports = function snazzyReporter () {
  var total = 0

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) return cb(null, file)

    if (file.isStream()) {
      cb(new PluginError('gulp-standardize', 'Streams are not supported!'))
    }

    if (!file.standard || file.standard && file.standard.success) return cb(null, file)

    var output = ''
    var results = file.standard.results
    total += results.messages.length
    output += chalk.underline(file.path) + '\n'

    output += table(
      results.messages.map(function (msg) {
        return [
          '',
          msg.line || 0,
          msg.column || 0,
          chalk.red('error'),
          msg.message.replace(/\.&/, ''),
          chalk.gray(msg.ruleId || '')
        ]
      }),
      {
        align: ['', 'r', 'l'],
        stringLength: function (str) {
          return chalk.stripColor(str).length
        }
      }
    ).split('\n').map(function (el) {
      return el.replace(/(\d+)\s+(\d+)/, function (m, p1, p2) {
        return chalk.gray(p1 + ':' + p2)
      })
    }).join('\n') + '\n\n'

    console.log(output)

    cb(null, file)
  }, function (cb) {
    var output = ''
    if (total > 0) {
      output += chalk.red.bold([
        '\u2716 ', total, ' problem' + (total > 1 ? 's' : ''), '\n'
      ].join(''))

      console.log(output)
    }

    cb()
  })
}
