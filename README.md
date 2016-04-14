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

## License

Copyright © 2016 [fffunction](http://fffunction.co). All rights reserved.

Copyright © 2012–2014 [Chloi Inc](http://chloi.io). All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
