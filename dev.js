var progressBox = require( './index.js' )
var box = progressBox()

setInterval( function () {
  console.log( box.clc.reset + box() )
}, 1000 )
