var regProjectFinder = require('./layers/regprojectfinder');
var setup            = require('./layers/setup');
var underscore       = require('./layers/underscore');
var mwl              = require('./layers/mwl');
var static           = require('./layers/static');
var proc             = require('./layers/process');
var fallbacks        = require('./layers/fallbacks');

exports.regProjectFinder = regProjectFinder;
exports.setup            = setup;
exports.underscore       = underscore;
exports.mwl              = mwl;
exports.static           = static;
exports.process          = proc;
exports.fallback         = fallbacks.fallback;

exports.all = function all (projectPath) {
    return [
        regProjectFinder(projectPath),
        setup,
        underscore,
        mwl,
        static,
        proc,
        fallbacks.fallback,
    ]
}
