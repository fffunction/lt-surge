/**
 * Opens the (optional) harp.json file and sets the config settings.
 */
module.exports = function setup (req, rsp, next){
  if(req.hasOwnProperty('setup')) return next()

  req.setup = {
    "projectPath" : req.projectPath,
    "publicPath"  : req.projectPath,
    "config"      : {}
  }

  next()
}
