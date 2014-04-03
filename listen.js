/**
 * Listen.js
 * Josh Vanderwillik
 *
 * Example usage:
 * ```
 * var teehee = Listener( 'my secret message', function(){
 *   console.log( "My secret message received!" );
 * });
 *
 * teehee.listen();
 * teehee.ignore();
 * ```
 *
 * Limits:
 * Will not listen for messages longer than 50 characters
 */

function Listener( message, handler ){
  var spy = {
    limit: 50,
    chars: "",
    secret: (function makeSecret(){
      var builder = [];
      for( var i = 0; i < message.length; i++ ){
        builder.push( message.charCodeAt(i) );
      }
      return builder.join( '_' );
    })(),
    listener: function( keyPress ){
      var letter = keyPress.key.charCodeAt(0);
      var letters;
      if( spy.chars.length === 0 ){
        letters = [];
      } else {
        letters = spy.chars.split( '_' ) || [];
      }
      letters.push( letter );
      if( letters.length > spy.limit ) letters.shift();
      spy.chars = letters.join( '_' );
      if( spy.chars.indexOf( spy.secret ) !== -1 ){
        handler();
        spy.chars = '';
      }
    },
    ignore: function(){
      document.removeEventListener( 'keyup', spy.listener );
      return spy;
    },
    listen: function(){
      document.addEventListener( 'keyup', spy.listener );
      return spy;
    }
  };
  return spy;
}
