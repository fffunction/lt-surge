module.exports = function regProjectFinder (projectPath) {
    return function projectFinder (req, rsp, next) {
        req.projectPath = projectPath;
        next();
    };
};
