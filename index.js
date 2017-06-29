var regProjectFinder = require('./layers/regprojectfinder');
var underscore = require('./layers/underscore');
var mwl = require('./layers/mwl');
var staticFiles = require('./layers/static');
var fallbacks = require('./layers/fallbacks');

exports.regProjectFinder = regProjectFinder;
exports.underscore = underscore;
exports.mwl = mwl;
exports.static = staticFiles;
exports.fallback = fallbacks.fallback;

exports.all = function all(projectPath) {
    return [
        regProjectFinder(projectPath),
        underscore,
        mwl,
        staticFiles,
        fallbacks.fallback,
    ];
};
