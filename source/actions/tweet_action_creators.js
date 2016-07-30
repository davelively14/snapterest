// Imports the dispatcher we created previously.
var AppDispatcher = require('../dispatcher/app_dispatcher.js')

function receiveTweet(tweet) {

  // Creates our action object that will dispatched to every store
  var action = {
    type: 'receive_tweet',
    tweet: tweet
  }

  // Dispatches the action object to every store that is registered with the
  // AppDispatcher.
  AppDispatcher.dispatch(action)
}

module.exports = {
  receiveTweet: receiveTweet
}
