/*
 * function getIterationErrorBox ()
 *
 * A visual indicator intended for easy distinguishing between calls.
 *
 * Makes it easy to distinguish changes/builds that produce the same error.
 *
 * In other words, avoids the problem when you are trying to fix an error
 * by making changes/rebuilds but the error output is the same so you are not sure
 * if your change/rebuild took place or not.
 *
 * ref: https://github.com/talmobi/miru/blob/master/src/server/miru.js#L1133-L1164
 */

var clc = require( 'cli-color' )

module.exports = function createProgressBox ( opts ) {
  opts = opts || {}

  if ( !opts.step ) opts.step = 0
  if ( !opts.maxStep ) opts.maxStep = 4

  if ( !opts.offset ) opts.offset = 0
  if ( !opts.width ) opts.width = 2
  if ( !opts.stepSize ) opts.stepSize = opts.stepSize

  if ( !opts.padding ) opts.padding = 0
  if ( !opts.margin ) opts.margin = 4

  if ( !opts.clcColor ) opts.clcColor = 'bgMagentaBright'
  if ( !opts.character ) opts.character = ' '

  if ( !opts.getHeader ) opts.getHeader = function ( opts ) { return '' }
  if ( !opts.getFooter ) opts.getFooter = function ( opts ) { return '' }

  if ( !opts.transform ) opts.transform = _transform
  if ( !opts.render ) opts.render = _render
  if ( !opts.generateBox ) opts.generateBox = _generateBox

  opts.content = ''

  var api = function progressBox ( step ) {
    opts.content = opts.transform( opts, step )
    return opts.content
  }

  api.tick = api

  api.redraw = function ( step ) {
    return clc.reset + api.tick( step )
  }

  api.clc = clc

  // helpers for background colors
  api.bgColors = {
    dark: [
      'bgBlack',
      'bgRed',
      'bgGreen',
      'bgYellow',
      'bgBlue',
      'bgMagenta',
      'bgCyan',
      'bgWhite'
    ],
    bright: [
      'bgBlackBright',
      'bgRedBright',
      'bgGreenBright',
      'bgYellowBright',
      'bgBlueBright',
      'bgMagentaBright',
      'bgCyanBright',
      'bgWhiteBright'
    ],
    all: [
      'bgBlack',
      'bgRed',
      'bgGreen',
      'bgYellow',
      'bgBlue',
      'bgMagenta',
      'bgCyan',
      'bgWhite',
      'bgBlackBright',
      'bgRedBright',
      'bgGreenBright',
      'bgYellowBright',
      'bgBlueBright',
      'bgMagentaBright',
      'bgCyanBright',
      'bgWhiteBright'
    ]
  }

  // helpers for foreground colors
  api.fgColors = {
    dark: [
      'black',
      'red',
      'green',
      'yellow',
      'blue',
      'magenta',
      'cyan',
      'white'
    ],
    bright: [
      'blackBright',
      'redBright',
      'greenBright',
      'yellowBright',
      'blueBright',
      'magentaBright',
      'cyanBright',
      'whiteBright'
    ],
    all: [
      'black',
      'red',
      'green',
      'yellow',
      'blue',
      'magenta',
      'cyan',
      'white',
      'blackBright',
      'redBright',
      'greenBright',
      'yellowBright',
      'blueBright',
      'magentaBright',
      'cyanBright',
      'whiteBright'
    ]
  }

  return api
}

function _transform ( opts, step )
{
  // override step with provided value
  if ( Number( step ) >= 0 ) opts.step = step

  var buffer = _generateWhitespace( opts.padding )

  for ( var i = 0; i < opts.maxStep; i++ ) {
    if ( opts.step === i ) {
      var box = opts.generateBox( opts )
      buffer += opts.render( opts )
    } else {
      buffer += _generateWhitespace( opts.margin )
    }
  }

  // increment step
  opts.step = ( ( opts.step + 1 ) % opts.maxStep )

  return (
    opts.getHeader( opts ) + buffer + opts.getFooter( opts )
  )
}

function _generateBox ( opts )
{
  var box = _generateWhitespace( opts.width, opts.character )
  return box
}

function _render ( opts )
{
  var box = opts.generateBox( opts )
  return clc[ opts.clcColor ]( box )
}

function _generateWhitespace ( count, character )
{
  // default to single space
  if ( typeof character !== 'string' ) character = ' '

  var buffer = ''
  for ( var i = 0; i < count; i++ ) {
    buffer += character
  }

  return buffer
}
