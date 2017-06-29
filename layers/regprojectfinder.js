module.exports = function regProjectFinder(projectPath) {
    return function projectFinder(req, rsp, next) {
        req.surge = {
            projectPath: projectPath,
            publicPath: projectPath,
        };
        return next();
    };
};
