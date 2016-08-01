// Import dependencies
var AppDispatcher = require('../dispatcher/app_dispatcher.js')
var EventEmitter = require('events').EventEmitter
var assign = require('object-assign')

// Assigns a change event to a constant
var CHANGE_EVENT = 'change'

// Define data and private functions. Three mutate collectionTweets, one
// function mutates collectionName.
var collectionTweets = {}
var collectionName = 'new'

// Adds a tweet object to our collectionTweets
function addTweetToCollection(tweet) {
  collectionTweets[tweet.id] = tweet
}

// Removes a tweet from collectionTweets
function removeTweetFromCollection(tweetId) {
  delete collectionTweets[tweetId]
}

// Removes all tweets from collectionTweets by assigning a blank object to our
// collectionTweets.
function removeAllTweetsFromCollection() {
  collectionTweets = {}
}

// Changes the name
function setCollectionName(name) {
  collectionName = name
}

// Emits change event to any subscirbed elements
function emitChange() {
  CollectionStore.emit(CHANGE_EVENT)
}

// Similar to TweetStore object, excet for getCollectionTweets and
// getCollectionName.
var CollectionStore = assign({}, EventEmitter.prototype, {

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  getCollectionTweets: function () {
    return collectionTweets
  },

  getCollectionName: function () {
    return collectionName
  }
})

// Handles all actions that are dispatched by AppDispatcher.
function handleAction(action) {

  switch (action.type) {

    case 'add_tweet_to_collection':
      addTweetToCollection(action.tweet)
      emitChange()
      break

    case 'remove_tweet_from_collection':
      removeTweetFromCollection(action.tweetId)
      emitChange()
      break

    case 'remove_all_tweets_from_collection':
      removeAllTweetsFromCollection()
      emitChange()
      break

    case 'set_collection_name':
      setCollectionName(action.collectionName)
      emitChange()
      break

    default: // do nothing
  }
}

CollectionStore.dispatchToken = AppDispatcher.register(handleAction)

module.exports = CollectionStore
