module.exports = function skin(req, rsp, stack, callback) {
    var that = this;
    var index = 0;

    function next() {
        var layer = stack[index];
        index += 1;
        if (!layer) return callback(req, rsp, next);
        return layer.call(that, req, rsp, next);
    }

    next();
};
