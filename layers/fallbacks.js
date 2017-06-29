var skin = require('../lib/skin');
var custom200static = require('./custom200static');
var custom404static = require('./custom404static');
var default404 = require('./default404');

/**
 * Fallbacks
 *
 * This is the logic behind rendering fallback files.
 *
 *  1. return static 200.html file
 *  2. compile and return 200.xxx
 *  3. return static 404.html file
 *  4. compile and return 404.xxx file
 *  5. default 404
 *
 * It is broken into two public functions `fallback`, and `notFound`
 *
 */

function notFound(req, rsp, next) {
    skin(req, rsp, [custom404static, default404], next);
}

function fallback(req, rsp, next) {
    skin(req, rsp, [custom200static, notFound], next);
}

exports.notFound = notFound;
exports.fallback = fallback;
