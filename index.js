var regProjectFinder = require('./layers/regprojectfinder');
var setup = require('./layers/setup');
var underscore = require('./layers/underscore');
var mwl = require('./layers/mwl');
var staticFiles = require('./layers/static');
var fallbacks = require('./layers/fallbacks');

exports.regProjectFinder = regProjectFinder;
exports.setup = setup;
exports.underscore = underscore;
exports.mwl = mwl;
exports.static = staticFiles;
exports.fallback = fallbacks.fallback;

exports.all = function all (projectPath) {
    return [
        regProjectFinder(projectPath),
        setup,
        underscore,
        mwl,
        staticFiles,
        fallbacks.fallback,
    ];
};
