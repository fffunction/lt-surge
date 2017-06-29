var path = require('path');

/**
 *
 * Should Ignore
 *
 * Checks to see if path should be ignored.
 *
 * eg.
 *     shouldIgnore('_foo.html')         => true
 *     shouldIgnore('foo_.html')         => false
 *     shouldIgnore('_foo/bar.html')     => true
 *     shouldIgnore('foo/_bar.html')     => true
 *     shouldIgnore('foo/_bar/baz.html') => true
 *
 * src: https://github.com/sintaxi/terraform/blob/master/lib/helpers/raw.js#L420
 */

module.exports = function shouldIgnore(filePath) {
    // Remove starting and trailing slashed
    filePath = filePath.replace(/^\/|\/$/g, '');

    // Create array out of path
    var arr = filePath.split(path.sep);

    // Test for starting underscore, .git, .gitignore
    var map = arr.map(function isUnderscoreOrGit(item) {
        return item[0] === '_' || item.indexOf('.git') === 0;
    });

    // Return if any item starts with underscore
    return map.indexOf(true) !== -1;
};
