// Dispatcher with which to register
var AppDispatcher = require('../dispatcher/app_dispatcher.js')

// Allows us to add and remove event listeners
var EventEmitter = require('events').EventEmitter

// Module that copies the properties from multiple source objects to a single
// target object. Must be added via 'npm install --save object-assign'
var assign = require('object-assign')

// Define data that our store manages. In this case, just a simple tweet,
// initialized to null.
var tweet = null

// Private function. Limiting side effects by preventing other parts of our app
// from updating the data directly. The only way to update the data in any store
// is by creating an action and dispatching it. Stores are in control of their
// own data. Only cations can mutate the data in the stores. Similar to
// a changeset, to some extent.
function setTweet(receiveTweet) {
  tweet = receiveTweet
}

// Private function that is called within the action handler. Emits a 'change'
// event when called.
function emitChange() {
  TweetStore.emit('change')
}

// addChangeListener and removeChangeListener depend on methods provided by
// EventEmitter. In order to copy those methods into our TweetStore object, we
// use the object-assign function (note we aliased to 'assign' var above):
//
// tgtObj = objectAssign(tgtObj, sourceObj1, sourceObj2)
//
// In this scenario, we are combining the EventEmitter.prototype, which is just
// the methods from EventEmitter, with the object literal that defines our
// store's methods, and returns the result in an empty object that becomes our
// TweetStore.
var TweetStore = assign({}, EventEmitter.prototype, {

  // This is how components within our app can listen for a change to this store
  addChangeListener: function (callback) {
    this.on('change', callback)
  },

  // This is how components within our app stop listenting for a change
  removeChangeListener: function (callback) {
    this.removeListener('change', callback)
  },

  getTweet: function () {
    return tweet
  }
})

// Action handler. Takes an action object as a paramter, checks action type to
// ensure that this store is concerned with the action. In this case, confirms
// it is a 'receive_tweet' type, and then calls private functions that mutate
// data and notifiy components who are listenting.
//
// Are side effects eliminated? I think so.
function handleAction(action) {
  if (action.type === 'receive_tweet') {
    setTweet(action.tweet)
    emitChange()
  }
}

// Registers store, passes action handler as callback function. Whenever the
// dispatcher dispatches an action, it calls the callback function.
// AppDispatcher returns a token that is saved to our TweetStore object.
TweetStore.dispatchToken = AppDispatcher.register(handleAction)

module.exports = TweetStore
