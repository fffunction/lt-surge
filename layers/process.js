

module.exports = function proc (req, rsp, next){
  var normalizedPath  = normalizeUrl(req.url)
  var priorityList    = buildPriorityList(normalizedPath)
  var sourceFile      = findFirstFile(req.setup.publicPath, priorityList)


  /**
   * We GTFO if we don't have a source file.
   */

  if(!sourceFile){
    if (path.basename(normalizedPath) === "index.html") {
      var pathAr = normalizedPath.split(path.sep); pathAr.pop() // Pop index.html off the list
      var prospectCleanPath       = pathAr.join("/")
      var prospectNormalizedPath  = normalizeUrl(prospectCleanPath)
      var prospectPriorityList    = buildPriorityList(prospectNormalizedPath)
      prospectPriorityList.push(path.basename(prospectNormalizedPath + ".html"))

      sourceFile = findFirstFile(req.setup.publicPath, prospectPriorityList)

      if (!sourceFile) {
        return next()
      } else {
        // 301 redirect
        rsp.statusCode = 301
        rsp.setHeader('Location', prospectCleanPath)
        rsp.end('Redirecting to ' + utilsEscape(prospectCleanPath))
      }

    } else {
      return next()
    }
  } else {
    return next()
  }
}
