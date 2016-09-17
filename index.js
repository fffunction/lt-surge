var path         = require('path')
var fs           = require('fs')
var mime         = require('mime')
var connect      = require('connect')
var send         = require('send')
var utilsPause   = require('pause')
var utilsEscape  = require('escape-html')
var parse        = require('parseurl')
var url          = require('url')

var skin         = require('./lib/skin');
var shouldIgnore = require('./lib/shouldignore');
var processors   = require('./lib/processors');
var normalizeUrl = require('./lib/normalizeurl');
var buildPriorityList = require('./lib/buildprioritylist');
var findFirstFile = require('./lib/findfirstfile');

var regProjectFinder = require('./layers/regprojectfinder');
exports.regProjectFinder = regProjectFinder;

/**
 * Fallbacks
 *
 * This is the logic behind rendering fallback files.
 *
 *  1. return static 200.html file
 *  2. compile and return 200.xxx
 *  3. return static 404.html file
 *  4. compile and return 404.xxx file
 *  5. default 404
 *
 * It is broken into two public functions `fallback`, and `notFound`
 *
 */

var fallback = exports.fallback = function(req, rsp, next){
  skin(req, rsp, [custom200static, notFound], next)
}

var notFound = exports.notFound = function(req, rsp, next){
  skin(req, rsp, [custom404static, default404], next)
}


/**
 * Custom 200
 *
 *  1. return static 200.html file
 *  2. compile and return 200.xxx file
 *
 */

var custom200static = function(req, rsp, next){
  fs.readFile(path.resolve(req.setup.publicPath, "200.html"), function(err, contents){
    if(contents){
      var body    = contents.toString()
      var type    = mime.lookup('html')
      var charset = mime.charsets.lookup(type)
      rsp.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''))
      rsp.setHeader('Content-Length', Buffer.byteLength(body, charset));
      rsp.statusCode = 200
      rsp.end(body)
    }else{
      next()
    }
  })
}

/**
 * Custom 404 (html)
 *
 *  1. return static 404.html file
 *  2. compile and return 404.xxx file
 *
 * TODO: cache readFile IO
 *
 */

var custom404static = function(req, rsp, next){
  fs.readFile(path.resolve(req.setup.publicPath, "404.html"), function(err, contents){
    if(contents){
      var body    = contents.toString()
      var type    = mime.lookup('html')
      var charset = mime.charsets.lookup(type)
      rsp.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''))
      rsp.setHeader('Content-Length', Buffer.byteLength(body, charset));
      rsp.statusCode = 404
      rsp.end(body)
    }else{
      next()
    }
  })
}


/**
 * Default 404
 *
 * No 200 nor 404 files were found.
 *
 */

var default404 = function(req, rsp, next){
  var body = 'Page Not Found'
  var type    = mime.lookup('html')
  var charset = mime.charsets.lookup(type)
  rsp.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''));
  rsp.statusCode = 404
  rsp.setHeader('Content-Length', Buffer.byteLength(body, charset));
  rsp.end(body)
}


/**
 * Underscore
 *
 * Returns 404 if path contains beginning underscore
 *
 */
exports.underscore = function(req, rsp, next){
  if(shouldIgnore(req.url)){
    notFound(req, rsp, next)
  }else{
    next()
  }
}

/**
 * Modern Web Language
 *
 * Returns 404 if file is a precompiled
 *
 */
exports.mwl = function(req, rsp, next){
  var ext = path.extname(req.url).replace(/^\./, '')

  if(processors["html"].indexOf(ext) !== -1 || processors["css"].indexOf(ext) !== -1 || processors["js"].indexOf(ext) !== -1){
    notFound(req, rsp, next)
  }else{
    next()
  }
}

/**
 * Static
 *
 * Serves up static page (if it exists).
 *
 */
exports.static = function(req, res, next) {
  var options  = {}
  var redirect = true

  if ('GET' != req.method && 'HEAD' != req.method) return next();
  var pathn = parse(req).pathname;
  var pause = utilsPause(req);

  function resume() {
    next();
    pause.resume();
  }

  function directory() {

    if (!redirect) return resume();
    var pathname = url.parse(req.originalUrl).pathname;
    res.statusCode = 301;
    res.setHeader('Location', pathname + '/');
    res.end('Redirecting to ' + utilsEscape(pathname) + '/');
  }

  function error(err) {
    if (404 == err.status){
      // look for implicit `*.html` if we get a 404
      return path.extname(err.path) === ''
        ? serve(pathn + ".html")
        : resume()
    }
    next(err);
  }

  var serve = function(pathn){
    send(req, pathn, {
        maxage: options.maxAge || 0,
        root: req.setup.publicPath,
        hidden: options.hidden
      })
      .on('error', error)
      .on('directory', directory)
      .pipe(res)
  }
  serve(pathn)
}

/**
 * Opens the (optional) harp.json file and sets the config settings.
 */

exports.setup = function(req, rsp, next){
  if(req.hasOwnProperty('setup')) return next()

  req.setup = {
    "projectPath" : req.projectPath,
    "publicPath"  : req.projectPath,
    "config"      : {}
  }

  next()
}

/**
 * Basic Auth
 */

exports.basicAuth = function(req, rsp, next) {

  // default empty
  var creds = []

  // allow array
  if(req.setup.config.hasOwnProperty("basicAuth") && req.setup.config["basicAuth"] instanceof Array)
    creds = req.setup.config["basicAuth"]

  // allow string
  if(req.setup.config.hasOwnProperty("basicAuth") && typeof req.setup.config["basicAuth"] === 'string')
    creds = [req.setup.config["basicAuth"]]

  // move on if no creds
  if(creds.length === 0) return next()

  // use connect auth lib iterate over all creds provided
  connect.basicAuth(function(user, pass){
    return creds.some(function(cred){
      return cred === user + ":" + pass
    })
  })(req, rsp, next)
}

exports.process = function(req, rsp, next){
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

exports.all = function (projectPath) {
    return [
        exports.regProjectFinder(projectPath),
        exports.setup,
        exports.underscore,
        exports.mwl,
        exports.static,
        exports.process,
        exports.fallback,
    ]
}
