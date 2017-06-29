var fs = require('fs');
var path = require('path');
var mime = require('mime');

/**
 * Custom 404 (html)
 *
 *  1. return static 404.html file
 *  2. compile and return 404.xxx file
 *
 */

module.exports = function custom404static(req, rsp, next) {
    fs.readFile(
        path.resolve(req.surge.publicPath, '404.html'),
        function get404html(err, contents) {
            if (err || !contents) return next();

            var body = contents.toString();
            var type = mime.lookup('html');
            var charset = mime.charsets.lookup(type);
            rsp.setHeader(
                'Content-Type',
                type + (charset ? '; charset=' + charset : '')
            );
            rsp.setHeader('Content-Length', Buffer.byteLength(body, charset));
            rsp.statusCode = 404;
            rsp.end(body);
        }
    );
};
