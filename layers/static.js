var path = require('path');
var url = require('url');
var parse = require('parseurl');
var utilsPause = require('pause');
var send = require('send');
var utilsEscape = require('escape-html');

/**
 * Static
 *
 * Serves up static page (if it exists).
 *
 */

module.exports = function staticFiles(req, res, next) {
    var options = {};
    var redirect = true;

    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    var pathname = parse(req).pathname;
    var pause = utilsPause(req);

    function serve(pathn) {
        function resume() {
            next();
            pause.resume();
        }

        function directory() {
            if (!redirect) return resume();
            var dirpath = url.parse(req.originalUrl).pathname;
            res.statusCode = 301;
            res.setHeader('Location', dirpath + '/');
            res.end('Redirecting to ' + utilsEscape(dirpath) + '/');
            return undefined;
        }

        function error(err) {
            if (err.status === 404) {
                // Look for implicit `*.html` if we get a 404
                return path.extname(err.path) === ''
                    ? serve(pathn + '.html')
                    : resume();
            }
            return next(err);
        }

        send(req, pathn, {
            maxage: options.maxAge || 0,
            root: req.surge.publicPath,
            hidden: options.hidden,
        })
            .on('error', error)
            .on('directory', directory)
            .pipe(res);
    }

    return serve(pathname);
};
