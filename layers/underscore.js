var shouldIgnore = require('../lib/should-ignore');
var notFound = require('./fallbacks').notFound;

/**
 * Underscore
 *
 * Returns 404 if path contains beginning underscore
 *
 */

module.exports = function underscore(req, rsp, next) {
    if (shouldIgnore(req.url)) {
        notFound(req, rsp, next);
    } else {
        next();
    }
};
