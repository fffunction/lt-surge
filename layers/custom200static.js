var fs = require('fs');
var path = require('path');
var mime = require('mime');

/**
 * Custom 200
 *
 *  1. return static 200.html file
 *  2. compile and return 200.xxx file
 *
 */

module.exports = function custom200static(req, rsp, next) {
    fs.readFile(
        path.resolve(req.surge.publicPath, '200.html'),
        function get200html(err, contents) {
            if (err || !contents) return next();

            var body = contents.toString();
            var type = mime.lookup('html');
            var charset = mime.charsets.lookup(type);
            rsp.setHeader(
                'Content-Type',
                type + (charset ? '; charset=' + charset : '')
            );
            rsp.setHeader('Content-Length', Buffer.byteLength(body, charset));
            rsp.statusCode = 200;
            rsp.end(body);
        }
    );
};
