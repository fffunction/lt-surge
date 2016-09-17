# Lt. Surge

A collection of connect middleware to mimic to Harp/Surge serving behaviour, shamelessly ripped from [Harp](https://github.com/sintaxi/harp)

[![Build Status](https://travis-ci.org/fffunction/lt-surge.svg?branch=master)](https://travis-ci.org/fffunction/lt-surge) [![Coverage Status](https://coveralls.io/repos/github/fffunction/lt-surge/badge.svg)](https://coveralls.io/github/fffunction/lt-surge)

## Usage

```js
var middleware = require('lt-surge');
var projectDir = 'path/to/project';

// browser-sync example
middleware: [
    middleware.regProjectFinder(projectDir),
    middleware.underscore,
    middleware.mwl,
    middleware.static,
    middleware.fallback,
]

// using the convenience method
middleware: middleware.all(projectDir),

// connect example
var app = connect()
app.use(middleware.regProjectFinder(projectDir))
app.use(middleware.underscore)
app.use(middleware.mwl)
app.use(middleware.static)
app.use(middleware.fallback)
```
