var readFile = require('fs').readFileSync
var exists = require('fs').accessSync
var path = require('path')
var manifest = path.join(path.resolve('.'), 'dist/asset-manifest.json')
var isProd = process.env.NODE_ENV === 'production'

// preload asset-manifest.json if exists
if (isProd) {
  try {
    exists(manifest)
    var assetMap = JSON.parse(readFile(manifest, 'utf-8'))
  } catch (e) {
  }
}

module.exports = {
  asset: function (path) {
    var newPath = assetMap && typeof assetMap[path] !== 'undefined' ? assetMap[path] : path
    console.info(newPath)
    return newPath
  },
  isProd: isProd
}
