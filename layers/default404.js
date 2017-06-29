var mime = require('mime');

/**
 * Default 404
 *
 * No 200 nor 404 files were found.
 *
 */

module.exports = function default404(req, rsp) {
    var body = 'Page Not Found';
    var type = mime.lookup('html');
    var charset = mime.charsets.lookup(type);
    rsp.setHeader(
        'Content-Type',
        type + (charset ? '; charset=' + charset : '')
    );
    rsp.statusCode = 404;
    rsp.setHeader('Content-Length', Buffer.byteLength(body, charset));
    rsp.end(body);
};
