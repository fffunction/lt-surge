var path = require('path');
var processors = require('../lib/processors');
var notFound = require('./fallbacks').notFound;

/**
 * Modern Web Language
 *
 * Returns 404 if file is a precompiled
 *
 */

module.exports = function mwl(req, rsp, next) {
    var ext = path.extname(req.url).replace(/^\./, '');
    var allExts = processors.html.concat(processors.css).concat(processors.js);
    if (allExts.indexOf(ext) > -1) {
        notFound(req, rsp, next);
    } else {
        next();
    }
};
