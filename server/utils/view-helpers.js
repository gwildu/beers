const readFile = require( 'fs' ).readFileSync;
const path = require( 'path' );
const manifest = path.join( path.resolve( '.' ), 'cdn/asset-manifest.json' );
const isProd = process.env.NODE_ENV === 'production';
const assetMap = isProd ? JSON.parse( readFile( manifest, 'utf-8' ) ) : '';

module.exports = {
  asset: function (path) {
    return isProd ? assetMap[path] : path
  },
  isProd: isProd
}
