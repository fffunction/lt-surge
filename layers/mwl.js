var path = require('path');
var processors = require('../lib/processors');
var notFound = require('./fallbacks').notFound;
/**
 * Modern Web Language
 *
 * Returns 404 if file is a precompiled
 *
 */
module.exports = function mwl (req, rsp, next){
  var ext = path.extname(req.url).replace(/^\./, '')

  if(processors["html"].indexOf(ext) !== -1 || processors["css"].indexOf(ext) !== -1 || processors["js"].indexOf(ext) !== -1){
    notFound(req, rsp, next)
  }else{
    next()
  }
}
