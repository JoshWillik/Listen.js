Listen.js
=========

Listen for keycodes and react with a function.


#Example:

```js
var spy = Listener( 'my secret message', function(){
  console.log( "My secret message received!" );
});

spy.listen(); //starts listener
spy.ignore(); //stops listener
```
