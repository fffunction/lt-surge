var path = require('path');
/**
 *
 * Normalize Url
 *
 * - removes querystring
 * - removes extra slashes
 * - changes `/` to `/index.html`
 *
 * src: https://github.com/sintaxi/harp/blob/502ae19df9ee4b1e421f97cf23a77e9b4d522288/lib/helpers.js#L17
 */

module.exports = function normalizeUrl (url){

  // take off query string
  var base = unescape(url.split('?')[0])

  /**
   * Normalize Path
   *
   * Note: This converts unix paths to windows path on windows
   * (not sure if this is a good thing)
   */
  var file_path = path.normalize(base)

  // index.html support
  if (path.sep == file_path[file_path.length - 1]) file_path += 'index.html'

  return file_path
}
