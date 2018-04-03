var fs = require( 'fs' )

var opts = {}

var progressBox = require( '../../src/index.js' )
var box = progressBox( opts )

// opts.character = '愛'

var buffer = []

for ( let i = 0; i < 10; i++ ) {
  buffer.push( box() )
}

var str = JSON.stringify( buffer )

fs.writeFileSync( './test-1.json', str, 'utf8' )
