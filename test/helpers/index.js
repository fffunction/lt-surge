var connect = require('connect');
var port = require('get-port');
var middleware = require('../../index');

module.exports = function startServer (path) {
    var app = connect();
    app.use(middleware.regProjectFinder(path))
    app.use(middleware.setup)
    app.use(middleware.underscore)
    app.use(middleware.mwl)
    app.use(middleware.static)
    app.use(middleware.fallback)
    var server;
    return port().then(function (port) {
        return {
            server: app.listen(port),
            port: port,
        };
    });
}
