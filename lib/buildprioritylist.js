
module.exports = function buildPriorityList (filePath){

  var list = []

  /**
   * get extension
   */

  var ext       = path.extname(filePath).replace(/^\./, '')
  var processor = processors[ext]

  if(processor){

    // foo.html => foo.jade
    processor.forEach(function(p){
      var regexp = new RegExp(ext + '$')
      list.push(filePath.replace(regexp, p))
    })

    // foo.html => foo.html.jade
    processor.forEach(function(p){
      list.push(filePath + '.' + p)
    })

  }else{
    // assume template when unknown processor
    if(processors['html'].indexOf(ext) !== -1){
      list.push(filePath)
    }else{
      // foo.xml => foo.xml.jade
      processors['html'].forEach(function(p){
        list.push(filePath + '.' + p)
      })
    }
  }

  // remove leading and trailing slashes
  var list = list.map(function(item){ return item.replace(/^\/|^\\|\/$/g, '') })

  return list
}
