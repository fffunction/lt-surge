module.exports = function findFirstFile (dir, arr) {
  var dirPath   = path.dirname(path.join(dir, arr[0]))
  var fullPath  = path.resolve(dirPath)

  try{
    var list = fs.readdirSync(fullPath)
  }catch(e){
    var list = []
  }

  var first = null

  if(list){
    arr.reverse().map(function(item){
      var fileName = path.basename(item)
      if(list.indexOf(fileName) !== -1){
        first = item
      }
    })
  }

  return first
}
