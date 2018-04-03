var opts = { padding: 2, maxStep: 8, width: 3 }
var box = require( './src/index.js' )( opts )

opts.character = '愛'

setInterval( function () {
  opts.clcColor = box.bgColors.bright[ opts.step ]
  console.log( box.clc.reset + box.tick() )
}, 200 )
