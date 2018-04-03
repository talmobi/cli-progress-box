var fs = require( 'fs' )

var buffer = []

var console = {
  log: function ( data ) {
    buffer.push( data )
  }
}

var opts = { padding: 2, maxStep: 8, width: 3 }

var progressBox = require( '../../src/index.js' )
var box = progressBox( opts )

opts.character = '愛'

for ( let i = 0; i < 10; i++ ) {
  opts.clcColor = box.bgColors.bright[ opts.step ]
  console.log( box.clc.reset + box.tick() )
}

var str = JSON.stringify( buffer )
var json = JSON.parse( str )
str = JSON.stringify( json )

fs.writeFileSync( './test-2.json', str, 'utf8' )
