/* globals describe, it */

'use strict'

var should = require('should')
var through = require('through2')
var gulp = require('gulp')
var standardize = require('../')

describe('gulp-standardize', function () {
  it('finds syntax errors', function (done) {
    gulp.task('syntax', function () {
      return gulp.src('test/fixtures/syntax-error.txt')
        .pipe(standardize())
        .pipe(through.obj(function (file, enc, cb) {
          should.exist(file.standard)
          file.standard.success.should.equal(false)
          file.standard.results.messages.should.have.lengthOf(1)
          cb()
        }))
    })

    gulp.start('syntax', done)
  })
})

describe('snazzy reporter', function () {
  it('should report correctly', function (done) {
    gulp.task('snazzy-syntax', function () {
      return gulp.src('test/fixtures/syntax-error.txt')
        .pipe(standardize())
        .pipe(standardize.reporter('snazzy'))
    })

    gulp.start('snazzy-syntax', done)
  })

  it('should report multiple errors', function (done) {
    gulp.task('snazzy-multi', function () {
      return gulp.src('test/fixtures/format-errors.txt')
        .pipe(standardize())
        .pipe(standardize.reporter())
    })

    gulp.start('snazzy-multi', done)
  })

  it('should report errors from multiple files', function (done) {
    gulp.task('snazzy-files', function () {
      return gulp.src('test/fixtures/*.txt')
        .pipe(standardize())
        .pipe(standardize.reporter('default'))
    })

    gulp.start('snazzy-files', done)
  })
})

describe('fail reporter', function () {
  it('should fail on its own', function (done) {
    gulp.task('fail', function () {
      return gulp.src('test/fixtures/syntax-error.txt')
        .pipe(standardize())
        .pipe(standardize.reporter('fail'))
    })

    gulp.start('fail', function (err) {
      err.should.be.an.Error()
      err.message.slice(0, 15).should.equal('Standard failed')
      done()
    })
  })

  it('should fail with other reporters', function (done) {
    gulp.task('fail-after', function () {
      return gulp.src('test/fixtures/*.txt')
        .pipe(standardize())
        .pipe(standardize.reporter())
        .pipe(standardize.reporter('fail'))
    })

    gulp.start('fail-after', function (err) {
      err.should.be.an.Error()
      err.message.slice(0, 15).should.equal('Standard failed')
      done()
    })
  })
})
