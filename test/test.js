var test = require( 'tape' )

var progressBox = require( '../src/index.js' )

test( 'defaults', function ( t ) {
  var box = progressBox()

  var expectedOutput = require( './fixtures/test-1.json' )

  for ( let i = 0; i < 10; i++ ) {
    t.equal( box(), expectedOutput[ i ] )
  }

    t.end()
} )

test( 'README.md example', function ( t ) {
  var opts = { padding: 2, maxStep: 8, width: 3 }

  var box = progressBox( opts )
  opts.character = '愛'

  var expectedOutput = require( './fixtures/test-2.json' )

  for ( let i = 0; i < 10; i++ ) {
    opts.clcColor = box.bgColors.bright[ opts.step ]
    t.equal(
      box.clc.reset + box.tick(),
      expectedOutput[ i ]
    )
  }

    t.end()
} )
