/* eslint
    no-var: 0,
    object-shorthand: 0
    prefer-arrow-callback: 0
*/
var connect = require('connect');
var port = require('get-port');
var middleware = require('../../index');

module.exports = function startServer (path) {
    var app = connect();
    app.use(middleware.regProjectFinder(path));
    app.use(middleware.setup);
    app.use(middleware.underscore);
    app.use(middleware.mwl);
    app.use(middleware.static);
    app.use(middleware.fallback);
    return port().then(function gotPort (num) {
        return {
            server: app.listen(num),
            port: num,
        };
    });
};
