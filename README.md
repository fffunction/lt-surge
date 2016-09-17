# Lt. Surge

A collection of connect middleware to mimic to Harp/Surge serving behaviour, shamelessly ripped from [Harp](https://github.com/sintaxi/harp)

## Usage

```js
var middleware = require('lt-surge');
var projectDir = 'path/to/project';

// browser-sync example
middleware: [
    middleware.regProjectFinder(projectDir),
    middleware.setup,
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
app.use(middleware.setup)
app.use(middleware.underscore)
app.use(middleware.mwl)
app.use(middleware.static)
app.use(middleware.fallback)
```
