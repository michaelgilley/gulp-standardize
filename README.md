# gulp-standardize
[![Build Status](https://travis-ci.org/michaelgilley/gulp-standardize.png?branch=master)](https://travis-ci.org/michaelgilley/gulp-standardize)
[![NPM version](https://badge.fury.io/js/gulp-standard.png)](http://badge.fury.io/js/gulp-standard)

> [Standard JS](http://standardjs.com/) Linter for Gulp with [Snazzy](https://github.com/feross/snazzy) reporter.

## Install

```
$ npm install --save-dev gulp-standardize
```

## Usage

```js
var gulp = require('gulp')
var standardize = require('gulp-standardize')

gulp.task('lint', function () {
  return gulp.src('**/*.js')
    .pipe(standardize())
    .pipe(standardize.reporter('snazzy'))
    .pipe(standardize.reporter('fail'))
})
```

## Results

Adds the following properties to the file object:

```js
file.standard.success = true
file.standard.results = {} // The results from Standard
```

You can use `success` along with caching plugins like [gulp-cache](https://github.com/jgable/gulp-cache).

## License

The MIT License (MIT)

Copyright (c) 2015 Michael Gilley

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
