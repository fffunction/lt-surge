module.exports = function regProjectFinder (projectPath){
  return function(req, rsp, next){
    req.projectPath = projectPath
    next()
  }
}
